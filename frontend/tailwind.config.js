/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        loop: {
          bg: '#050505',
          sidebar: '#0A0A0B',
          card: '#121214',
          border: '#1F1F23',
          'border-subtle': '#18181B',
          gold: '#E5A93C',
          'gold-light': '#F5BE58',
          'gold-dark': '#9A6B1A',
          'gold-glow': 'rgba(229, 169, 60, 0.12)',
          'gold-active': 'rgba(229, 169, 60, 0.18)',
          muted: '#71717A',
          dim: '#A1A1AA',
          text: '#F4F4F5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}

