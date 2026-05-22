import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { InvestmentVerdict } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scoreColor(score: number): string {
  if (score >= 70) return '#22d47a'
  if (score >= 50) return '#f5a623'
  return '#ff4f4f'
}

export function scoreBg(score: number): string {
  if (score >= 70) return 'rgba(34,212,122,0.12)'
  if (score >= 50) return 'rgba(245,166,35,0.12)'
  return 'rgba(255,79,79,0.12)'
}

export function verdictConfig(verdict: InvestmentVerdict) {
  const map: Record<InvestmentVerdict, { color: string; bg: string; border: string }> = {
    'Strong Buy':           { color: '#22d47a', bg: 'rgba(34,212,122,0.14)',  border: 'rgba(34,212,122,0.28)' },
    'Good Buy':             { color: '#22d47a', bg: 'rgba(34,212,122,0.10)',  border: 'rgba(34,212,122,0.22)' },
    'Long-Term Hold':       { color: '#56aaff', bg: 'rgba(86,170,255,0.11)',  border: 'rgba(86,170,255,0.26)' },
    'Proceed with Caution': { color: '#f5a623', bg: 'rgba(245,166,35,0.11)', border: 'rgba(245,166,35,0.28)' },
    'High Risk':            { color: '#ff4f4f', bg: 'rgba(255,79,79,0.11)',  border: 'rgba(255,79,79,0.26)' },
    'Not Recommended':      { color: '#ff4f4f', bg: 'rgba(255,79,79,0.14)',  border: 'rgba(255,79,79,0.30)' },
  }
  return map[verdict] ?? map['Long-Term Hold']
}

export function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) : value
  if (isNaN(num)) return String(value)
  return `AUD $${num.toLocaleString('en-AU')}`
}

export function formatPercent(val: number, decimals = 1): string {
  return `${val > 0 ? '+' : ''}${val.toFixed(decimals)}%`
}
