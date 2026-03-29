/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#080810',
          subtle: '#0f0f1a',
          card: '#13131f',
          hover: '#1a1a28',
        },
        border: {
          DEFAULT: '#1e1e2e',
          subtle: '#16162a',
          strong: '#2a2a40',
        },
        text: {
          primary: '#e8e8f5',
          secondary: '#8888a8',
          tertiary: '#555570',
        },
        accent: {
          DEFAULT: '#00e5ff',
          dim: 'rgba(0, 229, 255, 0.08)',
          glow: 'rgba(0, 229, 255, 0.25)',
          muted: 'rgba(0, 229, 255, 0.5)',
        },
        violet: {
          DEFAULT: '#7c3aed',
          dim: 'rgba(124, 58, 237, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        'dot-pattern': `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-lg': '60px 60px',
        'dot-lg': '30px 30px',
      },
    },
  },
  plugins: [],
}
