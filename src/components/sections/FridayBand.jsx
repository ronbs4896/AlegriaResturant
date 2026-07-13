import { CalendarHeart, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'

// רצועת מכירת שישי — חמה, ביתית, בולטת.
export default function FridayBand() {
  return (
    <section className="bg-orange py-20 text-white sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
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
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-black">
            <CalendarHeart size={18} /> כל יום שישי
          </div>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            ארוחת שישי,
            <br />
            כמו של סבתא
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/90">
            מנות מסורתיות, חמות וטריות — עוף בזיתים, חריימה, מטבוחה, חלה טרייה ועוד.
            מזמינים מראש, ומגיעים לשבת רגועים. טעם של בית, בלי הבלגן.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="honey" size="lg" to="/friday">
              לתפריט השישי <ChevronLeft size={20} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
