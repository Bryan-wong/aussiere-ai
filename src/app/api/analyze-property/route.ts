import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { AnalyzeRequestSchema } from '@/lib/validators/report'
import { generateMockReport } from '@/services/mock-report'
import type { AnalyzePropertyResponse, AnalyzePropertyRequest } from '@/types/report'

// ─── Rate limiting (simple in-memory — use Redis/Upstash in production) ───────
const requestMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10   // requests per window
const WINDOW_MS  = 60_000

function checkRateLimit(ip: string): boolean {
  const now  = Date.now()
  const entry = requestMap.get(ip)
  if (!entry || now > entry.resetAt) {
    requestMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID().substring(0, 8)
  const ip        = request.headers.get('x-forwarded-for') ?? 'unknown'

  // Rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json<AnalyzePropertyResponse>(
      { success: false, error: 'Too many requests. Please wait a moment.', requestId },
      { status: 429 }
    )
  }

  try {
    // Parse body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json<AnalyzePropertyResponse>(
        { success: false, error: 'Invalid JSON body', requestId },
        { status: 400 }
      )
    }

    // Validate request
    const req = AnalyzeRequestSchema.parse(body) as AnalyzePropertyRequest

    // ── Determine mode: LIVE (OpenAI) or MOCK ────────────────────────────────
    const hasOpenAI = !!(process.env.OPENAI_API_KEY &&
                         process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' &&
                         process.env.OPENAI_API_KEY.startsWith('sk-'))

    let report
    let cached = false

    if (hasOpenAI) {
      // ── PRODUCTION: OpenAI GPT-4o ──────────────────────────────────────────
      const { generatePropertyReport } = await import('@/services/openai')
      const result = await generatePropertyReport(req)
      report  = result.report
      cached  = result.cached
    } else {
      // ── DEVELOPMENT: Mock (no API key needed) ─────────────────────────────
      console.log(`[${requestId}] Running in mock mode — add OPENAI_API_KEY for live AI`)
      // Simulate realistic processing delay
      await new Promise(r => setTimeout(r, 1500))
      report = generateMockReport(req)
      cached = false
    }

    return NextResponse.json<AnalyzePropertyResponse>(
      { success: true, report, cached, requestId },
      { status: 200 }
    )

  } catch (err) {
    // Zod validation error
    if (err instanceof ZodError) {
      const messages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      return NextResponse.json<AnalyzePropertyResponse>(
        { success: false, error: `Validation error — ${messages}`, requestId },
        { status: 400 }
      )
    }

    // OpenAI / service error
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error(`[${requestId}] analyze-property error:`, err)

    return NextResponse.json<AnalyzePropertyResponse>(
      { success: false, error: message, requestId },
      { status: 500 }
    )
  }
}

// ─── Health check ─────────────────────────────────────────────────────────────
export async function GET() {
  const hasOpenAI = !!(process.env.OPENAI_API_KEY &&
                       process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' &&
                       process.env.OPENAI_API_KEY.startsWith('sk-'))

  return NextResponse.json({
    status:  'ok',
    mode:    hasOpenAI ? 'live' : 'mock',
    version: '2.0',
    ts:      new Date().toISOString(),
  })
}
