import { verdictConfig } from '@/lib/utils'
import type { InvestmentVerdict } from '@/types'

interface VerdictBadgeProps {
  verdict: InvestmentVerdict
  size?: 'sm' | 'md' | 'lg'
}

export function VerdictBadge({ verdict, size = 'md' }: VerdictBadgeProps) {
  const cfg = verdictConfig(verdict)
  const sizeClass = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size]

  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-extrabold tracking-wide rounded-lg ${sizeClass}`}
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {verdict}
    </span>
  )
}
