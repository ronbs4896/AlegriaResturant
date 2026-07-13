/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // מותג אלגריה — פלטת ספר המותג
        cream: {
          DEFAULT: '#F2EADE',
          50: '#FBF8F3',
          100: '#F7F1E8',
          200: '#F2EADE',
          300: '#E8DBC7',
          400: '#DCC9AC',
        },
        charcoal: {
          DEFAULT: '#333333',
          light: '#4A4A4A',
          soft: '#5C5C5C',
          900: '#232323',
          950: '#1A1A1A',
        },
        orange: {
          DEFAULT: '#F5871F',
          400: '#F79A42',
          500: '#F5871F',
          600: '#E0740C',
          700: '#BC5F08',
        },
        honey: {
          DEFAULT: '#FCC50D',
          400: '#FDD23F',
          500: '#FCC50D',
          600: '#E0AC00',
        },
      },
      fontFamily: {
        sans: ['Birzia', 'Heebo', 'Assistant', 'system-ui', 'sans-serif'],
        display: ['Birzia', 'Heebo', 'Assistant', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 8vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        hero: ['clamp(2.25rem, 6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        warm: '0 18px 50px -20px rgba(51, 51, 51, 0.28)',
        'warm-lg': '0 30px 80px -28px rgba(51, 51, 51, 0.35)',
        ribbon: '0 10px 30px -12px rgba(245, 135, 31, 0.5)',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1.05) translate(0, 0)' },
          '100%': { transform: 'scale(1.16) translate(-1.5%, -1.5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 22s ease-out infinite alternate',
        marquee: 'marquee 60s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
