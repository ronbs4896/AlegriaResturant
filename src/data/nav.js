// ============================================================
//  ניווט — עליון + פוטר.
// ============================================================

export const mainNav = [
  { label: 'בית', to: '/' },
  {
    label: 'שירותים',
    to: '/services',
    // עמודי שירות מקובצים תחת dropdown
    children: [
      { label: 'הסעדה למפעלים', to: '/factories' },
      { label: 'מכירת שישי', to: '/friday' },
      { label: 'קייטרינג לאירועים', to: '/services/event-catering' },
      { label: 'ארוחות מסובסדות לעובדים', to: '/services/subsidized-meals' },
      { label: 'כל השירותים', to: '/services' },
    ],
  },
  { label: 'גלריה', to: '/gallery' },
  { label: 'בלוג', to: '/blog' },
  { label: 'אודות', to: '/about' },
  { label: 'צור קשר', to: '/contact' },
]

// נתיבים שמדליקים את מצב ה"פעיל" של פריט השירותים
export const servicesActivePaths = ['/services', '/factories', '/friday']

export const footerNav = {
  services: {
    title: 'שירותים',
    links: [
      { label: 'הסעדה למפעלים', to: '/factories' },
      { label: 'מכירת שישי', to: '/friday' },
      { label: 'קייטרינג לאירועים', to: '/services/event-catering' },
      { label: 'ארוחות מסובסדות', to: '/services/subsidized-meals' },
    ],
  },
  company: {
    title: 'המסעדה',
    links: [
      { label: 'אודות', to: '/about' },
      { label: 'גלריה', to: '/gallery' },
      { label: 'המלצות', to: '/testimonials' },
      { label: 'שאלות נפוצות', to: '/faq' },
    ],
  },
  legal: {
    title: 'מידע',
    links: [
      { label: 'צור קשר', to: '/contact' },
      { label: 'הצהרת נגישות', to: '/accessibility' },
      { label: 'מדיניות פרטיות', to: '/privacy' },
    ],
  },
}

export default mainNav
