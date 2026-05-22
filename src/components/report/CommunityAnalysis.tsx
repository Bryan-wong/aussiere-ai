import { ScoreRing } from '@/components/ui/ScoreRing'
import type { PropertyReport } from '@/types/report'
import { School, Bus, ShoppingBag, Leaf, DollarSign, Hammer, MapPin } from 'lucide-react'

export function CommunityAnalysis({ report }: { report: PropertyReport }) {
  const st  = report.safetyTransport
  const sa  = report.schoolsAmenities
  const dev = report.developments
  const sp  = report.suburbProfile

  const rings = [
    { label: 'Safety',    score: st.safetyRating    },
    { label: 'Transit',   score: st.transitScore    },
    { label: 'Schools',   score: sa.schoolScore     },
    { label: 'Amenities', score: sa.amenitiesScore  },
    { label: 'Lifestyle', score: Math.round((st.safetyRating + sa.amenitiesScore) / 2) },
  ]

  const details = [
    { icon: <School size={13} />,      label: 'Primary schools',  value: sa.primarySchools.join(', ')   },
    { icon: <School size={13} />,      label: 'Secondary schools', value: sa.secondarySchools.join(', ') },
    { icon: <Bus size={13} />,         label: 'Transport',         value: st.transitDetail               },
    { icon: <ShoppingBag size={13} />, label: 'Shopping',          value: sa.shoppingCentres.join(', ')  },
    { icon: <Hammer size={13} />,      label: 'New developments',  value: dev.newDevelopments.join('. ') },
    { icon: <DollarSign size={13} />,  label: 'Cost of living',    value: sp.demographics                },
    { icon: <Leaf size={13} />,        label: 'Liveability',       value: sp.overview                    },
  ].filter(d => d.value)

  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center gap-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest mb-5">
        <span className="w-7 h-7 rounded-md bg-green-400/10 flex items-center justify-center text-sm">🏘</span>
        Community &amp; Lifestyle Intelligence
      </div>

      {/* Score rings */}
      <div className="grid grid-cols-5 gap-2 mb-5">
        {rings.map(r => (
          <div key={r.label} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-3 text-center">
            <ScoreRing score={r.score} size={52} />
            <div className="text-[10px] text-slate-500 mt-2">{r.label}</div>
          </div>
        ))}
      </div>

      {/* Suburb tag */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2.5 bg-blue-light/5 border border-blue-light/12 rounded-lg">
        <MapPin size={13} className="text-blue-light flex-shrink-0" />
        <span className="text-sm text-slate-300">{sp.overview}</span>
      </div>

      {/* Details grid */}
      <div className="border-t border-white/[0.07] pt-4 flex flex-col gap-3">
        {details.map((d, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <span className="text-slate-500 mt-0.5 flex-shrink-0">{d.icon}</span>
            <span>
              <span className="text-slate-500 text-xs mr-1.5">{d.label}:</span>
              <span className="text-slate-300">{d.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
