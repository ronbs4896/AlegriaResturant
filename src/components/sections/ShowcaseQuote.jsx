import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Quote } from 'lucide-react'

// ציטוט full-bleed עם רקע כהה.
export default function ShowcaseQuote() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-24 text-cream sm:py-32">
      <div className="absolute inset-0 opacity-15">
        <img
          src="/images/dishes/alegria-spread.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>
      <Container className="relative text-center">
        <Reveal>
          <Quote size={48} className="mx-auto mb-6 text-orange" />
          <p className="mx-auto max-w-3xl text-xl font-black leading-snug text-cream sm:text-2xl lg:text-3xl">
            "אנחנו לא מבשלים אוכל מוסדי. אנחנו מבשלים אוכל של בית —
            רק בכמות שמספיקה למאות אנשים."
          </p>
          <p className="mt-6 font-bold text-honey">— מסעדת אלגריה</p>
        </Reveal>
      </Container>
    </section>
  )
}
