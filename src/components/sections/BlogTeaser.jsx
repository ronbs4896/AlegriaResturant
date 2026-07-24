import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ChevronRight, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Img from '../ui/Img.jsx'
import { posts } from '../../lib/posts.js'

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return d
  }
}

// מהבלוג — קרוסלת מאמרים (scroll-snap, חצים ונקודות, RTL-safe).
// כל כרטיס מקשר למאמר המלא. מוצג בבית מתחת ל-CTA.
export default function BlogTeaser() {
  const list = posts.slice(0, 9)
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const [active, setActive] = useState(0)

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(i, list.length - 1))
    itemRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    setActive(clamped)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      let best = 0
      let bestDist = Infinity
      const center = track.scrollLeft + track.clientWidth / 2
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const elCenter = el.offsetLeft + el.offsetWidth / 2
        const d = Math.abs(elCenter - center)
        if (d < bestDist) { bestDist = d; best = i }
      })
      setActive(best)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [list.length])

  if (list.length === 0) return null

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="מהבלוג" title="טיפים ומדריכים מהמטבח" />
          <div className="flex gap-2">
            <button
              onClick={() => goTo(active + 1)}
              aria-label="המאמר הבא"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-charcoal/15 text-charcoal transition-colors hover:border-charcoal/40 disabled:opacity-30"
              disabled={active >= list.length - 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goTo(active - 1)}
              aria-label="המאמר הקודם"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-charcoal/15 text-charcoal transition-colors hover:border-charcoal/40 disabled:opacity-30"
              disabled={active <= 0}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {list.map((p, i) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              ref={(el) => { itemRefs.current[i] = el }}
              className="group flex w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-warm transition-all hover:-translate-y-1 hover:shadow-warm-lg sm:w-[360px]"
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
          ))}
        </div>

        {/* נקודות */}
        <div className="mt-5 flex justify-center gap-2">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`מאמר ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-6 bg-orange' : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/blog" className="link-underline inline-flex items-center gap-1 font-bold text-charcoal">
            לכל המאמרים <ChevronLeft size={16} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
