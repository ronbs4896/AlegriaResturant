import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { heritage } from '../../data/heritage.js'
import { site } from '../../data/site.js'

// סקשן מורשת — האמבלם (דיוקן הסבתא) במרכז הבמה.
// הלוגו מוצג כפי-שהוא, על רקע בהיר, לפי הנחיות המותג.
export default function HeritageSection() {
  const reduce = useReducedMotion()
  return (
    <section className="warm-grain relative overflow-hidden bg-cream py-14 sm:py-20 lg:py-28">
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
        {/* האמבלם */}
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <motion.div
              initial={reduce ? {} : { rotate: -2 }}
              whileInView={reduce ? {} : { rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-warm-lg sm:p-10"
            >
              <img
                src="/images/logo/logo.jpg"
                alt={`הלוגו של ${site.name} — דיוקן המייסדת`}
                className="w-full"
              />
            </motion.div>
            {/* חותמת שנים */}
            <div className="absolute -bottom-4 rounded-full bg-charcoal-950 px-5 py-3 text-center shadow-warm-lg inset-inline-end-2" style={{ insetInlineEnd: '0.5rem' }}>
              <span className="block text-h3 font-black leading-none text-honey">25+</span>
              <span className="text-micro font-bold text-cream/80">שנות מסורת</span>
            </div>
          </div>
        </Reveal>

        {/* הסיפור */}
        <Reveal delay={0.12}>
          <span className="eyebrow">{heritage.eyebrow}</span>
          <h2 className="mt-3 text-h2 font-black text-charcoal">
            {heritage.title}
          </h2>
          <div className="mt-6 space-y-4 text-lead leading-relaxed text-charcoal-soft">
            {heritage.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-7 border-charcoal/25 border-s-4 ps-5 text-h3 font-black leading-snug text-charcoal">
            "{heritage.quote}"
          </blockquote>

          <ul className="mt-7 space-y-3">
            {heritage.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-charcoal/45" />
                <span className="font-bold text-charcoal">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
