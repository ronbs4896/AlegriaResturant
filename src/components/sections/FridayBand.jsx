import { CalendarHeart, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'

// רצועת מכירת שישי — רקע קרם-דבש חם ומעודן (לא כתום מלא).
export default function FridayBand() {
  return (
    <section className="relative overflow-hidden border-y-2 border-honey/40 py-14 sm:py-16 lg:py-24"
      style={{ background: 'linear-gradient(135deg, #F7F1E8 0%, #F2EADE 45%, #F5E7C8 100%)' }}
    >
      {/* הילת דבש עדינה */}
      <div
        className="absolute -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FCC50D 0%, transparent 70%)', insetInlineEnd: '-6rem' }}
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="relative">
            <Img
              src="/images/dishes/friday.jpg"
              fallback="/images/dishes/alegria-spread.jpg"
              alt="ארוחת שישי ביתית של אלגריה"
              ratio="4/3"
              className="shadow-warm-lg"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-1.5 text-sm font-black text-orange-700">
            <CalendarHeart size={18} /> כל יום שישי
          </div>
          <h2 className="mt-4 text-2xl font-black text-charcoal sm:text-3xl lg:text-4xl">
            ארוחת שישי,
            <br />
            כמו של סבתא
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal-soft">
            מנות מסורתיות, חמות וטריות — עוף בזיתים, חריימה, מטבוחה, חלה טרייה ועוד.
            מזמינים מראש, ומגיעים לשבת רגועים. טעם של בית, בלי הבלגן.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" to="/friday">
              לתפריט השישי <ChevronLeft size={20} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
