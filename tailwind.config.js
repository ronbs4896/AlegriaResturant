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
          900: '#2A2624',
          950: '#211D1B',
        },
        // "טרקוטה עמוקה" — צבע המבטא היחיד (מחליף את הכתום הזרחני)
        orange: {
          DEFAULT: '#B4511E',
          400: '#C4622D',
          500: '#B4511E',
          600: '#9A4419',
          700: '#7F3814',
        },
        // "פליז מעומעם" — מיקרו-מבטא בלבד (כוכבים, מספרים על כהה, קווים)
        honey: {
          DEFAULT: '#C89B3C',
          400: '#D5AE5C',
          500: '#C89B3C',
          600: '#A87E2F',
        },
      },
      fontFamily: {
        sans: ['Birzia', 'Heebo', 'Assistant', 'system-ui', 'sans-serif'],
        display: ['Birzia', 'Heebo', 'Assistant', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.1rem, 5.5vw, 4.1rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        hero: ['clamp(1.9rem, 4.5vw, 3.3rem)', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        warm: '0 18px 50px -20px rgba(42, 33, 27, 0.28)',
        'warm-lg': '0 30px 80px -28px rgba(42, 33, 27, 0.35)',
        ribbon: '0 10px 26px -12px rgba(180, 81, 30, 0.45)',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1.05) translate(0, 0)' },
          '100%': { transform: 'scale(1.16) translate(-1.5%, -1.5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
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
