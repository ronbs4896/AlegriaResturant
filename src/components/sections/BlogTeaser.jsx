import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import { posts } from '../../lib/posts.js'

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return d
  }
}

// מהבלוג — שלושת המאמרים האחרונים. מוצג בבית מתחת ל-CTA.
export default function BlogTeaser() {
  const latest = posts.slice(0, 3)
  if (latest.length === 0) return null

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="מהבלוג"
          title="טיפים ומדריכים מהמטבח"
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-warm transition-all hover:-translate-y-1 hover:shadow-warm-lg"
              >
                <Img src={p.cover} alt={p.coverAlt || p.title} ratio="16/10" rounded="rounded-none" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs font-bold text-charcoal-soft">
                    {p.category && (
                      <span className="rounded-full bg-cream-200 px-3 py-1 text-charcoal">{p.category}</span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={14} /> {formatDate(p.date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-black leading-snug text-charcoal">{p.title}</h3>
                  <p className="mt-2 flex-1 text-charcoal-soft line-clamp-3">{p.excerpt || p.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-orange transition-all group-hover:gap-2">
                    קראו עוד <ArrowLeft size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/blog" className="link-underline inline-flex items-center gap-1 font-bold text-charcoal">
            לכל המאמרים <ChevronLeft size={16} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
