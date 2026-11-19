/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ============================================================
        //  פלטת אלגריה — חוקי שימוש (מחייבים):
        //  olive   = הצבע הראשי. כותרות סקשן, כפתור פעולה ראשי,
        //            קישורים, מצב פעיל בניווט, ואייקוני קו.
        //            olive על לבן = 4.7:1. טקסט זית קטן על רקע צבעוני
        //            (olive-50, paper) נכשל ב-AA — שם olive-700.
        //  orange  = צבע פעולה חלופי וטבעת הפוקוס. לא לרקעים, לא לקישוט.
        //  honey   = מבטא על רקע כהה בלבד (מספרים, eyebrow, כוכבים).
        //  charcoal= טקסט ומשטחים כהים. charcoal-600 לטקסט משני.
        //  semantic= success / danger — משוב בלבד, לא עיצוב.
        // ============================================================
        olive: {
          DEFAULT: '#6B7A36',
          700: '#4F5B31', //  hover, וטקסט קטן על רקע צבעוני
          400: '#9AA765', //  נקודות על ציר הצעדים
          300: '#C9CFB0', //  קווי העיטור
          200: '#DADFC8', //  גבולות שדות
          100: '#E4E8D4', //  גבולות כרטיסים, רקע הדגשה
          50: '#F2F3EC', //   פאנלים
        },
        paper: {
          DEFAULT: '#F7F6F0', // רקע הפוטר
          200: '#F5F4EC', //    רקע תפריט השירותים
        },
        star: '#E0A21B',
        cream: {
          DEFAULT: '#F2EADE',
          50: '#FBF8F3',
          100: '#F7F1E8',
          200: '#EDE3D4',
          300: '#E8DBC7',
        },
        // גוונים חמים — תוקן מאפור טהור (#333) שהתנגש עם הקרם החם
        charcoal: {
          DEFAULT: '#2E2A27',
          soft: '#635C55',
          muted: '#8A817A',
          600: '#5A544E', //  טקסט משני בעיצוב החדש
          900: '#2A2624',
          950: '#211D1B',
        },
        // "טרקוטה עמוקה" — צבע הפעולה היחיד
        orange: {
          DEFAULT: '#B4511E',
          500: '#B4511E',
          600: '#9A4419',
          700: '#7F3814',
        },
        // "פליז מעומעם" — מבטא על כהה בלבד
        honey: {
          DEFAULT: '#C89B3C',
          400: '#D5AE5C',
          500: '#C89B3C',
        },
        // שכבה סמנטית — משוב למשתמש בלבד
        success: { DEFAULT: '#2E7D4F', soft: '#EAF3ED' },
        danger: { DEFAULT: '#A32B1C', soft: '#F8ECEA' },
      },
      fontFamily: {
        sans: ['Birzia', 'Heebo', 'Assistant', 'system-ui', 'sans-serif'],
        display: ['Birzia', 'Heebo', 'Assistant', 'system-ui', 'sans-serif'],
        // פנים למספרים ומטא־דאטה — ספרות טבלאיות, חתימה עריכתית
        num: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      // ============================================================
      //  סולם טיפוגרפי — 6 מדרגות עם קפיצות גדולות.
      //  יחס כותרת:גוף ~2.5x (היה 1.5x — שם נולדה תחושת ה"תבנית").
      // ============================================================
      fontSize: {
        // גוף ומטא
        micro: ['0.75rem', { lineHeight: '1.5' }], //          12px
        meta: ['0.8125rem', { lineHeight: '1.6' }], //         13px
        body: ['0.9375rem', { lineHeight: '1.75' }], //        15px — תקן עברית
        lead: ['1.0625rem', { lineHeight: '1.7' }], //         17px
        // כותרות
        h3: ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        h2: ['clamp(1.875rem, 3.6vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        display: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        hero: ['clamp(2.125rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        // מספרים גדולים (סטטיסטיקות)
        stat: ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
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
        // ב-RTL העותק השני יושב משמאל למקור, ולכן התנועה ימינה היא
        // זו שנסגרת בלי תפר.
        'marquee-rtl': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // אדים — לולאה איטית, לא לופ מכני. שלושה קווים באותו keyframe
        // בהיסט זמן, כך שהתנועה נקראת אקראית בלי לחשב אקראיות.
        steam: {
          '0%': { opacity: '0', transform: 'translateY(6px) scaleY(0.75)' },
          '28%': { opacity: '0.8' },
          '70%': { opacity: '0.3' },
          '100%': { opacity: '0', transform: 'translateY(-12px) scaleY(1.1)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 22s ease-out infinite alternate',
        marquee: 'marquee 60s linear infinite',
        'marquee-rtl': 'marquee-rtl 36s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
        steam: 'steam 3.4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
