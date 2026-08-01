/** @type {import('next').NextConfig} */
const nextConfig = {
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
