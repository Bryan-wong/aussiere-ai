'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 bg-[rgba(8,15,26,0.96)] backdrop-blur-xl border-b border-white/[0.07]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 no-underline">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-brand to-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-display font-black text-sm">A</span>
        </div>
        <div>
          <div className="font-display font-black text-[13px] text-white tracking-[0.1em] leading-none">
            AUSTRALIA REAL ESTATE AI
          </div>
          <div className="text-[9px] text-blue-light tracking-[0.12em] font-semibold leading-none mt-0.5">
            SMARTER INSIGHTS · BETTER DECISIONS
          </div>
        </div>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="#how"     className="text-slate-400 hover:text-white text-sm font-medium transition-colors">How it works</Link>
        <Link href="/pricing" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Pricing</Link>
        <Link href="/pricing" className="btn-primary text-[13px] px-4 py-2">
          Free Report →
        </Link>
      </div>

      {/* Mobile toggle */}
      <button className="md:hidden text-slate-400" onClick={() => setOpen(o => !o)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-[rgba(8,15,26,0.98)] border-b border-white/[0.07] py-4 flex flex-col gap-4 px-6 md:hidden">
          <Link href="#how"     className="text-slate-300 text-sm font-medium" onClick={() => setOpen(false)}>How it works</Link>
          <Link href="/pricing" className="text-slate-300 text-sm font-medium" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/pricing" className="btn-primary text-sm w-full justify-center" onClick={() => setOpen(false)}>
            Free Report →
          </Link>
        </div>
      )}
    </nav>
  )
}
