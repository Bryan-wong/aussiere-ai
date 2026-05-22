import type { PropertyReport } from '@/types/report'

interface Props { report: PropertyReport; listingPrice?: string }

export function PriceComparison({ report, listingPrice }: Props) {
  if (!listingPrice && !report.market.estimatedValue) return null

  const lpn = listingPrice ? parseInt(listingPrice.replace(/\D/g,'')) : 0
  const assessment = report.market.priceAssessment
  const diff = report.market.priceDiffPercent

  const badgeMap = {
    'undervalued':        { text: `Undervalued by ~${Math.abs(diff).toFixed(1)}%`,  cls: 'bg-yellow-400/11 text-yellow-400 border-yellow-400/20' },
    'fair-value':         { text: 'Fair market value',                               cls: 'bg-green-400/10  text-green-400  border-green-400/20'  },
    'slightly-overpriced':{ text: `Slightly overpriced ~${diff.toFixed(1)}%`,        cls: 'bg-amber-400/10  text-amber-400  border-amber-400/20'  },
    'overpriced':         { text: `Overpriced by ~${diff.toFixed(1)}%`,              cls: 'bg-red-400/10    text-red-400    border-red-400/20'    },
  }
  const badge = badgeMap[assessment]
  const barPct = lpn && report.market.estimatedValue
    ? Math.min(100, Math.round((Math.min(lpn, parseInt(report.market.estimatedValue.replace(/\D/g,''))) / Math.max(lpn, parseInt(report.market.estimatedValue.replace(/\D/g,'')))) * 100))
    : 75
  const barColor = assessment === 'overpriced' || assessment === 'slightly-overpriced' ? '#f04f4f' : assessment === 'undervalued' ? '#f0c040' : '#22d47a'

  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest mb-4">
        <span className="w-7 h-7 rounded-md bg-blue-light/13 flex items-center justify-center text-sm font-bold text-blue-light">$</span>
        Price Analysis
      </div>
      <div className="flex items-center gap-5 flex-wrap mb-4">
        {lpn > 0 && (
          <>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Listing price</div>
              <div className="font-display font-black text-2xl text-white">AUD ${lpn.toLocaleString()}</div>
            </div>
            <div className="text-slate-500 text-xl">→</div>
          </>
        )}
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">AI estimated value</div>
          <div className="font-display font-black text-2xl text-blue-light">{report.market.estimatedValue}</div>
        </div>
        <span className={`px-4 py-2 rounded-lg text-sm font-display font-bold border ${badge.cls}`}>{badge.text}</span>
      </div>
      {lpn > 0 && (
        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${barPct}%`, background: barColor }} />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-white/[0.03] rounded-lg p-3">
          <div className="text-[10px] text-slate-500 mb-1">Weekly rent</div>
          <div className="font-display font-bold text-sm text-white">{report.market.weeklyRent}</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-3">
          <div className="text-[10px] text-slate-500 mb-1">Gross yield</div>
          <div className="font-display font-bold text-sm text-green-400">{report.investment.keyMetrics.grossYield}</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-3">
          <div className="text-[10px] text-slate-500 mb-1">Est. net yield</div>
          <div className="font-display font-bold text-sm text-white">{report.investment.keyMetrics.netYieldEst}</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-3">
          <div className="text-[10px] text-slate-500 mb-1">Weekly cashflow</div>
          <div className={`font-display font-bold text-sm ${report.investment.keyMetrics.cashflowWeekly.startsWith('+') ? 'text-green-400' : 'text-amber-400'}`}>
            {report.investment.keyMetrics.cashflowWeekly}
          </div>
        </div>
      </div>
    </div>
  )
}
