'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import type { PropertyReport } from '@/types/report'

// ── Report section components ─────────────────────────────────────────────────
import { ReportHeader }        from '@/components/report/ReportHeader'
import { PriceComparison }     from '@/components/report/PriceComparison'
import { ProsCons }            from '@/components/report/ProsCons'
import { XFactors }            from '@/components/report/XFactors'
import { TrendAnalysis }       from '@/components/report/TrendAnalysis'
import { PolicySection }       from '@/components/report/PolicySection'
import { CommunityAnalysis }   from '@/components/report/CommunityAnalysis'
import { BuildQuality }        from '@/components/report/BuildQuality'
import { FinalRecommendation } from '@/components/report/FinalRecommendation'

// ─── Loading state ────────────────────────────────────────────────────────────
const STEPS = [
  'Processing property address...',
  'Analysing suburb market data...',
  'Calculating investment metrics...',
  'Evaluating community & lifestyle...',
  'Generating AI investment report...',
  'Finalising your premium report...',
]

function LoadingState({ address }: { address: string }) {
  const [step, setStep] = useState(0)
  const [pct,  setPct]  = useState(0)

  useEffect(() => {
    const stepIv = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 2500)
    const pctIv  = setInterval(() => setPct(p => Math.min(p + 1, 95)), 150)
    return () => { clearInterval(stepIv); clearInterval(pctIv) }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10 px-4">
      {/* Animated logo */}
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-brand to-blue-600 flex items-center justify-center shadow-[0_8px_40px_rgba(30,111,197,0.4)]">
          <span className="font-display font-black text-3xl text-white">A</span>
        </div>
        <div className="absolute -inset-2 rounded-2xl border-2 border-blue-light/30 animate-ping" />
      </div>

      <div className="text-center max-w-md w-full">
        <div className="text-xs text-slate-500 mb-2 uppercase tracking-widest font-display font-bold">
          Analysing
        </div>
        <div className="font-display font-bold text-white text-base mb-1 truncate">{address}</div>
        <div className="text-sm text-blue-light mb-6 min-h-[20px]">{STEPS[step]}</div>

        {/* Progress bar */}
        <div className="w-full bg-white/[0.07] rounded-full h-1.5 mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-brand to-blue-light transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-xs text-slate-600">{pct}% complete</div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
function PropertyPageInner() {
  const params = useSearchParams()
  const [report,  setReport]  = useState<PropertyReport | null>(null)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(true)
  const [mode,    setMode]    = useState<'live' | 'mock'>('mock')

  const address      = params.get('address')      ?? ''
  const suburb       = params.get('suburb')       ?? ''
  const state        = params.get('state')        ?? ''
  const postcode     = params.get('postcode')     ?? ''
  const type         = params.get('type')         ?? 'house'
  const purpose      = params.get('purpose')      ?? 'investment'
  const listingPrice = params.get('listingPrice') ?? ''
  const bedrooms     = params.get('bedrooms')     ? parseInt(params.get('bedrooms')!) : undefined
  const bathrooms    = params.get('bathrooms')    ? parseInt(params.get('bathrooms')!) : undefined

  const fullAddress = [address || suburb, suburb, state, postcode].filter(Boolean).join(', ')

  useEffect(() => {
    if (!suburb || !state) {
      setError('Missing address information. Please search for a property first.')
      setLoading(false)
      return
    }

    const run = async () => {
      try {
        const res  = await fetch('/api/analyze-property', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: fullAddress,
            street: address,
            suburb, state, postcode,
            type, purpose,
            ...(listingPrice ? { listingPrice } : {}),
            ...(bedrooms     ? { bedrooms }     : {}),
            ...(bathrooms    ? { bathrooms }    : {}),
          }),
        })

        const data = await res.json()

        if (!data.success) {
          setError(data.error ?? 'Analysis failed. Please try again.')
          return
        }

        setReport(data.report)
        setMode(data.cached ? 'mock' : 'live')

      } catch {
        setError('Network error. Please check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [fullAddress, suburb, state, postcode, type, purpose, listingPrice, address, bedrooms, bathrooms])

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16">

        {loading && <LoadingState address={fullAddress || suburb} />}

        {!loading && error && (
          <div className="mt-12 bg-red-400/8 border border-red-400/20 rounded-xl p-6 text-red-400">
            <strong className="block font-display font-bold mb-1">Analysis failed</strong>
            <span className="text-sm opacity-80">{error}</span>
            <div className="mt-4">
              <a href="/" className="btn-outline text-sm px-4 py-2">← Try another property</a>
            </div>
          </div>
        )}

        {!loading && report && (
          <>
            {/* Mode badge */}
            <div className="flex justify-end mb-2">
              <span className={`text-[10px] font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                mode === 'live'
                  ? 'bg-green-400/10 text-green-400 border-green-400/20'
                  : 'bg-blue-light/10 text-blue-light border-blue-light/20'
              }`}>
                {mode === 'live' ? '● Live AI report' : '● Demo report'}
              </span>
            </div>

            <ReportHeader        report={report} />
            <PriceComparison     report={report} listingPrice={listingPrice} />
            <ProsCons            report={report} />
            <XFactors            report={report} />
            <TrendAnalysis       report={report} />
            <PolicySection       report={report} />
            <CommunityAnalysis   report={report} />
            <BuildQuality        report={report} />
            <FinalRecommendation report={report} />

            <p className="text-xs text-slate-600 text-center mt-8 leading-relaxed px-4">
              This report is AI-generated using modelled suburb data for informational purposes only.
              It does not constitute financial or investment advice.
              Always conduct independent due diligence and consult a licensed financial adviser before making any investment decision.
              Report ID: {report.reportId}
            </p>

            <div className="flex justify-center mt-6">
              <a href="/" className="btn-outline text-sm px-5 py-2.5">← Analyse another property</a>
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default function PropertyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-light/20 border-t-blue-light rounded-full animate-spin" />
      </div>
    }>
      <PropertyPageInner />
    </Suspense>
  )
}
