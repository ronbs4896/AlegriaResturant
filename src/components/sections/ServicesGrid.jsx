import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import { services } from '../../data/services.js'

export default function ServicesGrid() {
  return (
    <section className="bg-cream py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionTitle
          eyebrow="מה אנחנו עושים"
          title="ארבע דלתות לאותו מטבח"
          subtitle="מטבח אחד בקרית גת, ארבע דרכים לאכול ממנו: במפעל, בשולחן השבת או באירוע הבא שלכם."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-warm transition-all hover:-translate-y-1 hover:shadow-warm-lg"
              >
                <div className="relative overflow-hidden">
                  <Img
                    src={s.image}
                    fallback={s.imageFallback}
                    alt={s.title}
                    ratio="16/10"
                    rounded="rounded-none"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    className="absolute top-4 rounded-lg bg-charcoal-950/80 px-2.5 py-1 text-lg font-black text-honey backdrop-blur-sm"
                    style={{ insetInlineStart: '1rem' }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 self-start rounded-full bg-cream-200 px-3 py-1 text-xs font-black text-charcoal">
                    {s.sellingPoint}
                  </span>
                  <h3 className="text-2xl font-black text-charcoal">{s.title}</h3>
                  <p className="mt-2 flex-1 text-charcoal-soft">{s.short}</p>
                  <span className="link-underline mt-4 inline-flex items-center gap-1 self-start font-bold text-charcoal transition-colors group-hover:text-orange">
                    פרטים נוספים <ArrowLeft size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
