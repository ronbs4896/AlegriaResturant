import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import CountUp from '../ui/CountUp.jsx'
import { site } from '../../data/site.js'

const stats = [
  { to: site.stats.years, suffix: '+', label: 'שנות ניסיון בדרום' },
  { to: site.stats.factories, suffix: '+', label: 'מפעלים קבועים' },
  { to: site.stats.mealsPerDay, suffix: '+', label: 'מנות ביום' },
  { to: 100, suffix: '%', label: 'אספקה בזמן' },
]

// פס מספרים — כהה ושקט, מספרי פליז (לא צהוב מלא).
export default function StatsBand() {
  return (
    <section className="warm-grain relative bg-charcoal-950 py-12 text-cream sm:py-14">
      <Container className="relative">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="text-center">
                <div className="text-3xl font-black text-honey sm:text-4xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-bold text-cream/70">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
