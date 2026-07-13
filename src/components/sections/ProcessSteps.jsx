import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import { process } from '../../data/process.js'

// ציר זמן ממוספר.
export default function ProcessSteps() {
  return (
    <section className="bg-cream py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionTitle eyebrow="איך זה עובד" title="מהשיחה הראשונה — ועד הצלחת" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border-2 border-charcoal/10 bg-cream-50 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-xl font-black text-white shadow-ribbon">
                  {step.n}
                </span>
                <h3 className="mt-4 text-lg font-black text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm text-charcoal-soft">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
