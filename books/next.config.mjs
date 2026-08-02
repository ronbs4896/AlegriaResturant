// המערכת מוגשת מתוך אותו דומיין של אתר השיווק, תחת /books.
// אתר השיווק מנתב לכאן ב-vercel.json שבשורש ה-repo, ו-basePath
// גורם לכל קישור, נכס וקריאת API לצאת עם התחילית הזו. שינוי כאן
// מחייב שינוי מקביל שם.
const BASE_PATH = '/books'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BASE_PATH,

  // חושף את הערך לקוד הריצה, כדי שעוגיית ההתחברות תוגבל לנתיב
  // הזה ולא תישלח בכל בקשה לאתר הציבורי, וכדי ש-fetch מהדפדפן
  // יפנה לנתיב הנכון.
  env: { BASE_PATH },

  // PGlite טוען WASM ומערכת קבצים משלו. כשה-bundler אורז אותו
  // הנתיבים הפנימיים נשברים. רלוונטי לפיתוח בלבד — בייצור Neon.
  serverExternalPackages: ['@electric-sql/pglite'],

  // מערכת פנימית — אין סיבה שמנוע חיפוש יגיע לכאן, בשום מסלול.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'same-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ]
  },
}
export default nextConfig
