/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Share Tech Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      colors: {
        cyan: { neon: '#00fff7' },
        purple: { neon: '#bf00ff' },
      },
    },
  },
  plugins: [],
}