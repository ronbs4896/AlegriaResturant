// ============================================================
//  גלריה — מנות, קייטרינג, אווירה.
//  הוסף תמונות ל-public/images/{dishes,catering,ambience} ורשום כאן.
//  cat: 'dishes' | 'catering' | 'ambience'
// ============================================================

export const galleryCategories = [
  { key: 'all', label: 'הכל' },
  { key: 'dishes', label: 'מנות' },
  { key: 'catering', label: 'קייטרינג' },
  { key: 'ambience', label: 'אווירה' },
]

export const gallery = [
  {
    src: '/images/dishes/alegria-spread.jpg',
    cat: 'dishes',
    alt: 'מגש מנות אלגריה: עוף בזיתים, מטבוחה, סלט חצילים וחלה',
    w: 1200,
    h: 1500,
  },
  // ⬇️ הוסף כאן תמונות נוספות ככל שמעלים אותן (מנות, קייטרינג, אווירה)
]

export default gallery
