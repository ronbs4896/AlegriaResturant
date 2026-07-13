import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ChevronLeft } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import CountUp from '../ui/CountUp.jsx'
import { site } from '../../data/site.js'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { buildWaLink } from '../../lib/whatsapp.js'

// הירו קולנועי — טיפוגרפיית display, כניסה מדורגת, ותג מורשת.
export default function Hero() {
  const { openLead } = useLeadModal()
  const reduce = useReducedMotion()

  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: 0.1 } },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal-950 text-cream">
      {/* רקע קולנועי */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero.jpg"
          onError={(e) => { e.currentTarget.src = '/images/dishes/alegria-spread.jpg' }}
          alt=""
          aria-hidden="true"
          className="h-full w-full animate-ken-burns object-cover"
        />
        {/* שכבות עומק */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/65 to-charcoal-950/25" />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal-950/85 via-charcoal-950/40 to-transparent" />
        <div className="warm-grain absolute inset-0" />
        {/* הילה כתומה עדינה מאחורי הטקסט */}
        <div
          className="absolute top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #F5871F 0%, transparent 65%)', insetInlineStart: '-6rem' }}
          aria-hidden="true"
        />
      </div>

      <Container className="relative py-28">
        <motion.div className="max-w-3xl" variants={parent} initial="hidden" animate="show">
          {/* תגי מורשת */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <span className="ribbon">מעל 25 שנות ניסיון</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-honey/50 px-4 py-1.5 text-sm font-bold text-honey">
              מתכונים של בית · מסורת של דורות
            </span>
          </motion.div>

          <motion.h1 variants={item} className="mt-7 text-display font-black">
            אוכל ביתי אמיתי,
          </motion.h1>
          <motion.div variants={item}>
            <span className="text-display font-black text-honey">בקנה מידה של מפעל</span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl"
          >
            הסעדה יומית למפעלים, מכירת שישי כל שבוע וקייטרינג לאירועים — טעים, טרי
            ואיכותי, בדיוק כמו בבית. עשרות מפעלים כבר סומכים עלינו.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={() => openLead()}>
              קבלו הצעת מחיר <ChevronLeft size={20} />
            </Button>
            <Button variant="whatsapp" size="lg" href={buildWaLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} /> וואטסאפ
            </Button>
          </motion.div>

          {/* רצועת סטטיסטיקות */}
          <motion.div
            variants={item}
            className="mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-honey/25 pt-8"
          >
            <Stat value={site.stats.years} suffix="+" label="שנות ניסיון" />
            <Stat value={site.stats.factories} suffix="+" label="מפעלים" />
            <Stat value={site.stats.mealsPerDay} suffix="+" label="מנות ביום" />
          </motion.div>
        </motion.div>
      </Container>

      {/* חץ גלילה עדין */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-cream/30 p-1.5">
          <motion.div
            className="h-2 w-1.5 rounded-full bg-honey"
            animate={reduce ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

function Stat({ value, suffix, label }) {
  return (
    <div>
      <div className="text-3xl font-black text-honey sm:text-5xl">
        <CountUp to={value} suffix={suffix} />
      </div>
      <div className="mt-1 text-sm text-cream/70">{label}</div>
    </div>
  )
}
