// ============================================================
//  מקור אמת יחיד — פרטי העסק, קשר, אנליטיקס
//  ⚠️ שדות מסומנים ב-TODO הם placeholder — החלף בפרטים אמיתיים.
//  החלפה כאן מתעדכנת בכל האתר (וואטסאפ, פוטר, SEO, סכמות).
// ============================================================

export const site = {
  name: 'קייטרינג אלגריה',
  legalName: 'קייטרינג אלגריה',
  tagline: 'אוכל ביתי טעים, טרי ואיכותי',
  region: 'הדרום',
  shortPitch:
    'המטבח בקרית גת שמבשל כל בוקר לעשרות מפעלים בדרום. הסעדה יומית לעובדים, קייטרינג לאירועים, וכל שישי: מכירת האוכל הביתי הגדולה באזור.',

  // --- דומיין (ל-SEO / canonical / sitemap) ---
  siteUrl: 'https://www.alegriacatering.co.il',

  // --- קשר ---
  phone: {
    display: '054-543-7526',
    dial: '+972545437526',
  },
  whatsapp: {
    number: '972545437526',
    defaultMessage: 'שלום, הגעתי דרך האתר ואשמח לקבל הצעת מחיר 🙂',
  },
  email: 'info@alegria.co.il', // TODO: מייל אמיתי

  // --- שעות פעילות ---
  hours: [
    { days: 'ראשון–חמישי', time: '08:00–16:00' },
    { days: 'שישי', time: '07:00–14:00' },
    { days: 'שבת', time: 'סגור' },
  ],

  // --- אזור שירות / כתובת ---
  serviceArea: 'קרית גת והסביבה',
  address: {
    street: '', // TODO
    city: 'קרית גת',
    full: 'קרית גת והסביבה',
  },

  // --- רשתות חברתיות ---
  social: {
    instagram: '', // TODO: קישור אינסטגרם
    facebook: '', // TODO: קישור פייסבוק
    waze: '', // TODO: קישור Waze
  },

  // --- מדדי מותג (למונים) ---
  stats: {
    years: 25,
    factories: 40,
    mealsPerDay: 3000,
  },

  // --- מדידה: Google tag (GA4 + Google Ads), GTM, ו-Meta Pixel ---
  // הכל env-driven וכבוי כברירת מחדל. הדלקה: Vercel → Settings →
  // Environment Variables → הגדירו את המזהים הרלוונטיים → Redeploy.
  // (לחלופין הדביקו מזהה כ-fallback במקום המחרוזת הריקה.)
  // פרטים מלאים — מאיפה כל מזהה ואילו אירועים נשלחים — ב-src/lib/analytics.js.
  analytics: {
    ga4Id: import.meta.env?.VITE_GA4_ID || '', //         G-XXXXXXXXXX  (Google Analytics 4)
    googleAdsId: import.meta.env?.VITE_GOOGLE_ADS_ID || '', // AW-XXXXXXXXX (Google tag / המרות Google Ads)
    gtmId: import.meta.env?.VITE_GTM_ID || '', //          GTM-XXXXXXX  (Google Tag Manager — קונטיינר, רשות)
    metaPixelId: import.meta.env?.VITE_META_PIXEL_ID || '1360351789609095', // מזהה Meta/Facebook Pixel (גלוי ממילא בצד-לקוח)
  },
}

export default site
