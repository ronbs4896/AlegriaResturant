import { CheckCircle2, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import { useLeadModal } from '../../context/LeadModalContext.jsx'

const points = [
  'ההובלה מקדימה את הפסקת הצהריים, כל יום',
  'מ-40 עובדים ועד 400 מאותו מטבח',
  'כשרות בתוקף ושרשרת חום מבוקרת עד המפעל',
  'צמחוני וטבעוני בתפריט כל יום, לא רק בשלישי',
]

// סקשן דגל B2B — הליבה העסקית.
export default function FactoriesSplit() {
  const { openLead } = useLeadModal()
  return (
    <section className="warm-grain relative overflow-hidden bg-charcoal-950 text-cream">
      <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:py-28 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow text-honey">הליבה שלנו</span>
          <h2 className="mt-3 text-2xl font-black text-cream sm:text-3xl lg:text-4xl">
            ספק ההסעדה
            <br />
            <span className="text-honey">מס' 1 בדרום</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/75">
            כשההפסקה של 200 עובדים תלויה במשאית אחת, אין מקום לספק שמאחר.
            כבר 25 שנה המשאיות שלנו יוצאות מקרית גת כל בוקר, ועשרות מפעלים
            בדרום יודעים בדיוק מתי הן מגיעות.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-honey" />
                <span className="text-cream/90">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={() => openLead('factory')}>
              הצעת מחיר למפעל <ChevronLeft size={20} />
            </Button>
            <Button variant="outline-light" size="lg" to="/factories">
              עוד על הסעדת מפעלים
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <Img
              src="/images/catering/factory-catering.jpg"
              fallback="/images/dishes/alegria-spread.jpg"
              alt="הסעדה יומית למפעלים — אלגריה"
              ratio="4/5"
              className="shadow-warm-lg"
            />
            <div className="absolute bottom-5 rounded-2xl bg-honey px-5 py-4 text-charcoal-900 shadow-ribbon inset-inline-start-[-1rem]" style={{ insetInlineStart: '-1rem' }}>
              <div className="text-3xl font-black">עשרות</div>
              <div className="text-sm font-bold">מפעלים קבועים</div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
