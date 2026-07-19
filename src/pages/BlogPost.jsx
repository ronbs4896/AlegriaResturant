import { useParams, Navigate, Link } from 'react-router-dom'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CalendarDays, ArrowRight, User, Clock, MessageCircle, ChevronLeft } from 'lucide-react'
import { getAuthor } from '../data/authors.js'
import Seo from '../components/seo/Seo.jsx'
import Button from '../components/ui/Button.jsx'
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

// אווטאר כותב — תמונת פרופיל אם קיימת, אחרת אייקון fallback
function AuthorAvatar({ name }) {
  const author = getAuthor(name)
  const [failed, setFailed] = useState(false)
  if (author.avatar && !failed) {
    return (
      <img
        src={author.avatar}
        alt={name}
        onError={() => setFailed(true)}
        className="h-8 w-8 rounded-full object-cover"
      />
    )
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-200 text-charcoal">
      <User size={16} />
    </span>
  )
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

      {/* תמונת שער — hero רחב מלא ברוחב, מתחת להדר */}
      <section className="relative w-full bg-charcoal-950">
        <img
          src={post.cover}
          onError={(e) => { e.currentTarget.src = '/images/dishes/alegria-spread.jpg' }}
          alt={post.coverAlt || post.title}
          className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[460px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/25 to-transparent" />
      </section>

      {/* תוכן — רקע לבן, פריסה רחבה: מאמר + סיידבר */}
      <div className="bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            {/* מאמר */}
            <article>
              {/* breadcrumb */}
              <nav className="mb-4 flex items-center gap-2 text-sm text-charcoal-soft" aria-label="breadcrumb">
                <Link to="/blog" className="hover:text-orange">בלוג</Link>
                <ArrowRight size={14} />
                <span className="font-bold text-orange">{post.category}</span>
              </nav>

              {/* כותרת */}
              <h1 className="text-3xl font-black leading-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-lg leading-relaxed text-charcoal-soft">{post.excerpt}</p>
              )}

              {/* מטא — כותב, תאריך, זמן קריאה */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-charcoal/10 py-4 text-sm text-charcoal-soft">
                <span className="inline-flex items-center gap-2 font-bold text-charcoal">
                  <AuthorAvatar name={post.author} />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={15} className="text-orange" /> {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={15} className="text-orange" /> {post.readingMinutes} דק׳ קריאה
                </span>
              </div>

              {/* גוף המאמר */}
              <div
                className="prose prose-lg mt-8 max-w-none text-charcoal-soft
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
