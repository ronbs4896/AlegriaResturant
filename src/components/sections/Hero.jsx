import { motion } from 'framer-motion'
import { MessageCircle, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import CountUp from '../ui/CountUp.jsx'
import { site } from '../../data/site.js'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { buildWaLink } from '../../lib/whatsapp.js'

export default function Hero() {
  const { openLead } = useLeadModal()

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-charcoal-950 text-cream">
      {/* רקע קולנועי */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero.jpg"
          onError={(e) => { e.currentTarget.src = '/images/dishes/alegria-spread.jpg' }}
          alt=""
          aria-hidden="true"
          className="h-full w-full animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/40" />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal-950/80 to-transparent" />
      </div>

      <Container className="relative py-24">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ribbon mb-6">מעל 25 שנות ניסיון</span>
          <h1 className="text-hero font-black">
            אוכל ביתי אמיתי,
            <br />
            <span className="text-honey">בקנה מידה של מפעל</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            הסעדה יומית למפעלים, מכירת שישי כל שבוע וקייטרינג לאירועים — טעים, טרי ואיכותי,
            בדיוק כמו בבית. עשרות מפעלים כבר סומכים עלינו.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={() => openLead()}>
              קבלו הצעת מחיר <ChevronLeft size={20} />
            </Button>
            <Button variant="whatsapp" size="lg" href={buildWaLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} /> וואטסאפ
            </Button>
          </div>
        </motion.div>

        {/* רצועת סטטיסטיקות */}
        <motion.div
          className="mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/15 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Stat value={site.stats.years} suffix="+" label="שנות ניסיון" />
          <Stat value={site.stats.factories} suffix="+" label="מפעלים" />
          <Stat value={site.stats.mealsPerDay} suffix="+" label="מנות ביום" />
        </motion.div>
      </Container>
    </section>
  )
}

function Stat({ value, suffix, label }) {
  return (
    <div>
      <div className="text-3xl font-black text-honey sm:text-4xl">
        <CountUp to={value} suffix={suffix} />
      </div>
      <div className="mt-1 text-sm text-cream/70">{label}</div>
    </div>
  )
}
