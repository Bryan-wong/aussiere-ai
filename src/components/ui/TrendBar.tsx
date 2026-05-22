'use client'
import { scoreColor } from '@/lib/utils'

interface TrendBarProps {
  label: string
  value: number
}

export function TrendBar({ label, value }: TrendBarProps) {
  const color = scoreColor(value)
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-400 w-16 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-white/6 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="text-sm font-bold w-8 text-right" style={{ color }}>{value}</span>
    </div>
  )
}
