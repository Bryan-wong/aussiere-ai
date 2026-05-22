import type { PropertyReport } from '@/types/report'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

export function PolicySection({ report }: { report: PropertyReport }) {
  const eco = report.economics
  const directionIcon = {
    rising:  <TrendingUp  size={14} className="text-red-400" />,
    holding: <Minus       size={14} className="text-amber-400" />,
    falling: <TrendingDown size={14} className="text-green-400" />,
  }[eco.rateDirection]

  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest mb-4">
        <span className="w-7 h-7 rounded-md bg-blue-light/13 flex items-center justify-center text-sm">🏛</span>
        Policy &amp; Economic Environment
      </div>

      <div className="flex items-center gap-4 flex-wrap mb-4">
        <div className="inline-flex items-center gap-3 bg-blue-light/10 border border-blue-light/20 rounded-xl px-4 py-3">
          <div>
            <div className="text-[10px] text-slate-500 mb-0.5">RBA Cash Rate</div>
            <div className="font-display font-black text-2xl text-blue-light leading-none">{eco.cashRate}</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            {directionIcon}
            <span className="capitalize">{eco.rateDirection}</span>
          </div>
          <div className="text-[10px] text-slate-500">{eco.rateDate}</div>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-4">{eco.policyAnalysis}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.05]">
          <div className="text-[10px] text-slate-500 mb-1">Stamp duty est.</div>
          <div className="text-sm text-white font-medium">{eco.stampDuty}</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.05]">
          <div className="text-[10px] text-slate-500 mb-1">Land tax</div>
          <div className="text-sm text-white font-medium">{eco.landTax}</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.05]">
          <div className="text-[10px] text-slate-500 mb-1">Borrowing impact</div>
          <div className="text-sm text-white font-medium">{eco.borrowingImpact}</div>
        </div>
      </div>
    </div>
  )
}
