import { CalendarHeart, ChevronLeft, MessageCircle } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'

// רצועת מכירת שישי — קרם נקי, טרקוטה במבטאים, דדליין ברור.
export default function FridayBand() {
  return (
    <section className="relative overflow-hidden border-y border-charcoal/10 bg-cream-50 py-14 sm:py-16 lg:py-24">
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <Img
            src="/images/dishes/friday.jpg"
            fallback="/images/dishes/alegria-spread.jpg"
            alt="ארוחת שישי ביתית של אלגריה"
            ratio="4/3"
            className="shadow-warm-lg"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full bg-cream-200 px-4 py-1.5 text-sm font-black text-charcoal">
            <CalendarHeart size={18} /> כל יום שישי · קרית גת
          </div>
          <h2 className="mt-4 text-2xl font-black text-charcoal sm:text-3xl lg:text-4xl">
            מכירת השישי
            <br />
            הגדולה בדרום
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal-soft">
            עוף בזיתים ולימון כבוש, חריימה, מטבוחה וחלות מהתנור. הכל מתבשל
            בשישי בבוקר לפי ההזמנות, ומאות משפחות מהאזור כבר יודעות: מזמינים
            עד רביעי, אוכלים כמו אצל סבתא.
          </p>
          <p className="mt-3 inline-block rounded-lg bg-charcoal-950 px-3 py-1.5 text-sm font-black text-honey">
            מזמינים עד יום רביעי בערב ⏰
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" to="/friday">
              לתפריט השישי <ChevronLeft size={18} />
            </Button>
            <Button variant="whatsapp" size="lg" href={buildWaLink('שלום, אשמח להזמין ארוחת שישי 🍲')} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', { source: 'friday_band' })}>
              <MessageCircle size={18} /> הזמנה מהירה
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
