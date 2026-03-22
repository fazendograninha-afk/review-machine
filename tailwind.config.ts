import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        serif:   ['DM Serif Display', 'serif'],
        body:    ['Manrope', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        rm: {
          bg:          '#0A0A08',
          dark:        '#111110',
          card:        '#1E1E1A',
          border:      '#2A2A24',
          gold:        '#C8A84B',
          'gold-light':'#E8C96A',
          'gold-dim':  '#7A6328',
          orange:      '#FF6B35',
          green:       '#4CAF7A',
          red:         '#E05555',
          text:        '#E8E8E0',
          'text-dim':  '#888880',
          'text-muted':'#555550',
        },
        // Legado — manter para componentes existentes
        synkra: {
          black:        '#0A0A08',
          dark:         '#111110',
          card:         '#1E1E1A',
          border:       '#2A2A24',
          accent:       '#C8A84B',
          'accent-dim': '#7A6328',
          neon:         '#E8C96A',
          'neon-dim':   '#C8A84B',
          orange:       '#FF6B35',
          gold:         '#C8A84B',
          muted:        '#555550',
          text:         '#E8E8E0',
          'text-dim':   '#888880',
        }
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0zm31 0h1v32h-1zM0 0v1h32V0zm0 31v1h32v-1z' fill='%232A2A24' fill-opacity='0.4'/%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':      'float 6s ease-in-out infinite',
        'scan':       'scan 2s linear infinite',
        'shimmer':    'shimmer 4s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease forwards',
      },
      keyframes: {
        float:       { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        scan:        { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        shimmer:     { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        'fade-in-up':{ from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      }
    },
  },
  plugins: [],
}
export default config
