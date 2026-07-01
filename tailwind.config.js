/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT:'#FAF6EE', dark:'#F0EBDF', light:'#FDFBF7' },
        warm: { text:'#2D2A26', sub:'#6B6560', dim:'#A09A93', border:'#E8E2D8' },
        d1: '#0052CC',
        d2: '#7209b7',
      }
    }
  },
  plugins: []
}
