'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AddressSearch } from './AddressSearch'
import type { AddressSuggestion, PropertyType, InvestmentPurpose } from '@/types'

export function PropertySearchForm() {
  const router = useRouter()
  const [selected, setSelected]     = useState<AddressSuggestion | null>(null)
  const [price,    setPrice]         = useState('')
  const [type,     setType]          = useState<PropertyType>('house')
  const [purpose,  setPurpose]       = useState<InvestmentPurpose>('investment')
  const [loading,  setLoading]       = useState(false)
  const [error,    setError]         = useState('')

  const handleSelect = (s: AddressSuggestion) => { setSelected(s); setError('') }

  const handleSubmit = async () => {
    if (!selected) { setError('Please select an address from the suggestions.'); return }
    setLoading(true); setError('')
    try {
      const params = new URLSearchParams({
        address:  selected.street,
        suburb:   selected.suburb,
        state:    selected.state,
        postcode: selected.postcode,
        type,
        purpose,
        ...(price ? { listingPrice: price.replace(/\D/g, '') } : {}),
      })
      router.push(`/property?${params.toString()}`)
    } catch { setError('Something went wrong. Please try again.') } finally { setLoading(false) }
  }

  return (
    <div className="bg-[rgba(8,15,26,0.88)] border border-white/13 rounded-2xl p-6 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
      {/* Title */}
      <div className="flex items-center gap-2 font-display font-bold text-sm text-white mb-4">
        <span className="block w-0.5 h-4 bg-blue-brand rounded-full flex-shrink-0" />
        Analyse a property
      </div>

      {/* Address autocomplete */}
      <AddressSearch onSelect={handleSelect} className="mb-3" />

      {/* Extra fields */}
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest">
            Listing price (AUD)
          </label>
          <input
            type="text"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="e.g. 850,000"
            className="bg-white/5 border border-white/[0.07] rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-blue-light/45 focus:bg-blue-light/5 transition-all font-body"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest">
            Property type
          </label>
          <select
            value={type}
            onChange={e => setType(e.target.value as PropertyType)}
            className="bg-white/5 border border-white/[0.07] rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-light/45 transition-all font-body"
          >
            <option value="house">House</option>
            <option value="unit">Unit / Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest">
            Purpose
          </label>
          <select
            value={purpose}
            onChange={e => setPurpose(e.target.value as InvestmentPurpose)}
            className="bg-white/5 border border-white/[0.07] rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-light/45 transition-all font-body"
          >
            <option value="investment">Investment / Rental</option>
            <option value="owner">Owner-occupier</option>
            <option value="both">Both / Unsure</option>
          </select>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading || !selected}
        className="btn-primary w-full py-3.5 text-[15px]"
      >
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Redirecting...</>
        ) : (
          <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Generate My Property Report</>
        )}
      </button>

      <div className="flex gap-5 mt-3 flex-wrap">
        {['Free first report', 'Smart address search', 'Live RBA & market data'].map(t => (
          <span key={t} className="text-[12px] text-slate-500 font-medium">✓ {t}</span>
        ))}
      </div>
    </div>
  )
}
