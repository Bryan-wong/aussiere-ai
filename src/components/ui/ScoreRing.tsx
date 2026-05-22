'use client'
import { scoreColor } from '@/lib/utils'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  label?: string
  className?: string
}

export function ScoreRing({ score, size = 56, strokeWidth = 4, label, className }: ScoreRingProps) {
  const r = (size / 2) - strokeWidth - 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = scoreColor(score)
  const fontSize = size < 50 ? 10 : size < 70 ? 13 : 16

  return (
    <div className={`flex flex-col items-center gap-1 ${className ?? ''}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          cx={size / 2} cy={size / 2} r={r}
        />
        <circle
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx={size / 2} cy={size / 2} r={r}
          strokeDasharray={circ.toFixed(1)}
          strokeDashoffset={offset.toFixed(1)}
          className="ring-fill"
        />
        <text
          x={size / 2} y={size / 2 + fontSize * 0.38}
          textAnchor="middle"
          fontFamily="var(--font-montserrat), system-ui"
          fontSize={fontSize}
          fontWeight="900"
          fill={color}
        >
          {score}
        </text>
      </svg>
      {label && <span className="text-[11px] text-slate-500">{label}</span>}
    </div>
  )
}
