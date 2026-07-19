// ============================================================
//  טעינת פוסטים — קורא את כל קובצי ה-Markdown/MDX מ-content/blog
//  (בשורש הריפו) בזמן build (Vite glob), מפרסר frontmatter וממיין לפי תאריך.
//  הוספת מאמר = הוספת קובץ .md/.mdx אחד. אין צורך לגעת בקוד.
//
//  חוזה frontmatter (מערכת המאמרים החיצונית כותבת לכאן ב-commit ל-main):
//  title, description, date (YYYY-MM-DD), slug, tags[], category, author,
//  cover (URL מלא), coverAlt, jsonLd (מחרוזת JSON), draft (בוליאני).
//  שדות legacy נתמכים כ-fallback: excerpt, seoTitle, seoDescription.
// ============================================================
import { parseFrontmatter } from './frontmatter.js'

const files = import.meta.glob('/content/blog/*.{md,mdx}', { query: '?raw', import: 'default', eager: true })

const WORDS_PER_MIN = 200 // קצב קריאה ממוצע בעברית
const DEFAULT_AUTHOR = 'עמית בן שושן'

const all = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    const slug = data.slug || path.split('/').pop().replace(/\.mdx?$/, '')
    const words = String(body || '').trim().split(/\s+/).filter(Boolean).length
    const readingMinutes = Math.max(1, Math.round(words / WORDS_PER_MIN))
    return {
      ...data,
      slug,
      body,
      author: data.author || DEFAULT_AUTHOR,
      readingMinutes,
      // description ← meta; excerpt ← טקסט תקציר ברשימה/בראש המאמר
      description: data.description || data.seoDescription || data.excerpt || '',
      excerpt: data.excerpt || data.description || '',
    }
  })
  .filter((p) => !p.draft)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))

export const posts = all
export const getPost = (slug) => all.find((p) => p.slug === slug)
export default posts
