import type { Metadata, Viewport } from 'next'
import { Montserrat, DM_Sans } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title:       'Australia Real Estate AI — Smarter Insights. Better Property Decisions.',
  description: 'Enter any Australian property address and get a full AI-powered investment intelligence report in seconds. Powered by live RBA and market data.',
  keywords:    ['Australian real estate', 'property investment', 'AI property analysis', 'investment report', 'property valuation'],
  openGraph: {
    title:       'Australia Real Estate AI',
    description: 'AI-powered property investment analysis for Australian real estate.',
    type:        'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#080f1a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body className="bg-navy-900 text-slate-100 font-body antialiased">
        {children}
      </body>
    </html>
  )
}
