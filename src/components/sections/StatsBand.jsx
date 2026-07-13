import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import CountUp from '../ui/CountUp.jsx'
import { site } from '../../data/site.js'

const stats = [
  { to: site.stats.years, suffix: '+', label: 'שנות ניסיון' },
  { to: site.stats.factories, suffix: '+', label: 'מפעלים קבועים' },
  { to: site.stats.mealsPerDay, suffix: '+', label: 'מנות ביום' },
  { to: 100, suffix: '%', label: 'אספקה בזמן' },
]

export default function StatsBand() {
  return (
    <section className="bg-honey py-14">
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="text-center">
                <div className="text-4xl font-black text-charcoal-900 sm:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-bold text-charcoal-soft">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
