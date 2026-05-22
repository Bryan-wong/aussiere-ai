import { VerdictBadge } from '@/components/ui/VerdictBadge'
import { scoreColor } from '@/lib/utils'
import type { PropertyReport } from '@/types/report'
import { MapPin, Bed, Bath, Car, Ruler, Calendar, Home } from 'lucide-react'

interface Props { report: PropertyReport }

export function ReportHeader({ report }: Props) {
  const pf = report.features

  const kpis = [
    { label: 'Median suburb',  value: report.market.medianSuburb,    cls: '' },
    { label: 'Rental yield',   value: report.market.rentalYield,     cls: 'text-green-400' },
    { label: 'Vacancy rate',   value: report.market.vacancyRate,     cls: '' },
    { label: '5yr growth',     value: report.growth.past5yr,         cls: report.growth.past5yr?.startsWith('-') ? 'text-red-400' : 'text-green-400' },
  ]

  const features = [
    pf?.bedrooms    && { icon: <Bed  size={12} />, label: `${pf.bedrooms} Bed`  },
    pf?.bathrooms   && { icon: <Bath size={12} />, label: `${pf.bathrooms} Bath` },
    pf?.carSpaces   && { icon: <Car  size={12} />, label: `${pf.carSpaces} Car`  },
    pf?.landSize    && pf.landSize !== 'Not provided' && { icon: <Ruler    size={12} />, label: pf.landSize },
    pf?.buildYear   && { icon: <Calendar size={12} />, label: `Built ${pf.buildYear}` },
    pf?.propertyType && { icon: <Home size={12} />, label: pf.propertyType },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[]

  return (
    <div className="card relative overflow-hidden p-6 mb-4">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-brand via-blue-light to-blue-brand" />

      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <MapPin size={12} /> {report.address}
      </div>
      <h2 className="font-display font-extrabold text-xl text-white mb-4">
        Investment Intelligence Report
      </h2>

      <div className="flex items-center gap-4 flex-wrap mb-5">
        <VerdictBadge verdict={report.investment.verdict} size="md" />
        <div className="flex items-baseline gap-1 font-display">
          <span className="text-5xl font-black leading-none" style={{ color: scoreColor(report.investment.overallScore) }}>
            {report.investment.overallScore}
          </span>
          <span className="text-lg text-slate-500">/100</span>
        </div>
        <div className="text-xs text-slate-500 leading-tight">Investment<br />score</div>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-display font-bold ${
          report.investment.confidenceLevel === 'high'   ? 'bg-green-400/10 text-green-400 border-green-400/20' :
          report.investment.confidenceLevel === 'medium' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
                                                           'bg-red-400/10   text-red-400   border-red-400/20'
        }`}>
          {report.investment.confidenceLevel} confidence
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{k.label}</div>
            <div className={`font-display font-extrabold text-[15px] text-white ${k.cls}`}>{k.value ?? 'N/A'}</div>
          </div>
        ))}
      </div>

      {features.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.07]">
          {features.map((f, i) => (
            <span key={i} className="flex items-center gap-1.5 bg-blue-light/8 border border-blue-light/15 rounded-md px-3 py-1.5 text-xs text-slate-200 font-medium">
              <span className="text-blue-light">{f.icon}</span>{f.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
