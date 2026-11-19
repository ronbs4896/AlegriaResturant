import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button.jsx'
import { hero } from '../../data/home.js'

// ============================================================
//  הירו — צלחת על כל הרוחב, כותרת בשלוש שורות, קצה תחתון
//  אלכסוני, וטור חצים בצד. החצים מחליפים בין שלוש תמונות;
//  כפתור שנראה פעיל ולא עושה דבר הוא באג, לא קישוט.
// ============================================================
const ease = [0.22, 1, 0.36, 1]
const fade = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

function Arrow({ dir }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === 'prev' ? 'M4 12h16M14 6l6 6-6 6' : 'M20 12H4M10 6l-6 6 6 6'} />
    </svg>
  )
}

export default function HomeHero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const count = hero.slides.length
  const go = (step) => setIndex((i) => (i + step + count) % count)
  const slide = hero.slides[index]

  // פרלקסה: התמונה יורדת לאט מהכותרת בזמן גלילה. הפער שנפתח
  // למעלה תמיד מחוץ למסך, כי הוא קטן מהחלק שכבר נגלל.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title">
      <div
        className="relative flex min-h-[540px] items-center overflow-hidden lg:min-h-[600px]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 92%)' }}
      >
        <motion.div className="absolute inset-0" style={{ y }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fetchpriority={index === 0 ? 'high' : 'auto'}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: slide.position }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(270deg,rgba(20,17,15,0.8)_0%,rgba(20,17,15,0.58)_45%,rgba(20,17,15,0.25)_100%)]"
        />

        <div className="shell relative flex items-center justify-between gap-8 pb-[110px] pt-14 lg:pt-16">
          <div className="flex max-w-[560px] flex-col gap-5 text-white">
            <h1
              id="hero-title"
              className="m-0 text-[clamp(2.4rem,4.4vw,3.6rem)] font-black leading-[1.12] tracking-[-0.01em]"
            >
              {hero.lines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              {...fade}
              transition={{ duration: 0.7, ease, delay: 0.7 }}
              className="m-0 text-[17px] leading-[1.7] text-white/90"
            >
              {hero.text}
            </motion.p>
            <motion.div {...fade} transition={{ duration: 0.7, ease, delay: 0.82 }}>
              <Button variant="brand" shape="pill" size="brand" href="#contact">
                {hero.cta}
              </Button>
            </motion.div>
          </div>

          <motion.div
            {...fade}
            transition={{ duration: 0.7, ease, delay: 0.94 }}
            className="hidden flex-col items-center gap-[18px] self-stretch md:flex md:justify-center"
          >
            <button
              type="button"
              aria-label="התמונה הקודמת"
              aria-controls="hero-slide"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
            >
              <Arrow dir="prev" />
            </button>
            <button
              type="button"
              aria-label="התמונה הבאה"
              aria-controls="hero-slide"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
            >
              <Arrow dir="next" />
            </button>
            <span aria-hidden="true" className="h-[70px] w-px border-s border-dashed border-white/60" />
            <ul className="m-0 flex list-none flex-col items-center gap-2 p-0">
              {hero.slides.map((s, i) => (
                <li key={s.src}>
                  <button
                    type="button"
                    aria-label={`תמונה ${i + 1} מתוך ${count}`}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => setIndex(i)}
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full"
                  >
                    <span
                      className={`flex items-center justify-center rounded-full border border-white transition-all duration-300 ${
                        i === index ? 'h-[26px] w-[26px]' : 'h-2.5 w-2.5 opacity-70'
                      }`}
                    >
                      {i === index && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <p id="hero-slide" aria-live="polite" className="sr-only">
          {`תמונה ${index + 1} מתוך ${count}: ${slide.alt}`}
        </p>
      </div>
    </section>
  )
}
