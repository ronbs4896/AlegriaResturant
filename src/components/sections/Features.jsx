import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import { features } from '../../data/features.js'

// "למה אנחנו" — רשימה עריכתית ממוספרת.
export default function Features() {
  return (
    <section className="bg-cream-50 py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionTitle eyebrow="למה אלגריה" title="הסיבות שבגללן נשארים איתנו" align="center" className="mx-auto" />
        <div className="mx-auto mt-12 max-w-4xl divide-y divide-charcoal/10">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="flex gap-5 py-6 sm:gap-8">
                <span className="text-4xl font-black text-charcoal/15 sm:text-5xl">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-black text-charcoal sm:text-2xl">{f.title}</h3>
                  <p className="mt-2 text-charcoal-soft">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
