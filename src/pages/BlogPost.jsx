import { useParams, Navigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CalendarDays, ArrowRight, User } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import Img from '../components/ui/Img.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getPost, posts } from '../lib/posts.js'
import { articleSchema, breadcrumbSchema } from '../data/structuredData.js'

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return d
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <Seo
        title={post.seoTitle || `${post.title} · קייטרינג אלגריה`}
        description={post.seoDescription || post.excerpt}
        path={`/blog/${slug}`}
        image={post.cover}
        jsonLd={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'בית', path: '/' },
            { name: 'בלוג', path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      {/* כותרת */}
      <section className="relative overflow-hidden bg-charcoal-950 pb-14 pt-[calc(var(--header-h)+2.5rem)] text-cream">
        <div className="warm-grain absolute inset-0" />
        <Container className="relative max-w-3xl">
          <nav className="mb-4 flex items-center gap-2 text-sm text-cream/60" aria-label="breadcrumb">
            <Link to="/blog" className="hover:text-honey">בלוג</Link>
            <ArrowRight size={14} />
            <span className="text-honey">{post.category}</span>
          </nav>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-cream/70">
            <span className="inline-flex items-center gap-1.5"><User size={15} /> {post.author}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} /> {formatDate(post.date)}</span>
          </div>
        </Container>
      </section>

      {/* תמונת שער */}
      <section className="bg-cream pt-10">
        <Container className="max-w-3xl">
          <Img src={post.cover} alt={post.coverAlt || post.title} ratio="16/9" className="shadow-warm-lg" priority />
        </Container>
      </section>

      {/* גוף המאמר */}
      <article className="bg-cream py-10 sm:py-14">
        <Container className="max-w-3xl">
          <div
            className="prose prose-lg max-w-none text-charcoal-soft
              prose-headings:font-black prose-headings:text-charcoal prose-headings:mt-10
              prose-h2:text-2xl prose-h3:text-xl
              prose-p:leading-relaxed prose-strong:text-charcoal
              prose-a:text-orange prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-li:marker:text-orange
              prose-table:text-sm prose-th:bg-cream-200 prose-th:text-charcoal prose-td:border-charcoal/10"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          {/* תגיות */}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-charcoal/10 pt-6">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-cream-200 px-3 py-1 text-sm font-bold text-charcoal-soft">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </Container>
      </article>

      {/* מאמרים נוספים */}
      {related.length > 0 && (
        <section className="bg-cream-50 py-14">
          <Container className="max-w-3xl">
            <h2 className="mb-6 text-2xl font-black text-charcoal">מאמרים נוספים</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group block rounded-2xl border-2 border-charcoal/10 bg-cream p-5 transition-all hover:-translate-y-1 hover:border-orange">
                    <div className="text-xs font-bold text-orange-700">{p.category}</div>
                    <div className="mt-1 font-black text-charcoal">{p.title}</div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  )
}
