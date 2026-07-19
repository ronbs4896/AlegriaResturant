import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { clientLogos } from '../../data/factories.js'

// רצועת לוגו לקוחות. אם אין לוגואים — מציג פס אמון טקסטואלי.
export default function ClientLogos() {
  if (!clientLogos.length) {
    return (
      <section className="border-y border-charcoal/10 bg-cream-50 py-10">
        <Container>
          <p className="text-center text-charcoal-soft">
            <span className="font-black text-charcoal">עשרות מפעלים</span> ברחבי הארץ בוחרים באלגריה
            להסעדת העובדים שלהם, יום אחרי יום, כבר מעל 25 שנה.
          </p>
        </Container>
      </section>
    )
  }
  return (
    <section className="border-y border-charcoal/10 bg-cream-50 py-12">
      <Container>
        <p className="mb-8 text-center text-sm font-black uppercase tracking-widest text-charcoal-soft">
          מפעלים שעובדים איתנו
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
          {clientLogos.map((c) => (
            <Reveal key={c.name}>
              <img src={c.logo} alt={c.name} className="h-10 w-auto object-contain grayscale" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
