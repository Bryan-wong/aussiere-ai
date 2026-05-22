import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef3fa',
          100: '#d5e2f4',
          200: '#aac5e9',
          300: '#7aa3d9',
          400: '#4d7fc5',
          500: '#2a5eab',
          600: '#1e4a8a',
          700: '#163869',
          800: '#0d2347',
          900: '#080f1a',
          950: '#040810',
        },
        blue: {
          brand: '#1e6fc5',
          light: '#56aaff',
          glow:  'rgba(86,170,255,0.15)',
        },
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-dm-sans)',    'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':     'fadeIn 0.5s ease forwards',
        'slide-up':    'slideUp 0.5s ease forwards',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'spin-slow':   'spin 3s linear infinite',
        'blink':       'blink 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                           to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        blink:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(30,111,197,0.06) 1px, transparent 1px)",
        'hero-gradient': "linear-gradient(to right, rgba(8,15,26,0.98) 0%, rgba(8,15,26,0.93) 32%, rgba(8,15,26,0.62) 58%, rgba(8,15,26,0.05) 82%, transparent 100%)",
      },
    },
  },
  plugins: [],
}

export default config
