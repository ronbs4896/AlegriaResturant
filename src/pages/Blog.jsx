import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Img from '../components/ui/Img.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { posts } from '../lib/posts.js'

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return d
  }
}

export default function Blog() {
  const seo = getSeo('/blog')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/blog" />
      <PageHeader
        eyebrow="הבלוג של אלגריה"
        title="טיפים, מדריכים והשראה"
        subtitle="כל מה שכדאי לדעת על קייטרינג, הסעדה ואירוח — מהניסיון שלנו בדרום."
      />

      <section className="bg-cream py-14 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="py-16 text-center text-charcoal-soft">בקרוב — מאמרים חדשים.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-warm transition-all hover:-translate-y-1 hover:shadow-warm-lg"
                  >
                    <Img src={p.cover} alt={p.coverAlt || p.title} ratio="16/10" rounded="rounded-none" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3 text-xs font-bold text-charcoal-soft">
                        {p.category && (
                          <span className="rounded-full bg-orange/10 px-3 py-1 text-orange-700">{p.category}</span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={14} /> {formatDate(p.date)}
                        </span>
                      </div>
                      <h2 className="text-xl font-black leading-snug text-charcoal">{p.title}</h2>
                      <p className="mt-2 flex-1 text-charcoal-soft">{p.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 font-bold text-orange transition-all group-hover:gap-2">
                        קראו עוד <ArrowLeft size={18} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  )
}
