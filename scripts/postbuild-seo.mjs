// ============================================================
//  SEO סטטי — הזרקת head ייחודי לכל route + פרה-רינדור גוף המאמרים
//  ל-HTML + יצירת sitemap/robots. רץ אחרי `vite build`.
//
//  פרה-רינדור (SSG): גוף המאמר וה-/blog index מרונדרים ב-Node עם
//  react-dom/server + react-markdown (בלי דפדפן, בלי תלויות חדשות),
//  ומוזרקים לתוך #root. כך התוכן + meta + JSON-LD קיימים כבר בתגובת
//  ה-HTML הראשונית (גוגל + קוראי שיתוף), לא רק אחרי הרצת JS.
//  React (createRoot) מחליף את #root בטעינה — אין hydration mismatch.
//
//  אבטחה: react-markdown מטפל בתוכן כ-DATA (בורח מ-HTML/JSX גולמי),
//  לכן מאמרים שהמערכת דוחפת ישירות ל-main אינם יכולים להריץ קוד
//  בזמן ה-build — בשונה מקומפילציית MDX ל-JSX.
// ============================================================
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
const blogPosts = (existsSync(BLOG_DIR)
  ? readdirSync(BLOG_DIR)
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => {
        const { data, body } = parseFrontmatter(readFileSync(join(BLOG_DIR, f), 'utf8'))
        return { ...data, body, slug: data.slug || f.replace(/\.mdx?$/, '') }
      })
      .filter((p) => !p.draft)
  : []
).sort((a, b) => String(b.date).localeCompare(String(a.date))) // חדש → ישן

const absUrl = (u) => (u ? (/^https?:\/\//.test(u) ? u : `${SITE_URL}${u}`) : undefined)

const blogRoutes = blogPosts.map((p) => ({
  path: `/blog/${p.slug}`,
  title: p.seoTitle || p.title,
  description: p.description || p.seoDescription || p.excerpt || '',
  lastmod: p.date || '2026-07-14',
  // cover יכול להיות URL מלא (מהמערכת) או נתיב יחסי
  ogImage: absUrl(p.cover),
  ogType: 'article',
  jsonLd: typeof p.jsonLd === 'string' && p.jsonLd.trim() ? p.jsonLd : undefined,
  post: p, // לפרה-רינדור הגוף
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

// --- פרה-רינדור גוף המאמר (מרונדר בדיוק כמו בצד-לקוח: react-markdown+gfm) ---
function markdownToHtml(md) {
  return renderToStaticMarkup(
    React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, String(md || ''))
  )
}

function articleSnapshot(p) {
  const cover = absUrl(p.cover) || ogImage
  const words = String(p.body || '').trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  const tags =
    Array.isArray(p.tags) && p.tags.length
      ? `<ul class="post-tags">${p.tags.map((t) => `<li>#${esc(t)}</li>`).join('')}</ul>`
      : ''
  return (
    `<main><article dir="rtl" lang="he">` +
    `<img src="${esc(cover)}" alt="${esc(p.coverAlt || p.title)}" width="1600" height="900" />` +
    `<nav aria-label="breadcrumb"><a href="${SITE_URL}/blog">בלוג</a>${p.category ? ` &#8250; <span>${esc(p.category)}</span>` : ''}</nav>` +
    `<h1>${esc(p.title)}</h1>` +
    (p.description ? `<p>${esc(p.description)}</p>` : '') +
    `<p><span>${esc(p.author || 'עמית בן שושן')}</span> &#183; <time datetime="${esc(p.date || '')}">${esc(p.date || '')}</time> &#183; ${minutes} דק׳ קריאה</p>` +
    `<div class="prose">${markdownToHtml(p.body)}</div>` +
    tags +
    `</article></main>`
  )
}

function blogIndexSnapshot() {
  const cards = blogPosts
    .map((p) => {
      const cover = absUrl(p.cover) || ogImage
      return (
        `<li><a href="${SITE_URL}/blog/${esc(p.slug)}">` +
        `<img src="${esc(cover)}" alt="${esc(p.coverAlt || p.title)}" width="1200" height="750" loading="lazy" />` +
        (p.category ? `<span>${esc(p.category)}</span>` : '') +
        `<h2>${esc(p.title)}</h2>` +
        (p.description ? `<p>${esc(p.description)}</p>` : '') +
        `<time datetime="${esc(p.date || '')}">${esc(p.date || '')}</time>` +
        `</a></li>`
      )
    })
    .join('')
  return `<main><h1>הבלוג של אלגריה</h1><ul class="blog-index">${cards}</ul></main>`
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

  // פרה-רינדור הגוף לתוך #root (SEO snapshot — React מחליף בטעינה)
  let snapshot = ''
  if (route.post) snapshot = articleSnapshot(route.post)
  else if (route.path === '/blog') snapshot = blogIndexSnapshot()
  if (snapshot) html = html.replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`)

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
