/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fff0f6',
          100: '#ffe0ed',
          200: '#ffb3d1',
          300: '#ff80b0',
          400: '#ff4d8d',
          500: '#ff1a6b',
          600: '#e60055',
          700: '#b30042',
          800: '#80002f',
          900: '#4d001c',
        },
        rose: {
          glow: '#ff6b9d',
          soft: '#ff8fab',
          blush: '#ffb3c6',
          mist: '#ffd6e0',
        },
        lavender: {
          light: '#e9d5ff',
          mid: '#c77dff',
          deep: '#9d4edd',
          dark: '#7209b7',
        },
        gold: {
          soft: '#ffd700',
          warm: '#ffb347',
          glow: '#ffc93c',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'petal-fall': 'petalFall 8s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(5deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-5deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 157, 0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(255, 107, 157, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        neonPulse: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255,107,157,0.8), 0 0 20px rgba(255,107,157,0.6), 0 0 40px rgba(255,107,157,0.4)' },
          '50%': { textShadow: '0 0 20px rgba(255,107,157,1), 0 0 40px rgba(255,107,157,0.8), 0 0 80px rgba(255,107,157,0.6)' },
        },
      },
      backgroundSize: {
        '200%': '200%',
        '400%': '400%',
      },
    },
  },
  plugins: [],
}
