import { QualityBar } from '@/components/ui/QualityBar'
import type { PropertyReport } from '@/types/report'
import { CheckSquare } from 'lucide-react'

export function BuildQuality({ report }: { report: PropertyReport }) {
  const bc = report.buildCondition
  const bars = [
    { label: 'Build quality',        value: bc.buildQuality  },
    { label: 'Renovation potential', value: bc.renovationPct },
    { label: 'Structural safety',    value: 100 - bc.structuralRisk  },
    { label: 'Maintenance rating',   value: 100 - bc.maintenanceRisk },
  ]
  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest">
          <span className="w-7 h-7 rounded-md bg-amber-400/10 flex items-center justify-center text-sm">🔧</span>
          Property &amp; Build Quality
        </div>
        {bc.estimatedRenovCost && (
          <span className="text-[11px] text-amber-400 font-medium">Reno est: {bc.estimatedRenovCost}</span>
        )}
      </div>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{bc.buildNote}</p>
      {bars.map(b => <QualityBar key={b.label} label={b.label} value={b.value} />)}
      {bc.inspectionTips?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/[0.07]">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Pre-purchase inspection checklist</div>
          <div className="flex flex-col gap-2">
            {bc.inspectionTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                <CheckSquare size={13} className="text-blue-light flex-shrink-0 mt-0.5" />{tip}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
