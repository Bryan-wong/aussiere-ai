import { Navbar } from '@/components/layout/Navbar'
import { PropertySearchForm } from '@/components/search/PropertySearchForm'
import { PRICING_PLANS } from '@/lib/mock-data'
import { CheckCircle2, XCircle } from 'lucide-react'

const FEATURES = [
  { icon: '🏠', title: 'Smart address autocomplete',  desc: 'Type any address and get instant suburb suggestions — just like realestate.com.au.' },
  { icon: '💰', title: 'Price accuracy check',         desc: 'AI market value vs listing price. Know instantly if you\'re being overcharged.' },
  { icon: '📈', title: '10-year trend analysis',        desc: 'Past 5-year suburb performance and forward 5-year projections with confidence.' },
  { icon: '⚡', title: 'X-factor signals',              desc: 'Infrastructure, rezoning, population trends — hidden catalysts that move prices.' },
  { icon: '🏛', title: 'Live RBA & policy data',        desc: 'Current cash rate, inflation, lending environment and state-specific tax impacts.' },
  { icon: '🏘', title: 'Community intelligence',        desc: 'Safety, schools, transport, new developments and shopping — updated in real time.' },
]

const STATS = [
  { num: '8',     lbl: 'States & Territories' },
  { num: '15+',   lbl: 'Data points per report' },
  { num: '~15s',  lbl: 'Report generation' },
  { num: 'Live',  lbl: 'RBA & market data' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-stretch overflow-hidden"
        id="analyser"
      >
        {/* Background photo */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-[62%_center]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')" }}
        />
        {/* Gradient overlay — dark left, clear right */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,15,26,0.98)_0%,rgba(8,15,26,0.93)_32%,rgba(8,15,26,0.62)_58%,rgba(8,15,26,0.05)_82%,transparent_100%)]" />

        {/* Left content panel */}
        <div className="relative z-10 w-full md:w-[54%] min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12">
          <div className="inline-flex items-center gap-2 bg-blue-brand/18 border border-blue-light/30 rounded-full px-4 py-1.5 text-[11px] font-display font-bold text-blue-light tracking-[0.08em] mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-light animate-blink" />
            AI-Powered · Real-Time Data · Australian Properties
          </div>

          <h1 className="font-display font-black text-white leading-[1.07] tracking-tight text-[clamp(28px,3.8vw,52px)] mb-4 [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
            Instantly Know If a<br />
            Property Is{' '}
            <span className="text-blue-light">Worth Buying</span>
          </h1>

          <p className="text-[clamp(14px,1.4vw,17px)] text-slate-300/80 font-light leading-relaxed max-w-md mb-8">
            Enter any Australian address and get a full AI investment intelligence report in seconds.
            Powered by live RBA and market data.
          </p>

          <PropertySearchForm />
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <div className="bg-navy-800/98 border-y border-white/[0.07]">
        <div className="max-w-3xl mx-auto flex">
          {STATS.map((s, i) => (
            <div key={s.lbl} className={`flex-1 py-4 text-center ${i < STATS.length - 1 ? 'border-r border-white/[0.07]' : ''}`}>
              <div className="font-display font-black text-[22px] text-blue-light">{s.num}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20" id="how">
        <p className="section-eyebrow">What you get</p>
        <h2 className="section-heading text-[clamp(26px,4vw,40px)] mb-3">Premium analysis. Zero guesswork.</h2>
        <p className="text-slate-400 text-[15px] max-w-lg mb-10">
          Every report covers the critical factors Australian buyers and investors need.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="card p-5 hover:border-blue-light/20 transition-colors group">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-display font-extrabold text-sm text-white mb-1.5">{f.title}</div>
              <div className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.07] bg-navy-800/40 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-eyebrow text-center">How it works</p>
          <h2 className="section-heading text-center text-[clamp(24px,4vw,38px)] mb-14">
            Three steps to investment clarity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Enter an address',    desc: 'Type any Australian property address. Smart autocomplete suggests matching addresses instantly.' },
              { n: '02', title: 'AI analyses the data', desc: 'Our AI searches live market data, RBA rates, suburb trends, schools, transport and more.' },
              { n: '03', title: 'Get your report',      desc: 'Receive a premium investment report with a score, verdict, growth forecast and full suburb analysis.' },
            ].map(step => (
              <div key={step.n} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-brand to-blue-600 flex items-center justify-center font-display font-black text-white text-xl mb-4 shadow-[0_8px_24px_rgba(30,111,197,0.35)]">
                  {step.n}
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20" id="pricing">
        <p className="section-eyebrow">Pricing</p>
        <h2 className="section-heading text-[clamp(26px,4vw,40px)] mb-3">Choose your plan</h2>
        <p className="text-slate-400 text-[15px] mb-12">Start free. Upgrade when ready. Cancel anytime.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICING_PLANS.map(plan => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? 'bg-gradient-to-b from-blue-brand/22 to-navy-800/95 border border-blue-light/38 shadow-[0_0_40px_rgba(86,170,255,0.1)] hover:shadow-[0_8px_50px_rgba(86,170,255,0.2)]'
                  : 'card hover:border-white/13'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-brand to-blue-600 text-white font-display font-extrabold text-[10px] px-4 py-1.5 rounded-full tracking-widest whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className={`font-display font-extrabold text-xs uppercase tracking-widest mb-3 ${plan.featured ? 'text-blue-light' : 'text-slate-400'}`}>
                {plan.name}
              </div>
              <div className={`font-display font-black leading-none mb-0.5 text-[clamp(28px,3vw,36px)] ${plan.featured ? 'text-blue-light' : 'text-white'}`}>
                {plan.price}<span className="text-sm font-medium text-slate-500">{plan.period}</span>
              </div>
              <div className="text-xs text-slate-500 mb-4">{plan.desc}</div>

              <hr className="border-white/[0.07] mb-4" />

              <ul className="flex flex-col gap-2 flex-1 mb-5">
                {plan.features.map(f => (
                  <li key={f.text} className={`flex items-start gap-2 text-sm ${f.included ? 'text-slate-300' : 'text-slate-600'}`}>
                    {f.included
                      ? <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                      : <XCircle      size={13} className="text-slate-600   flex-shrink-0 mt-0.5" />
                    }
                    {f.text}
                  </li>
                ))}
              </ul>

              <button className={plan.featured ? 'btn-primary w-full' : 'btn-outline w-full'}>
                {plan.cta}
              </button>
              {'savingNote' in plan && plan.savingNote && (
                <p className="text-center text-[11px] text-green-400 font-semibold mt-2">{plan.savingNote}</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-600 mt-6">7-day money-back guarantee. No lock-in contracts.</p>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.07] bg-gradient-to-b from-navy-800/60 to-navy-900 py-20">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="section-heading text-[clamp(26px,4vw,40px)] mb-4">
            Don&apos;t buy the <span className="text-red-400">wrong property.</span>
          </h2>
          <p className="text-slate-400 mb-8 text-[15px] leading-relaxed">
            Get your first AI-powered property report free. No credit card required.
          </p>
          <a href="#analyser" className="btn-primary px-8 py-4 text-base">
            Generate My Free Report →
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.07] py-8 px-6 text-center">
        <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
          <strong className="text-slate-500">Australia Real Estate AI</strong> — Smarter insights. Better property decisions.<br />
          Reports are AI-generated for informational purposes only and do not constitute financial or investment advice.
        </p>
      </footer>
    </>
  )
}
