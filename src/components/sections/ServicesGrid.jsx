import { Link } from 'react-router-dom'
import { Factory, CalendarHeart, PartyPopper, HandCoins, ArrowLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import { services } from '../../data/services.js'

const ICONS = { Factory, CalendarHeart, PartyPopper, HandCoins }

export default function ServicesGrid() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="מה אנחנו עושים"
          title="שירות אחד לכל צורך של הסעדה"
          subtitle="מהמטבח המרכזי שלנו — ליום עבודה במפעל, לשולחן השבת, או לאירוע הבא שלכם."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || Factory
            return (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-warm transition-all hover:-translate-y-1 hover:shadow-warm-lg"
                >
                  <div className="relative">
                    <Img
                      src={s.image}
                      fallback={s.imageFallback}
                      alt={s.title}
                      ratio="16/10"
                      rounded="rounded-none"
                    />
                    <span className="absolute top-4 font-black text-white/90 text-6xl leading-none num-outline inset-inline-start-5" style={{ insetInlineStart: '1.25rem' }}>
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                        <Icon size={22} />
                      </span>
                      <span className="rounded-full bg-honey/25 px-3 py-1 text-xs font-black text-orange-700">
                        {s.sellingPoint}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-charcoal">{s.title}</h3>
                    <p className="mt-2 flex-1 text-charcoal-soft">{s.description.slice(0, 110)}…</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-bold text-orange group-hover:gap-2 transition-all">
                      פרטים נוספים <ArrowLeft size={18} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
