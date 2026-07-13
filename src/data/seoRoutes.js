// ============================================================
//  מניפסט SEO — מקור אמת יחיד לכל route.
//  נצרך גם ב-runtime (Seo.jsx) וגם ב-postbuild (הזרקה סטטית + sitemap).
// ============================================================
import { services } from './services.js'

const BRAND = 'קייטרינג אלגריה'

export const staticRoutes = [
  {
    path: '/',
    title: `${BRAND} · הסעדה למפעלים וקייטרינג בדרום`,
    description:
      'המטבח שמאכיל את הדרום: הסעדה יומית למפעלים, מכירת השישי הגדולה בדרום וקייטרינג לאירועים. 25+ שנות ניסיון מקרית גת. קבלו הצעת מחיר.',
    lastmod: '2026-07-13',
  },
  {
    path: '/factories',
    title: `הסעדה למפעלים בדרום · ${BRAND}`,
    description:
      'ספק ההסעדה המוביל למפעלים בדרום — ארוחות חמות לעובדים כל יום, בכשרות ובבטיחות מזון מלאה. עשרות מפעלים בקרית גת, אשקלון, באר שבע והסביבה כבר איתנו.',
    lastmod: '2026-07-13',
  },
  {
    path: '/friday',
    title: `מכירת שישי בדרום · ${BRAND}`,
    description:
      'מכירת השישי הגדולה בדרום — כל יום שישי בקרית גת. מנות מסורתיות, חמות וטריות. מזמינים עד רביעי ומגיעים לשבת רגועים.',
    lastmod: '2026-07-13',
  },
  {
    path: '/services',
    title: `השירותים שלנו · ${BRAND}`,
    description:
      'כל פתרונות ההסעדה של הדרום במקום אחד: מפעלים, מכירת שישי, קייטרינג לאירועים וארוחות מסובסדות — באיכות של אוכל בית.',
    lastmod: '2026-07-13',
  },
  {
    path: '/gallery',
    title: `גלריה · ${BRAND}`,
    description: 'הצצה למנות, לקייטרינג ולאווירה של קייטרינג אלגריה — אוכל ביתי טעים, טרי ואיכותי.',
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
    description: 'הסיפור של אלגריה — 25+ שנה שאנחנו מבשלים לדרום. מהמטבח של סבתא ועד המטבח שמאכיל עשרות מפעלים ביום.',
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
    description: 'הצהרת הנגישות של אתר קייטרינג אלגריה.',
    lastmod: '2026-07-13',
  },
  {
    path: '/privacy',
    title: `מדיניות פרטיות · ${BRAND}`,
    description: 'מדיניות הפרטיות של אתר קייטרינג אלגריה.',
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
