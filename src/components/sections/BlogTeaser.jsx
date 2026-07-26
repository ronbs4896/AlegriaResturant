import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft } from 'lucide-react'
import Section from '../ui/Section.jsx'
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

// ============================================================
//  מהבלוג — גריד סטטי (היה קרוסלה זהה לקרוסלת ההמלצות, שני
//  סקשנים משם. עכשיו קרוסלה אחת בלבד בעמוד, וזו מקבלת צורה משלה).
// ============================================================
export default function BlogTeaser() {
  const list = posts.slice(0, 3)
  if (list.length === 0) return null

  return (
    <Section tone="raised">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <SectionTitle eyebrow="מהבלוג" title="טיפים ומדריכים מהמטבח" />
          <Link
            to="/blog"
            className="link-underline hidden items-center gap-1 font-bold text-charcoal sm:inline-flex"
          >
            לכל המאמרים <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <Link to={`/blog/${p.slug}`} className="group flex h-full flex-col">
                <Img
                  src={p.cover}
                  alt={p.coverAlt || p.title}
                  ratio="16/11"
                  rounded="rounded-2xl"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="mt-5 flex flex-1 flex-col">
                  <div className="flex items-center gap-2.5 text-micro font-bold text-charcoal-muted">
                    {p.category && <span>{p.category}</span>}
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(p.date)}</span>
                  </div>
                  <h3 className="mt-2.5 text-h3 font-black leading-snug text-charcoal transition-colors group-hover:text-orange">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-meta leading-relaxed text-charcoal-soft line-clamp-2">
                    {p.excerpt || p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-meta font-bold text-orange transition-all group-hover:gap-2">
                    קראו עוד <ArrowLeft size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link to="/blog" className="link-underline inline-flex items-center gap-1 font-bold text-charcoal">
            לכל המאמרים <ChevronLeft size={16} />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
