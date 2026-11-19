// ============================================================
//  ניווט — כותרת עליונה (כולל תפריט השירותים), מגירת המובייל
//  והפוטר. מקור: RefHeader.dc.html ו-Ref-Home.dc.html בקנבס.
//
//  icon = path של אייקון קו, viewBox 48x48, stroke בלבד.
// ============================================================

export const servicesMenu = [
  {
    title: 'הסעדה יומית למפעלים',
    text: 'בתפזורת או בחמגשיות, הזמנה באפליקציה',
    to: '/factories',
    featured: true,
    icon: 'M6 30V14h22v16M28 20h8l6 6v4H28M13 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM35 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 34h14',
  },
  {
    title: 'ארוחות מסובסדות לעובדים',
    text: 'המעסיק משתתף, ודוח חודשי אחד למחלקת השכר',
    to: '/subsidized-meals',
    icon: 'M24 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM6 42v-6a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v6M18 30v12M30 30v12',
  },
  {
    title: 'אירועי חברה וימי גיבוש',
    text: 'מ-20 ועד 300 משתתפים, מבושל באותו בוקר',
    to: '/corporate-events',
    icon: 'M4 34h40M8 34a16 16 0 0 1 32 0M24 18v-4M20 14h8M8 40h32',
  },
  {
    title: 'אירועים פרטיים',
    text: 'בריתות, בר ובת מצווה, שבע ברכות ואזכרות',
    to: '/private-events',
    icon: 'M10 20h28v20H10zM6 14h36v6H6zM24 14v26M24 14c-4-8-12-6-8 0M24 14c4-8 12-6 8 0',
  },
  {
    title: 'מכירת שישי',
    text: 'לפי משקל, בלי מינימום, הזמנה בטלפון',
    to: '/friday',
    icon: 'M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8',
  },
  {
    title: 'המטבח שלנו',
    text: 'מטבח בשרי בקרית גת, 3,000 מנות ביום',
    to: '/kitchen',
    icon: 'M14 26a8 8 0 1 1 4-15 8 8 0 0 1 12 0 8 8 0 1 1 4 15v10H14zM14 42h20',
  },
  {
    title: 'כשרות ובטיחות מזון',
    text: 'רבנות קרית גת ושרשרת חום מבוקרת עד המפעל',
    to: '/kitchen#docs',
    icon: 'M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10',
  },
]

// הכרטיס הנטוי בסוף תפריט השירותים
export const servicesPromo = {
  lines: ['שבוע ניסיון לפני שמתחייבים,', 'והעובדים מחליטים.'],
  cta: 'הצעת מחיר למפעל',
  to: '/factories#contact',
}

export const mainNav = [
  { label: 'המטבח שלנו', to: '/kitchen' },
  { label: 'הסיפור שלנו', to: '/about' },
  { label: 'בלוג', to: '/blog' },
  { label: 'צור קשר', to: '/contact' },
]

// נתיבים שמדליקים את "השירותים שלנו" כפעיל
export const servicesActivePaths = [
  '/services',
  '/factories',
  '/subsidized-meals',
  '/corporate-events',
  '/private-events',
  '/friday',
]

export const footerNav = [
  {
    title: 'השירותים שלנו',
    links: [
      { label: 'הסעדה יומית למפעלים', to: '/factories' },
      { label: 'ארוחות מסובסדות לעובדים', to: '/subsidized-meals' },
      { label: 'אירועי חברה וימי גיבוש', to: '/corporate-events' },
      { label: 'אירועים פרטיים', to: '/private-events' },
      { label: 'מכירת שישי', to: '/friday' },
    ],
  },
  {
    title: 'קייטרינג אלגריה',
    links: [
      { label: 'דף הבית', to: '/' },
      { label: 'הסיפור שלנו', to: '/about' },
      { label: 'המטבח שלנו וכשרות', to: '/kitchen' },
      { label: 'בלוג', to: '/blog' },
      { label: 'צור קשר', to: '/contact' },
    ],
  },
]

export const legalNav = [
  { label: 'מדיניות פרטיות', to: '/privacy' },
  { label: 'הצהרת נגישות', to: '/accessibility' },
]

export default mainNav
