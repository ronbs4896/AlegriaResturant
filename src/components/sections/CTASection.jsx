import { MessageCircle, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { buildWaLink } from '../../lib/whatsapp.js'

export default function CTASection({
  title = 'מוכנים לאוכל טוב, אמין, בכל כמות?',
  subtitle = 'ספרו לנו מה אתם צריכים — ונחזור אליכם עם הצעת מחיר מותאמת, מהר.',
}) {
  const { openLead } = useLeadModal()
  return (
    <section className="warm-grain relative overflow-hidden bg-orange py-20 text-white sm:py-24">
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-black sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="honey" size="lg" onClick={() => openLead()}>
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
