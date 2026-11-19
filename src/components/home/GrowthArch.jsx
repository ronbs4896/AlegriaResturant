import { motion } from 'framer-motion'
import SectionHeading from '../brand/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { growth } from '../../data/home.js'

// ============================================================
//  "מה קורה כשהמפעל גדל" — תמונת קשת שנחשפת מלמטה, ריבוע
//  ירקרק מאחוריה, ושלוש נקודות עם וי.
// ============================================================
const ease = [0.22, 1, 0.36, 1]
const arch = 'round 190px 190px 22px 22px'

export default function GrowthArch() {
  return (
    <section id="kitchen" aria-labelledby="growth-title" className="shell scroll-mt-[var(--header-h)] pb-20 lg:pb-24">
      <motion.div
        className="flex flex-wrap items-center gap-14"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="relative mx-auto w-full max-w-[380px] flex-[0_1_380px]">
          <motion.span
            aria-hidden="true"
            variants={{ hidden: { opacity: 0, scale: 0.6 }, shown: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="absolute -bottom-[18px] -end-[18px] h-[70%] w-[70%] rounded-[22px] bg-olive-50"
          />
          <motion.img
            src={growth.image.src}
            alt={growth.image.alt}
            loading="lazy"
            variants={{
              hidden: { clipPath: `inset(100% 0% 0% 0% ${arch})` },
              shown: { clipPath: `inset(0% 0% 0% 0% ${arch})` },
            }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            className="relative block aspect-[1/1.15] w-full rounded-[190px_190px_22px_22px] object-cover"
          />
        </div>

        <div className="flex flex-[1_1_460px] flex-col items-start gap-5">
          <SectionHeading
            id="growth-title"
            align="start"
            ornament={false}
            title={
              <>
                {growth.title[0]}
                <br />
                {growth.title[1]}
              </>
            }
          />
          <p className="m-0 text-[17px] leading-[1.85] text-charcoal-600">{growth.text}</p>
          {/* variants ריקים הופכים את הרשימה לצומת בעץ, וכך ה-stagger שלה
              חל על הנקודות. בלעדיהם הן נרשמות ישר להורה ונכנסות יחד. */}
          <motion.ul
            className="m-0 flex list-none flex-col gap-3 p-0 text-base"
            variants={{ hidden: {}, shown: {} }}
            transition={{ staggerChildren: 0.12, delayChildren: 0.5 }}
          >
            {growth.points.map((p) => (
              <motion.li
                key={p}
                variants={{ hidden: { opacity: 0, x: -30 }, shown: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.5, ease }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-olive text-white">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {p}
              </motion.li>
            ))}
          </motion.ul>
          <Button variant="brand" shape="pill" size="brand" href="#contact">
            {growth.cta}
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
