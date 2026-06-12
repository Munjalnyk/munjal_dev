/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--c-bg) / <alpha-value>)',
          subtle: 'rgb(var(--c-bg-subtle) / <alpha-value>)',
          card: 'rgb(var(--c-bg-card) / <alpha-value>)',
          elevated: 'rgb(var(--c-bg-elevated) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--c-line) / <alpha-value>)',
          strong: 'rgb(var(--c-line-strong) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          soft: 'rgb(var(--c-ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--c-ink-faint) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          alt: 'rgb(var(--c-accent-alt) / <alpha-value>)',
        },
      },
      borderColor: {
        DEFAULT: 'rgb(var(--c-line) / 1)',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        ticker: 'ticker 32s linear infinite',
        'gallery-scroll': 'ticker 55s linear infinite',
        blink: 'blink 1.1s steps(2, start) infinite',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'float-reverse': 'float-reverse 25s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -40px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-25px, 35px)' },
        },
      },
    },
  },
  plugins: [],
}
