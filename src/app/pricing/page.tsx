import { Navbar } from '@/components/layout/Navbar'
import { PRICING_PLANS } from '@/lib/mock-data'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-14">
          <p className="section-eyebrow">Pricing</p>
          <h1 className="section-heading text-[clamp(30px,5vw,52px)] mb-4">Simple, transparent pricing</h1>
          <p className="text-slate-400 text-[16px] max-w-lg mx-auto">
            Start free. Upgrade when you&apos;re ready. Cancel anytime — no lock-in contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {PRICING_PLANS.map(plan => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? 'bg-gradient-to-b from-blue-brand/22 to-navy-800/95 border border-blue-light/38 shadow-[0_0_50px_rgba(86,170,255,0.12)]'
                  : 'card'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-brand to-blue-600 text-white font-display font-extrabold text-[10px] px-4 py-1.5 rounded-full tracking-widest whitespace-nowrap shadow-[0_4px_16px_rgba(30,111,197,0.4)]">
                  {plan.badge}
                </div>
              )}
              <div className={`font-display font-extrabold text-xs uppercase tracking-widest mb-3 ${plan.featured ? 'text-blue-light' : 'text-slate-400'}`}>
                {plan.name}
              </div>
              <div className={`font-display font-black leading-none mb-1 text-4xl ${plan.featured ? 'text-blue-light' : 'text-white'}`}>
                {plan.price}<span className="text-sm font-medium text-slate-500">{plan.period}</span>
              </div>
              <div className="text-xs text-slate-500 mb-5">{plan.desc}</div>
              <hr className="border-white/[0.07] mb-5" />
              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f.text} className={`flex items-start gap-2 text-sm leading-snug ${f.included ? 'text-slate-300' : 'text-slate-600'}`}>
                    {f.included
                      ? <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                      : <XCircle      size={14} className="text-slate-600   flex-shrink-0 mt-0.5" />
                    }
                    {f.text}
                  </li>
                ))}
              </ul>
              <button className={plan.featured ? 'btn-primary w-full py-3' : 'btn-outline w-full py-3'}>
                {plan.cta}
              </button>
              {'savingNote' in plan && plan.savingNote && (
                <p className="text-center text-[11px] text-green-400 font-semibold mt-2">{plan.savingNote}</p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-16">
          <h2 className="font-display font-bold text-white text-xl mb-6 text-center">Frequently asked questions</h2>
          {[
            { q: 'How accurate are the property reports?',   a: 'Reports are generated using live web search data including realestate.com.au, domain.com.au, RBA website, and local council sources. Accuracy depends on data availability for the specific suburb.' },
            { q: 'Is this financial advice?',                 a: 'No. AussieRE AI reports are for informational and research purposes only. Always consult a licensed financial adviser and buyer\'s agent before making investment decisions.' },
            { q: 'How do I cancel my subscription?',          a: 'You can cancel anytime from your account dashboard. No cancellation fees apply.' },
            { q: 'Can I use this for commercial purposes?',   a: 'Pro plan subscribers may use reports for personal investment research. Commercial redistribution requires a separate enterprise agreement.' },
          ].map(faq => (
            <div key={faq.q} className="card p-5 mb-3">
              <h3 className="font-display font-bold text-white text-sm mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
