import { useRef, useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Stars from '../ui/Stars.jsx'
import { testimonials } from '../../data/testimonials.js'

// המלצות כקרוסלת scroll-snap: חצים, נקודות, RTL-safe (ניווט לפי אינדקס).
export default function TestimonialsSection({ limit }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const [active, setActive] = useState(0)

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(i, list.length - 1))
    itemRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    setActive(clamped)
  }

  // עדכון הנקודה הפעילה בגלילה ידנית
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

  return (
    <section className="bg-cream-50 py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="מה אומרים עלינו" title="לקוחות שנשארים שנים" />
          <div className="flex gap-2">
            <button
              onClick={() => goTo(active + 1)}
              aria-label="ההמלצה הבאה"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-charcoal/15 text-charcoal transition-colors hover:border-charcoal/40 disabled:opacity-30"
              disabled={active >= list.length - 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goTo(active - 1)}
              aria-label="ההמלצה הקודמת"
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
          {list.map((t, i) => (
            <figure
              key={t.name}
              ref={(el) => { itemRefs.current[i] = el }}
              className="flex w-[85%] shrink-0 snap-center flex-col rounded-3xl bg-cream p-7 shadow-warm sm:w-[460px]"
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-charcoal">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-charcoal/10 pt-4">
                <div className="font-black text-charcoal">{t.name}</div>
                <div className="text-sm text-charcoal-soft">{t.role} · {t.city}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* נקודות */}
        <div className="mt-5 flex justify-center gap-2">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`המלצה ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-6 bg-orange' : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
