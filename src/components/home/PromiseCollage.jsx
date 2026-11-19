import { motion } from 'framer-motion'
import SectionHeading from '../brand/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { promise } from '../../data/home.js'

// ============================================================
//  "יש לכם 200 עובדים" — קולאז׳ של שתי תמונות וחותמת כשרות
//  עגולה שמרחפת. רדיוסי הפינות פיזיים, כמו בעיצוב: הם לא
//  מתהפכים ב-RTL, וזה מה שנותן לצמד את הצורה הלא סימטרית.
// ============================================================
const ease = [0.22, 1, 0.36, 1]
const inView = { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '-80px' } }

export default function PromiseCollage() {
  return (
    <section aria-labelledby="promise-title" className="shell py-16 lg:pb-24 lg:pt-[72px]">
      <SectionHeading id="promise-title" title={promise.title} />

      <div className="mt-10 flex flex-wrap items-center gap-14">
        <motion.div {...inView} className="relative min-h-[400px] max-w-[520px] flex-[1_1_420px]">
          <motion.img
            src={promise.front.src}
            alt={promise.front.alt}
            loading="lazy"
            variants={{
              hidden: { opacity: 0, x: 60, y: -30, rotate: 6 },
              shown: { opacity: 1, x: 0, y: 0, rotate: 0 },
            }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="absolute start-0 top-0 z-[2] aspect-[1/0.9] w-[56%] rounded-[80px_18px_80px_80px] border-8 border-white object-cover"
          />
          <motion.img
            src={promise.back.src}
            alt={promise.back.alt}
            loading="lazy"
            variants={{ hidden: { opacity: 0, y: 70 }, shown: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease }}
            className="absolute end-0 top-4 h-[380px] w-[56%] rounded-[22px_22px_70px_22px] object-cover"
          />
          <motion.span
            variants={{ hidden: { scale: 0, rotate: -180 }, shown: { scale: 1, rotate: 0 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 11, delay: 0.5 }}
            className="absolute bottom-[30px] end-[44%] z-[3]"
          >
            {/* הריחוף רץ על עטיפה פנימית, כדי לא להתנגש עם אנימציית הכניסה */}
            <motion.span
              animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 4.8, ease: 'easeInOut', repeat: Infinity, delay: 1.4 }}
              className="flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full border-[3px] border-olive bg-white text-center shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            >
              <b className="text-[20px] leading-none text-charcoal">כשר</b>
              <span className="mt-1 text-[11px] font-bold leading-[1.2] text-olive">
                רבנות
                <br />
                קרית גת
              </span>
            </motion.span>
          </motion.span>
        </motion.div>

        <motion.div
          {...inView}
          transition={{ staggerChildren: 0.12, delayChildren: 0.3 }}
          className="flex flex-[1_1_380px] flex-col items-start gap-[22px]"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease }}
            className="m-0 text-[17px] leading-[1.85] text-charcoal-600"
          >
            {promise.text}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease }}
          >
            <Button variant="brand" shape="pill" size="brand" href="#services">
              {promise.cta}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
