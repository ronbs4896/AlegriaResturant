// ============================================================
//  SPA-SEO — הזרקת head ייחודי לכל route + יצירת sitemap/robots.
//  רץ אחרי `vite build`. ללא תלויות חיצוניות.
// ============================================================
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { seoRoutes } from '../src/data/seoRoutes.js'
import { site } from '../src/data/site.js'
import { localBusinessSchema } from '../src/data/structuredData.js'
import { parseFrontmatter } from '../src/lib/frontmatter.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE_URL = site.siteUrl.replace(/\/$/, '')

// --- קריאת פוסטי הבלוג (fs) — כדי להזריק head ולהכניס ל-sitemap ---
// חוזה מערכת המאמרים: קבצי .md/.mdx ב-content/blog (שורש הריפו), commit ל-main.
// draft: true ⇒ לא ברשימות, לא ב-sitemap, ואין לו עמוד סטטי.
const BLOG_DIR = join(__dirname, '..', 'content', 'blog')
const blogPosts = existsSync(BLOG_DIR)
  ? readdirSync(BLOG_DIR)
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => {
        const { data } = parseFrontmatter(readFileSync(join(BLOG_DIR, f), 'utf8'))
        return { ...data, slug: data.slug || f.replace(/\.mdx?$/, '') }
      })
      .filter((p) => !p.draft)
  : []

const blogRoutes = blogPosts.map((p) => ({
  path: `/blog/${p.slug}`,
  title: p.seoTitle || p.title,
  description: p.description || p.seoDescription || p.excerpt || '',
  lastmod: p.date || '2026-07-14',
  // cover יכול להיות URL מלא (מהמערכת) או נתיב יחסי
  ogImage: p.cover ? (/^https?:\/\//.test(p.cover) ? p.cover : `${SITE_URL}${p.cover}`) : undefined,
  ogType: 'article',
  jsonLd: typeof p.jsonLd === 'string' && p.jsonLd.trim() ? p.jsonLd : undefined,
}))

const allRoutes = [...seoRoutes, ...blogRoutes]

const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const ogImage = `${SITE_URL}/images/logo/logo.jpg`
const businessLd = JSON.stringify(localBusinessSchema())

function buildHead(route) {
  const url = `${SITE_URL}${route.path === '/' ? '' : route.path}`
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.ogType || 'website'}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${route.ogImage || ogImage}" />`,
    `<meta property="og:locale" content="he_IL" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${businessLd}</script>`,
  ]
  // נתונים מובנים מה-frontmatter של המאמר (מחרוזת JSON מוכנה מהמערכת).
  // ב-JSON התו < מופיע רק בתוך מחרוזות, לכן escape גורף בטוח ומונע שבירת <script>
  if (route.jsonLd) tags.push(`<script type="application/ld+json">${route.jsonLd.replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n    ')
}

function renderPage(route) {
  let html = template
  // כותרת
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
  // description — התגית בקובץ המקור רב-שורתית, לכן [\s\S] ולא [^>]
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/?>/,
    `<meta name="description" content="${esc(route.description)}" />`
  )
  // הזרקה לפני </head>
  html = html.replace('</head>', `    ${buildHead(route)}\n  </head>`)
  return html
}

let count = 0
for (const route of allRoutes) {
  const html = renderPage(route)
  if (route.path === '/') {
    writeFileSync(join(DIST, 'index.html'), html)
  } else {
    const dir = join(DIST, route.path)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
  }
  count++
}

// sitemap.xml
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  allRoutes
    .map((r) => {
      const url = `${SITE_URL}${r.path === '/' ? '' : r.path}`
      return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`
    })
    .join('\n') +
  `\n</urlset>\n`
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

// robots.txt
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
writeFileSync(join(DIST, 'robots.txt'), robots)

console.log(`✓ postbuild-seo: הוזרק head ל-${count} עמודים + sitemap.xml + robots.txt`)
