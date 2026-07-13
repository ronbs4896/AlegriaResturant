import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Stars from '../ui/Stars.jsx'
import { testimonials } from '../../data/testimonials.js'

export default function TestimonialsSection({ limit }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials
  return (
    <section className="bg-cream-50 py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionTitle
          eyebrow="מה אומרים עלינו"
          title="לקוחות שחוזרים אלינו שוב ושוב"
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {list.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <figure className="flex h-full flex-col rounded-3xl bg-cream p-7 shadow-warm">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-charcoal">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-charcoal/10 pt-4">
                  <div className="font-black text-charcoal">{t.name}</div>
                  <div className="text-sm text-charcoal-soft">{t.role} · {t.city}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
