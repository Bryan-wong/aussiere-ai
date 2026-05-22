import { VerdictBadge } from '@/components/ui/VerdictBadge'
import type { PropertyReport } from '@/types/report'
import { Target, Clock, TrendingUp } from 'lucide-react'

export function FinalRecommendation({ report }: { report: PropertyReport }) {
  const inv = report.investment
  return (
    <div className="bg-gradient-to-br from-blue-brand/18 to-navy-800/90 border border-blue-light/22 rounded-xl p-6 mb-4">
      <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest mb-4">
        <span className="w-7 h-7 rounded-md bg-blue-light/13 flex items-center justify-center text-sm">🎯</span>
        Final Recommendation
      </div>
      <VerdictBadge verdict={inv.verdict} size="lg" />
      <p className="text-sm text-slate-300 leading-relaxed mt-4 mb-5">{inv.finalSummary}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/[0.05] rounded-lg p-3.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest mb-2">
            <TrendingUp size={11} /> Cash flow
          </div>
          <div className="text-sm text-slate-200 font-medium">{inv.cashflowAnalysis}</div>
        </div>
        <div className="bg-white/[0.05] rounded-lg p-3.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest mb-2">
            <Target size={11} /> Growth case
          </div>
          <div className="text-sm text-slate-200 font-medium">{inv.capitalGrowthCase}</div>
        </div>
        <div className="bg-white/[0.05] rounded-lg p-3.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest mb-2">
            <Clock size={11} /> Hold strategy
          </div>
          <div className="text-sm text-slate-200 font-medium">{inv.holdPeriodAdvice}</div>
        </div>
      </div>
    </div>
  )
}
