/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#020b14', // Deep abyss
          900: '#061325', // Midnight bathypelagic
          850: '#0a1d37', // Deep mesopelagic
          800: '#0d284c', // Epipelagic deep
          700: '#143c6d',
          600: '#1c5598',
          500: '#2574c7',
          400: '#3894e6',
          300: '#68b5f3',
          200: '#a3d4fb',
          100: '#d9edfd',
          50:  '#f0f8ff',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          neon: '#00f0ff',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          neon: '#0df5c4',
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
          neon: '#ff3366',
        },
        amber: {
          neon: '#ffb703',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.45)',
        'glow-teal': '0 0 25px -5px rgba(20, 184, 166, 0.45)',
        'glow-coral': '0 0 25px -5px rgba(244, 63, 94, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'sonar': 'sonar 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sonar: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
