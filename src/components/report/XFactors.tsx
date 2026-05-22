import type { PropertyReport } from '@/types/report'
import { Zap } from 'lucide-react'

export function XFactors({ report }: { report: PropertyReport }) {
  const { developments } = report
  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest mb-4">
        <span className="w-7 h-7 rounded-md bg-yellow-400/10 flex items-center justify-center">
          <Zap size={13} className="text-yellow-400" />
        </span>
        X-Factor Signals — Hidden Price Catalysts
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {developments.xFactors.map((x, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3 bg-yellow-400/5 border border-yellow-400/12 rounded-lg text-sm text-slate-300 leading-relaxed">
            <span className="text-yellow-400 text-base flex-shrink-0 mt-0.5">◆</span>{x}
          </div>
        ))}
      </div>
      {developments.newDevelopments?.length > 0 && (
        <div className="border-t border-white/[0.07] pt-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Infrastructure pipeline</div>
          <p className="text-sm text-slate-500 mb-2">{developments.infrastructurePipeline}</p>
          <div className="flex flex-col gap-1.5">
            {developments.newDevelopments.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="text-blue-light/60 flex-shrink-0 mt-1">•</span>{d}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
