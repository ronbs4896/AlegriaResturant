import { Fragment } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../brand/SectionHeading.jsx'
import { steps } from '../../data/home.js'

// ============================================================
//  "מהשיחה הראשונה ועד הצלצול" — שלושה צעדים.
//
//  md+: זיגזג. הצעד האמצעי הפוך, וביניהם קווי חיבור בצורת L
//  עם פינה מעוגלת, שנחשפים מלמעלה למטה אחרי כל צעד.
//  מובייל: אותו כיוון לכולם וקו אנכי — זיגזג ברוחב 340px היה
//  מיישר טקסט עברי לשמאל.
// ============================================================
const ease = [0.22, 1, 0.36, 1]

function Connector({ flip }) {
  return (
    <>
      <motion.li
        aria-hidden="true"
        variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0%)' }, shown: { clipPath: 'inset(0% 0% 0% 0%)' } }}
        transition={{ duration: 0.5, ease: 'linear' }}
        className={`hidden h-12 border border-t-0 border-olive-300 md:block ${
          flip
            ? 'me-[74px] ms-[110px] border-s-0 rounded-[0_0_0_18px]'
            : 'me-[110px] ms-[74px] border-e-0 rounded-[0_0_18px_0]'
        }`}
      />
      <li aria-hidden="true" className="ms-[24px] h-7 w-px bg-olive-300 md:hidden" />
    </>
  )
}

export default function HowItWorks() {
  return (
    <section aria-labelledby="steps-title" className="shell py-20 lg:py-24">
      <SectionHeading id="steps-title" title={steps.title} />

      <div className="mt-[30px] flex flex-wrap items-center gap-12">
        <motion.ol
          className="m-0 flex flex-[1_1_440px] list-none flex-col p-0"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.28 }}
        >
          {steps.items.map((step, i) => {
            const flip = i % 2 === 1
            return (
              <Fragment key={step.title}>
                {i > 0 && <Connector flip={!flip} />}
                <motion.li
                  variants={{ hidden: { opacity: 0, x: flip ? -50 : 50 }, shown: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.6, ease }}
                  className={`flex items-start gap-[18px] ${flip ? 'md:flex-row-reverse md:text-left' : ''}`}
                >
                  <span
                    dir="ltr"
                    className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border-[3px] border-olive-100 text-[19px] font-black text-olive"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true" className="mt-[19px] hidden h-3 w-3 shrink-0 rounded-full bg-olive-400 md:block" />
                  <span className={`flex flex-col gap-1.5 pt-1.5 ${flip ? 'md:items-end' : ''}`}>
                    <b className="text-[17px]">{step.title}</b>
                    <span className="text-[14px] leading-[1.7] text-charcoal-600">{step.text}</span>
                  </span>
                </motion.li>
              </Fragment>
            )
          })}
        </motion.ol>

        {/* העטיפה היא שצופה בגלילה, לא התמונה: Chromium מחשב את
            IntersectionObserver אחרי ה-clip-path של האלמנט עצמו, ותמונה
            שמתחילה חתוכה לגמרי לעולם לא "נכנסת למסך". */}
        <motion.div
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto w-full max-w-[470px] flex-[1_1_400px]"
        >
          <motion.img
            src={steps.image.src}
            alt={steps.image.alt}
            loading="lazy"
            variants={{
              hidden: { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.08 },
              shown: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
            }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="block aspect-[1/1.2] w-full rounded-[22px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
