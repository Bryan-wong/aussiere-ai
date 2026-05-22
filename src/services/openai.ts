import OpenAI from 'openai'
import { PropertyReportSchema } from '@/lib/validators/report'
import type { PropertyReport } from '@/types/report'

// ─── Client (singleton) ───────────────────────────────────────────────────────

let _client: OpenAI | null = null

function getClient(): OpenAI {
  if (!_client) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) throw new Error('OPENAI_API_KEY is not configured in environment variables')
    _client = new OpenAI({ apiKey })
  }
  return _client
}

// ─── JSON extraction & sanitisation ──────────────────────────────────────────

function extractJSON(raw: string): unknown {
  // Strip markdown fences
  let s = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

  // Find outermost { ... }
  const start = s.indexOf('{')
  if (start === -1) throw new Error('No JSON object found in model response')

  let depth = 0
  let end   = -1
  for (let i = start; i < s.length; i++) {
    if (s[i] === '{') depth++
    else if (s[i] === '}') { depth--; if (depth === 0) { end = i; break } }
  }
  if (end === -1) throw new Error('JSON object was truncated — increase max_tokens')

  let j = s.slice(start, end + 1)

  // Remove trailing commas before ] or }
  j = j.replace(/,(\s*[}\]])/g, '$1')

  // Flatten literal newlines / tabs inside string values
  let out = '', inStr = false, esc = false
  for (const ch of j) {
    if (esc)          { out += ch; esc = false; continue }
    if (ch === '\\')  { out += ch; esc = true;  continue }
    if (ch === '"')     inStr = !inStr
    if (inStr && (ch === '\n' || ch === '\r' || ch === '\t')) { out += ' '; continue }
    out += ch
  }

  return JSON.parse(out)
}

// ─── Core completion function ──────────────────────────────────────────────────

interface CompletionOptions {
  systemPrompt: string
  userPrompt:   string
  model?:       string
  maxTokens?:   number
  temperature?: number
}

async function completion(opts: CompletionOptions): Promise<string> {
  const client = getClient()
  const response = await client.chat.completions.create({
    model:       opts.model       ?? 'gpt-4o',
    max_tokens:  opts.maxTokens   ?? 4000,
    temperature: opts.temperature ?? 0.3,    // low temp = more consistent JSON
    response_format: { type: 'json_object' }, // GPT-4o supports JSON mode
    messages: [
      { role: 'system', content: opts.systemPrompt },
      { role: 'user',   content: opts.userPrompt   },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('Empty response from OpenAI API')

  return content
}

// ─── Retry wrapper ────────────────────────────────────────────────────────────

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delayMs = 1000,
): Promise<T> {
  let lastErr: Error = new Error('Unknown error')
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err))
      if (attempt < retries) {
        // Don't retry on validation errors or bad requests
        if (lastErr.message.includes('JSON') || lastErr.message.includes('schema')) throw lastErr
        await new Promise(r => setTimeout(r, delayMs * (attempt + 1)))
      }
    }
  }
  throw lastErr
}

// ─── Public: generate property report ────────────────────────────────────────

import { SYSTEM_PROMPT, buildPropertyPrompt } from '@/lib/prompts/property-analysis'
import type { AnalyzePropertyRequest } from '@/types/report'

export interface GenerateReportResult {
  report:   PropertyReport
  model:    string
  tokens:   number
  cached:   boolean
}

export async function generatePropertyReport(
  req: AnalyzePropertyRequest,
): Promise<GenerateReportResult> {
  const userPrompt = buildPropertyPrompt(req)

  const rawText = await withRetry(() =>
    completion({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt,
      model:        'gpt-4o',
      maxTokens:    4000,
      temperature:  0.25,
    })
  )

  // Extract and parse JSON
  const parsed = extractJSON(rawText)

  // Validate against schema (throws ZodError if invalid)
  const validated = PropertyReportSchema.parse(parsed)

  return {
    report:  validated as unknown as PropertyReport,
    model:   'gpt-4o',
    tokens:  rawText.length,     // approximate — real token count needs response.usage
    cached:  false,
  }
}

// ─── Health check ─────────────────────────────────────────────────────────────

export async function checkOpenAIConnection(): Promise<boolean> {
  try {
    const client = getClient()
    // Minimal API call to verify key works
    await client.models.list()
    return true
  } catch {
    return false
  }
}
