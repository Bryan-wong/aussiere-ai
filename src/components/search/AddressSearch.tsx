'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, MapPin, X, Loader2 } from 'lucide-react'
import type { AddressSuggestion } from '@/types'

interface AddressSearchProps {
  onSelect: (suggestion: AddressSuggestion) => void
  placeholder?: string
  className?: string
}

export function AddressSearch({ onSelect, placeholder, className }: AddressSearchProps) {
  const [query,       setQuery]       = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [loading,     setLoading]     = useState(false)
  const [open,        setOpen]        = useState(false)
  const [activeIdx,   setActiveIdx]   = useState(-1)

  const inputRef    = useRef<HTMLInputElement>(null)
  const dropRef     = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.closest('.addr-wrapper')?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fetchSuggestions = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/search-address?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      if (data.success) {
        setSuggestions(data.suggestions)
        setOpen(data.suggestions.length > 0)
        setActiveIdx(-1)
      }
    } catch { /* silent */ } finally {
      setLoading(false)
    }
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length < 3) { setSuggestions([]); setOpen(false); return }
    debounceRef.current = setTimeout(() => fetchSuggestions(val.trim()), 450)
  }

  const handleSelect = (sugg: AddressSuggestion) => {
    setQuery(sugg.display)
    setSuggestions([])
    setOpen(false)
    onSelect(sugg)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'ArrowDown')  { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); handleSelect(suggestions[activeIdx]) }
    if (e.key === 'Escape')     { setOpen(false); setActiveIdx(-1) }
  }

  const clear = () => { setQuery(''); setSuggestions([]); setOpen(false); inputRef.current?.focus() }

  return (
    <div className={`addr-wrapper relative ${className ?? ''}`}>
      {/* Input */}
      <div className="flex items-center bg-white/5 border border-white/13 rounded-xl transition-all duration-200 focus-within:border-blue-light/50 focus-within:bg-blue-light/5 focus-within:shadow-[0_0_0_1px_rgba(86,170,255,0.15)]">
        <div className="pl-4 pr-2 text-slate-500 flex-shrink-0">
          {loading ? <Loader2 size={18} className="animate-spin text-blue-light" /> : <Search size={18} />}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder ?? 'Type an address… e.g. 27/39 Moir Road, Kingston TAS'}
          className="flex-1 bg-transparent border-none outline-none py-3.5 pr-2 text-sm text-slate-100 placeholder-slate-500 font-body"
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button onClick={clear} className="pr-4 pl-1 text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          ref={dropRef}
          className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-navy-800 border border-white/13 rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
        >
          <div className="px-4 py-2 text-[10px] font-display font-bold text-slate-500 uppercase tracking-widest border-b border-white/[0.07]">
            Suggested locations
          </div>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={() => handleSelect(s)}
              onMouseEnter={() => setActiveIdx(i)}
              className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors border-b border-white/[0.05] last:border-0 ${
                i === activeIdx ? 'bg-blue-light/10' : 'hover:bg-blue-light/8'
              }`}
            >
              <MapPin size={16} className="text-blue-light mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{s.display}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{s.suburb}, {s.state} {s.postcode}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
