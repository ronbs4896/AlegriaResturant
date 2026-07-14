// ============================================================
//  כותבי הבלוג — שם, תמונת פרופיל ותפקיד.
//  להעלאת תמונה: public/images/authors/<file>.jpg
//  (אם התמונה חסרה — מוצג אייקון fallback אוטומטית).
// ============================================================

export const authors = {
  'עמית בן שושן': {
    name: 'עמית בן שושן',
    avatar: '/images/authors/amit-ben-shushan.jpg',
    role: 'קייטרינג אלגריה',
  },
}

const DEFAULT = { name: 'צוות אלגריה', avatar: '', role: 'קייטרינג אלגריה' }

export const getAuthor = (name) => authors[name] || { ...DEFAULT, name: name || DEFAULT.name }

export default authors
