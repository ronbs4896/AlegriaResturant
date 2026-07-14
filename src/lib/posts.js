// ============================================================
//  טעינת פוסטים — קורא את כל קובצי ה-Markdown מ-src/content/blog
//  בזמן build (Vite glob), מפרסר frontmatter, וממיין לפי תאריך.
//  הוספת מאמר = הוספת קובץ .md אחד. אין צורך לגעת בקוד.
// ============================================================
import { parseFrontmatter } from './frontmatter.js'

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true })

const all = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    const slug = data.slug || path.split('/').pop().replace(/\.md$/, '')
    return { ...data, slug, body }
  })
  .filter((p) => !p.draft)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))

export const posts = all
export const getPost = (slug) => all.find((p) => p.slug === slug)
export default posts
