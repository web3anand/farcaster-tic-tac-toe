/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'base-blue': '#0052FF',
        'base-purple': '#8B5CF6',
        'farcaster-orange': '#FF8C00',
        'game-x': '#3B82F6',
        'game-o': '#EF4444',
        'game-tie': '#6B7280',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'match-found': 'matchFound 0.5s ease-out',
        'cell-pop': 'cellPop 0.3s ease-out',
        'winner-celebration': 'winnerCelebration 1s ease-out',
      },
      keyframes: {
        matchFound: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cellPop: {
          '0%': { transform: 'scale(0)', rotate: '-180deg' },
          '100%': { transform: 'scale(1)', rotate: '0deg' },
        },
        winnerCelebration: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1) rotate(5deg)' },
          '50%': { transform: 'scale(1.2) rotate(-5deg)' },
          '75%': { transform: 'scale(1.1) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      }
    },
  },
  plugins: [],
}
