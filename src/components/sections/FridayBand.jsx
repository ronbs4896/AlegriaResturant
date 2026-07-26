import { ChevronLeft, MessageCircle } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import Steam from '../ui/Steam.jsx'
import Illustration from '../ui/Illustration.jsx'
import { getService } from '../../data/services.js'
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'

// רצועת מכירת שישי — קרם נקי, טרקוטה במבטאים, דדליין ברור.
export default function FridayBand() {
  const accent = getService('friday-meals').accent
  return (
    <section className="relative overflow-hidden border-y border-charcoal/10 bg-cream-50 py-14 sm:py-16 lg:py-24">
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal from="start">
          {/* קשת עליונה — הצורה אומרת שמישהו החליט, וזה מה שמבדיל
              תמונת מלאי מתמונה ממותגת. האדים הם סימן החיים היחיד
              באתר שאינו צילום. */}
          <div className="relative">
            <Img
              src="/images/dishes/friday.jpg"
              fallback="/images/dishes/alegria-spread.jpg"
              alt="ארוחת שישי ביתית של אלגריה"
              ratio="4/5"
              frame="arch"
              className="shadow-warm-lg"
            />
            {/* מרכוז דרך flex ולא דרך translate — inset-inline-start עם
                translateX פיזי לא מתנהג נכון תחת RTL (באג מוכר מהאמבלם) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-11 flex justify-center text-charcoal-muted"
            >
              <Steam size={60} />
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1} from="end">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-meta font-black"
            style={{ backgroundColor: `${accent}14`, color: accent }}
          >
            <Illustration name="pot" size={18} strokeWidth={2.2} /> כל יום שישי · קרית גת
          </div>
          <h2 className="mt-4 text-h2 font-black text-charcoal">
            מכירת השישי
            <br />
            הגדולה בדרום
          </h2>
          <p className="mt-5 max-w-lg text-lead leading-relaxed text-charcoal-soft">
            עוף בזיתים ולימון כבוש, חריימה, מטבוחה וחלות מהתנור. הכל מתבשל
            בשישי בבוקר לפי ההזמנות, ומאות משפחות מהאזור כבר יודעות: מזמינים
            עד רביעי, אוכלים כמו אצל סבתא.
          </p>
          <p className="mt-3 inline-block rounded-lg bg-charcoal-950 px-3 py-1.5 text-meta font-black text-honey">
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
