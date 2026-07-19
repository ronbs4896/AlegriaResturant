import { motion, useReducedMotion } from 'framer-motion'
import CountUp from '../ui/CountUp.jsx'
import { site } from '../../data/site.js'

// הירו עריכתי — נמוך, טקסט צמוד לימין, בלי כפתורים.
// ההמרה חיה בהדר (קבלו הצעת מחיר) ובוואטסאפ הצף.
export default function Hero() {
  const reduce = useReducedMotion()

  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: 0.1 } },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative flex min-h-[540px] items-center overflow-hidden bg-charcoal-950 text-cream sm:min-h-[600px]">
      {/* רקע קולנועי */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero.jpg"
          onError={(e) => { e.currentTarget.src = '/images/dishes/alegria-spread.jpg' }}
          alt=""
          aria-hidden="true"
          className="h-full w-full animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal-950/85 via-charcoal-950/35 to-transparent" />
        <div className="warm-grain absolute inset-0" />
      </div>

      {/* קונטיינר רחב — התוכן צמוד לימין המסך, לא מרחף באמצע */}
      <div className="relative mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-10 sm:py-20">
        <motion.div className="max-w-2xl" variants={parent} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="ribbon text-xs sm:text-sm">קרית גת והדרום · מעל 25 שנה</span>
          </motion.div>

          <motion.h1 variants={item} className="mt-5 text-hero font-black">
            <span className="block">המטבח שמאכיל</span>
            <span className="block text-honey">את הדרום</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
          >
            כל בוקר יוצאות מהמטבח שלנו בקרית גת אלפי מנות חמות: הסעדה יומית
            למפעלים, קייטרינג לאירועים, וכל שישי, מכירת האוכל הביתי הגדולה בדרום.
          </motion.p>

          {/* סטטיסטיקות — כרטיס זכוכית ממותג */}
          <motion.div variants={item} className="mt-9">
            <div className="inline-flex flex-wrap items-stretch overflow-hidden rounded-2xl border border-cream/15 bg-charcoal-950/50 shadow-warm-lg backdrop-blur-md">
              <Stat value={site.stats.years} suffix="+" label="שנות ניסיון" delay={0.2} />
              <Stat value={site.stats.factories} suffix="+" label="מפעלים בדרום" delay={0.35} />
              <Stat value={site.stats.mealsPerDay} suffix="+" label="מנות ביום" delay={0.5} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, suffix, label, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative flex flex-col items-center px-6 py-4 text-center sm:px-9 sm:py-5 [&:not(:first-child)]:border-e-0 [&:not(:first-child)]:border-s [&:not(:first-child)]:border-cream/10">
      <div className="text-3xl font-black leading-none text-honey sm:text-4xl">
        <CountUp to={value} suffix={suffix} duration={1800} />
      </div>
      {/* קו פליז שנמתח — חתימה מיתוגית */}
      <motion.div
        className="mt-2.5 h-0.5 w-8 rounded-full bg-orange"
        initial={reduce ? {} : { scaleX: 0 }}
        whileInView={reduce ? {} : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="mt-2 text-xs font-bold tracking-wide text-cream/70 sm:text-sm">{label}</div>
    </div>
  )
}
