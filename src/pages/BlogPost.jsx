import { useParams, Navigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CalendarDays, ArrowRight, User, MessageCircle, ChevronLeft } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import Img from '../components/ui/Img.jsx'
import { getPost, posts } from '../lib/posts.js'
import { articleSchema, breadcrumbSchema } from '../data/structuredData.js'
import { useLeadModal } from '../context/LeadModalContext.jsx'
import { buildWaLink } from '../lib/whatsapp.js'

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
  const { openLead } = useLeadModal()
  if (!post) return <Navigate to="/blog" replace />

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3)

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

      {/* כותרת — באנר כהה קצר */}
      <section className="relative overflow-hidden bg-charcoal-950 pb-12 pt-[calc(var(--header-h)+2.25rem)] text-cream">
        <div className="warm-grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-cream/60" aria-label="breadcrumb">
            <Link to="/blog" className="hover:text-honey">בלוג</Link>
            <ArrowRight size={14} />
            <span className="text-honey">{post.category}</span>
          </nav>
          <h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-cream/70">
            <span className="inline-flex items-center gap-1.5"><User size={15} /> {post.author}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} /> {formatDate(post.date)}</span>
          </div>
        </div>
      </section>

      {/* גוף — רקע לבן, פריסה רחבה: מאמר + סיידבר */}
      <div className="bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            {/* מאמר */}
            <article>
              <Img src={post.cover} alt={post.coverAlt || post.title} ratio="16/9" className="mb-10 shadow-warm-lg" priority />
              <div
                className="prose prose-lg max-w-none text-charcoal-soft
                  prose-headings:font-black prose-headings:text-charcoal prose-headings:mt-10
                  prose-h2:text-2xl prose-h2:sm:text-3xl prose-h3:text-xl
                  prose-p:leading-relaxed prose-strong:text-charcoal
                  prose-a:text-orange prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                  prose-li:marker:text-orange
                  prose-table:text-sm prose-th:bg-cream-200 prose-th:text-charcoal prose-td:border-charcoal/10
                  prose-img:rounded-2xl"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
              </div>

              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2 border-t border-charcoal/10 pt-6">
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-full bg-cream-100 px-3 py-1 text-sm font-bold text-charcoal-soft">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* סיידבר דביק */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              {/* כרטיס CTA */}
              <div className="rounded-3xl bg-charcoal-950 p-7 text-cream shadow-warm">
                <h2 className="text-xl font-black">מתכננים אירוע?</h2>
                <p className="mt-2 text-sm text-cream/75">
                  נבנה לכם תפריט וכמויות מדויקות לאירוע שלכם. קבלו הצעת מחיר מהירה ומותאמת.
                </p>
                <div className="mt-5 space-y-2.5">
                  <Button variant="primary" size="md" onClick={() => openLead('event')} className="w-full">
                    קבלו הצעת מחיר <ChevronLeft size={18} />
                  </Button>
                  <Button variant="whatsapp" size="md" href={buildWaLink()} target="_blank" rel="noopener noreferrer" className="w-full">
                    <MessageCircle size={18} /> וואטסאפ
                  </Button>
                </div>
              </div>

              {/* מאמרים נוספים */}
              {related.length > 0 && (
                <div className="mt-6 rounded-3xl border border-charcoal/10 bg-cream-50 p-6">
                  <h2 className="mb-4 text-lg font-black text-charcoal">מאמרים נוספים</h2>
                  <ul className="space-y-4">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/blog/${p.slug}`} className="group block">
                          <span className="text-xs font-bold text-orange-700">{p.category}</span>
                          <span className="mt-0.5 block font-bold leading-snug text-charcoal group-hover:text-orange">
                            {p.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
