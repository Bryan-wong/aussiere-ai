'use client'
import { scoreColor } from '@/lib/utils'

interface QualityBarProps {
  label: string
  value: number   // 0-100
  dots?: number
}

export function QualityBar({ label, value, dots = 10 }: QualityBarProps) {
  const filled = Math.round((value / 100) * dots)
  const color  = scoreColor(value)

  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-sm text-slate-300 w-40 flex-shrink-0">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: dots }, (_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ background: i < filled ? color : 'rgba(255,255,255,0.08)' }}
          />
        ))}
      </div>
      <span className="text-xs font-bold w-8" style={{ color }}>{value}%</span>
    </div>
  )
}
