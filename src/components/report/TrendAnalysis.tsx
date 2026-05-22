import { TrendBar } from '@/components/ui/TrendBar'
import type { PropertyReport } from '@/types/report'

export function TrendAnalysis({ report }: { report: PropertyReport }) {
  const { growth } = report
  const ts = growth.trendScore

  const historical = [
    { label: '1 yr ago', value: ts.past1yr, actual: growth.past1yr },
    { label: '3 yr ago', value: ts.past3yr, actual: growth.past3yr },
    { label: '5 yr ago', value: ts.past5yr, actual: growth.past5yr },
  ]
  const outlook = [
    { label: '1 yr fwd', value: ts.next1yr, actual: growth.forecast1yr },
    { label: '3 yr fwd', value: ts.next3yr, actual: growth.forecast3yr },
    { label: '5 yr fwd', value: ts.next5yr, actual: growth.forecast5yr },
  ]

  const outlookBadge = {
    strong:    'bg-green-400/10 text-green-400 border-green-400/20',
    moderate:  'bg-blue-light/10 text-blue-light border-blue-light/20',
    flat:      'bg-slate-400/10 text-slate-400 border-slate-400/20',
    declining: 'bg-red-400/10 text-red-400 border-red-400/20',
  }[growth.outlook]

  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest">
          <span className="w-7 h-7 rounded-md bg-blue-light/13 flex items-center justify-center text-sm text-blue-light">%</span>
          Price Trend Analysis
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${outlookBadge}`}>
          {growth.outlook} outlook
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <p className="text-sm text-slate-400 leading-relaxed">{growth.narrativePast}</p>
        <p className="text-sm text-slate-400 leading-relaxed">{growth.narrativeFuture}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Historical performance</div>
          <div className="flex flex-col gap-2.5">
            {historical.map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <TrendBar label={t.label} value={t.value} />
                <span className="text-[11px] text-slate-500 w-14 text-right flex-shrink-0">{t.actual}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Growth forecast</div>
          <div className="flex flex-col gap-2.5">
            {outlook.map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <TrendBar label={t.label} value={t.value} />
                <span className="text-[11px] text-slate-500 w-14 text-right flex-shrink-0">{t.actual}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
