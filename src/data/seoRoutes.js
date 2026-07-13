// ============================================================
//  מניפסט SEO — מקור אמת יחיד לכל route.
//  נצרך גם ב-runtime (Seo.jsx) וגם ב-postbuild (הזרקה סטטית + sitemap).
// ============================================================
import { services } from './services.js'

const BRAND = 'מסעדת אלגריה'

export const staticRoutes = [
  {
    path: '/',
    title: `${BRAND} · הסעדה למפעלים, מכירת שישי וקייטרינג`,
    description:
      'מעל 25 שנות ניסיון באוכל ביתי טעים, טרי ואיכותי. הסעדה יומית למפעלים, מכירת שישי כל שבוע וקייטרינג לאירועים. קבלו הצעת מחיר.',
    lastmod: '2026-07-13',
  },
  {
    path: '/factories',
    title: `הסעדה למפעלים · ${BRAND}`,
    description:
      'ספק הסעדה אמין למפעלים — ארוחות חמות לעובדים כל יום, בקנה מידה, עם בטיחות מזון וכשרות. עשרות מפעלים כבר סומכים עלינו.',
    lastmod: '2026-07-13',
  },
  {
    path: '/friday',
    title: `מכירת שישי · ${BRAND}`,
    description:
      'ארוחת שישי ביתית וחמה כל שבוע — מנות מסורתיות וטריות של אלגריה. מזמינים מראש ומגיעים לשבת רגועים.',
    lastmod: '2026-07-13',
  },
  {
    path: '/services',
    title: `השירותים שלנו · ${BRAND}`,
    description:
      'הסעדה למפעלים, מכירת שישי, קייטרינג לאירועים וארוחות מסובסדות לעובדים — הכל במקום אחד, באיכות של אוכל בית.',
    lastmod: '2026-07-13',
  },
  {
    path: '/gallery',
    title: `גלריה · ${BRAND}`,
    description: 'הצצה למנות, לקייטרינג ולאווירה של מסעדת אלגריה — אוכל ביתי טעים, טרי ואיכותי.',
    lastmod: '2026-07-13',
  },
  {
    path: '/testimonials',
    title: `המלצות · ${BRAND}`,
    description: 'מה מנהלי מפעלים ולקוחות מספרים על ההסעדה, הקייטרינג ומכירת השישי של אלגריה.',
    lastmod: '2026-07-13',
  },
  {
    path: '/about',
    title: `אודות · ${BRAND}`,
    description: 'הסיפור של אלגריה — 25+ שנות ניסיון באוכל ביתי אמיתי, מהמטבח שלנו לשולחן שלכם.',
    lastmod: '2026-07-13',
  },
  {
    path: '/faq',
    title: `שאלות נפוצות · ${BRAND}`,
    description: 'תשובות לשאלות נפוצות על הסעדת מפעלים, מכירת שישי, קייטרינג וכשרות.',
    lastmod: '2026-07-13',
  },
  {
    path: '/contact',
    title: `צור קשר · ${BRAND}`,
    description: 'דברו איתנו — וואטסאפ, טלפון ושעות פעילות. נשמח להכין לכם הצעת מחיר מותאמת.',
    lastmod: '2026-07-13',
  },
  {
    path: '/accessibility',
    title: `הצהרת נגישות · ${BRAND}`,
    description: 'הצהרת הנגישות של אתר מסעדת אלגריה.',
    lastmod: '2026-07-13',
  },
  {
    path: '/privacy',
    title: `מדיניות פרטיות · ${BRAND}`,
    description: 'מדיניות הפרטיות של אתר מסעדת אלגריה.',
    lastmod: '2026-07-13',
  },
]

// עמודי שירות דינמיים
export const serviceRoutes = services.map((s) => ({
  path: `/services/${s.slug}`,
  title: `${s.title} · ${BRAND}`,
  description: s.description.slice(0, 155),
  lastmod: '2026-07-13',
}))

export const seoRoutes = [...staticRoutes, ...serviceRoutes]

export const getSeo = (pathname) =>
  seoRoutes.find((r) => r.path === pathname) || staticRoutes[0]

export default seoRoutes
