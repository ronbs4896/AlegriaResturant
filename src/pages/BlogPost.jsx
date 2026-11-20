// ============================================================
// ds-normalized
//  עמוד מאמר, לפי העיצוב המאושר (Ref-Article): כותרת ופרטי כותב,
//  תמונת שער, תוכן עניינים דביק שנבנה מכותרות המאמר, גוף המאמר
//  וכרטיסים של מאמרים נוספים. התוכן מגיע מ-content/blog.
// ============================================================
import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Seo from '../components/seo/Seo.jsx'
import PostCard, { coverOf, formatDate, chip } from '../components/brand/PostCard.jsx'
import { getPost, posts } from '../lib/posts.js'
import { articleSchema, breadcrumbSchema } from '../data/structuredData.js'
import { trackViewContent } from '../lib/analytics.js'
import { usePageMotion } from '../lib/motion.js'
import WaButton from '../components/brand/WaButton.jsx'

const INK = '#2E2A27'
const GRAD = 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)'

const slugify = (t) => String(t).trim().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-').slice(0, 80)
const textOf = (children) => (Array.isArray(children) ? children.map(textOf).join('') : typeof children === 'string' ? children : children?.props ? textOf(children.props.children) : '')

const md = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))} style={{ margin: '48px 0 14px', fontSize: "var(--fs-h2)", lineHeight: '1.12', fontWeight: 700, color: '#2E2A27', scrollMarginTop: 110 }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ margin: '32px 0 10px', fontSize: "var(--fs-h4)", lineHeight: '1.3', fontWeight: 700, color: INK }}>{children}</h3>,
  p: ({ children }) => <p style={{ margin: '0 0 18px', fontSize: "var(--fs-lead)", lineHeight: 1.9, color: INK }}>{children}</p>,
  ul: ({ children }) => <ul style={{ margin: '0 0 22px', paddingInlineStart: 22, fontSize: 18, lineHeight: 1.85, color: INK, listStyle: 'disc' }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ margin: '0 0 22px', paddingInlineStart: 22, fontSize: 18, lineHeight: 1.85, color: INK, listStyle: 'decimal' }}>{children}</ol>,
  li: ({ children }) => <li style={{ marginBottom: 6 }}>{children}</li>,
  a: ({ href, children }) => (href && href.startsWith('/')
    ? <Link to={href} style={{ color: INK, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: INK, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>{children}</a>),
  strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
  blockquote: ({ children }) => <blockquote style={{ margin: '24px 0', padding: '18px 22px', background: '#FFF5E8', borderRadius: 18, borderInlineStart: '6px solid #F5871F' }}>{children}</blockquote>,
  table: ({ children }) => <div style={{ overflowX: 'auto', margin: '0 0 24px', border: '1px solid #FDEBD3', borderRadius: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, background: '#FFFFFF' }}>{children}</table></div>,
  th: ({ children }) => <th style={{ padding: '12px 14px', background: '#FFF5E8', textAlign: 'start', fontWeight: 700, borderBottom: '1px solid #FDEBD3' }}>{children}</th>,
  td: ({ children }) => <td style={{ padding: '12px 14px', borderBottom: '1px solid #FDEBD3' }}>{children}</td>,
  img: ({ src, alt }) => <img src={src} alt={alt || ''} loading="lazy" style={{ display: 'block', width: '100%', borderRadius: 20, margin: '12px 0 24px' }} />,
  hr: () => <hr style={{ border: 0, height: 1, background: '#FDEBD3', margin: '32px 0' }} />,
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  const root = usePageMotion()

  useEffect(() => {
    if (post) trackViewContent({ content_type: 'article', content_name: post.title, content_category: post.category })
  }, [post])

  const toc = useMemo(() => (post ? [...String(post.body).matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].replace(/[*_`]/g, '').trim()) : []), [post])

  if (!post) return <Navigate to="/blog" replace />
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3)
  const isEvent = /אירוע/.test(post.category || '') || /אירוע/.test(post.title)
  const cta = isEvent
    ? { title: 'מתכננים אירוע?', text: 'נבנה לכם תפריט וכמויות לפי מספר האורחים, עם הצעה כתובה.', to: '/services/event-catering#contact', label: 'אני רוצה הצעה לאירוע' }
    : { title: 'מחפשים ספק הסעדה?', text: 'מחיר למנה ומינימום יומי בכתב, לרוב עוד באותו יום.', to: '/factories#contact', label: 'אני רוצה הצעת מחיר' }

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        description={post.description}
        path={`/blog/${slug}`}
        image={post.cover}
        jsonLd={[
          post.jsonLd || articleSchema(post),
          breadcrumbSchema([{ name: 'בית', path: '/' }, { name: 'בלוג', path: '/blog' }, { name: post.title, path: `/blog/${slug}` }]),
        ]}
      />
      <div ref={root} dir="rtl" data-page="BlogPost" style={{ background: '#FFFFFF', color: INK }}>
        <section aria-labelledby="h1" style={{ padding: '40px clamp(20px, 5vw, 80px) 0' }}>
          <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: 14 }}>
              <Link to="/">בית</Link> / <Link to="/blog">בלוג</Link>{post.category ? ` / ${post.category}` : ''}
            </nav>
            {post.category && <span data-a="hero-fade" style={chip}>{post.category}</span>}
            <h1 id="h1" style={{ margin: 0, fontSize: "var(--fs-h1)", lineHeight: '1.08', fontWeight: 700, maxWidth: 900, color: '#2E2A27' }}>
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}><span data-a="hero-line" style={{ display: 'block' }}>{post.title}</span></span>
            </h1>
            <div data-a="hero-fade" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
              <img src="/images/site/mark.jpg" alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '1px solid #FDEBD3' }} />
              <span><b>{post.author}</b> · קייטרינג אלגריה · <span dir="ltr">{formatDate(post.date)}</span> · {post.readingMinutes} דק׳ קריאה</span>
            </div>
            <img src={coverOf(post)} alt={post.coverAlt || post.title} data-a="reveal" fetchpriority="high" onError={(e) => { e.currentTarget.src = '/images/site/spread.jpg' }}
              style={{ marginTop: 12, display: 'block', width: '100%', aspectRatio: '21 / 9', objectFit: 'cover', borderRadius: 26 }} />
          </div>
        </section>

        <section aria-label="תוכן המאמר" style={{ padding: '48px clamp(20px, 5vw, 80px) 80px' }}>
          <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 56 }}>
            <aside aria-label="תוכן העניינים" style={{ flex: '0 1 280px', position: 'sticky', top: 110, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {toc.length > 0 && (
                <div style={{ background: '#FFF5E8', borderRadius: 20, padding: '22px 22px 14px', boxSizing: 'border-box' }}>
                  <span style={{ display: 'block', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>בעמוד הזה</span>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {toc.map((t) => (
                      <li key={t}><a href={`#${slugify(t)}`} style={{ display: 'block', padding: '8px 0', color: INK, textDecoration: 'none', fontSize: 16, lineHeight: 1.5, borderBottom: '1px solid #FDEBD3' }}>{t}</a></li>
                    ))}
                  </ul>
                </div>
              )}
              <div style={{ background: '#FFF5E8', color: INK, borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <b style={{ fontSize: 20, fontWeight: 700, color: INK }}>{cta.title}</b>
                <span style={{ fontSize: 16, lineHeight: 1.6 }}>{cta.text}</span>
                <Link className="ds-btn" to={cta.to} style={{ minHeight: 52, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 22px', borderRadius: 999, background: GRAD, color: INK, fontSize: 16, fontWeight: 700, textDecoration: 'none', marginTop: 4 }}>{cta.label}</Link>
                <a href="tel:+972545437526" style={{ color: INK, fontSize: 16, fontWeight: 700, textAlign: 'center' }}><span dir="ltr">054-543-7526</span></a>
                <WaButton source="blog_post" style={{ width: '100%' }} />
              </div>
            </aside>
            <article style={{ flex: '1 1 560px', minWidth: 0, maxWidth: 760 }}>
              {post.excerpt && <p style={{ margin: '0 0 28px', fontSize: "var(--fs-lead)", lineHeight: 1.75, fontWeight: 700 }}>{post.excerpt}</p>}
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>{post.body}</ReactMarkdown>
            </article>
          </div>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="rel-h" style={{ padding: '80px clamp(20px, 5vw, 80px) 96px', background: '#FFF5E8' }}>
            <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <h2 id="rel-h" style={{ margin: 0, fontSize: "var(--fs-h2)", fontWeight: 700, color: '#2E2A27', lineHeight: '1.12' }}>עוד מהבלוג</h2>
                <Link to="/blog" style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 4 }}>לכל המאמרים</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                {related.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
