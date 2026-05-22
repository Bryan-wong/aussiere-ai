import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import type { PropertyReport } from '@/types/report'

export function ProsCons({ report }: { report: PropertyReport }) {
  const inv = report.investment
  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest mb-4">
        <span className="w-7 h-7 rounded-md bg-green-400/10 flex items-center justify-center text-sm">⚖</span>
        Investment Pros &amp; Cons
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-[10px] font-extrabold text-green-400 uppercase tracking-widest mb-2.5">✓ Strengths</div>
          <div className="flex flex-col gap-2">
            {inv.pros.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-green-400/6 border border-green-400/12 rounded-lg px-3 py-2.5 text-sm text-slate-300 leading-relaxed">
                <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />{p}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-extrabold text-red-400 uppercase tracking-widest mb-2.5">✗ Risks</div>
          <div className="flex flex-col gap-2">
            {inv.cons.map((c, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 leading-relaxed">
                <XCircle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />{c}
              </div>
            ))}
          </div>
        </div>
      </div>
      {inv.riskFactors?.length > 0 && (
        <div className="border-t border-white/[0.07] pt-4">
          <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
            <AlertTriangle size={11} /> Risk factors
          </div>
          <div className="flex flex-wrap gap-2">
            {inv.riskFactors.map((r, i) => (
              <span key={i} className="text-xs bg-amber-400/6 border border-amber-400/12 text-amber-400/90 rounded-md px-2.5 py-1.5">{r}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
