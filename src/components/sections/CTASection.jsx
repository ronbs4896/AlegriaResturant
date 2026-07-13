import { MessageCircle, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { buildWaLink } from '../../lib/whatsapp.js'

// רצועת סיום — כהה וחמה עם הילת כתום עדינה (לא כתום מלא).
export default function CTASection({
  title = 'מוכנים לאוכל טוב, אמין, בכל כמות?',
  subtitle = 'ספרו לנו מה אתם צריכים — ונחזור אליכם עם הצעת מחיר מותאמת, מהר.',
}) {
  const { openLead } = useLeadModal()
  return (
    <section className="warm-grain relative overflow-hidden bg-charcoal-950 py-14 text-cream sm:py-20 lg:py-24">
      <Container className="relative text-center">
        <Reveal>
          <span className="eyebrow justify-center text-honey">בואו נדבר</span>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-black sm:text-3xl lg:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/70">{subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" onClick={() => openLead()}>
              קבלו הצעת מחיר <ChevronLeft size={20} />
            </Button>
            <Button variant="outline-light" size="lg" href={buildWaLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} /> וואטסאפ
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
