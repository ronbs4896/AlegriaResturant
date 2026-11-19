import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../brand/SectionHeading.jsx'
import LineIcon from '../brand/LineIcon.jsx'
import { services } from '../../data/home.js'

// ============================================================
//  ארבעה שירותים בכרטיסי קשת על פאנל ירקרק, ומנה עגולה שמרחפת
//  מעל הקצה העליון ומסתובבת לאט בזמן הגלילה. 1→2→4 עמודות:
//  ה-auto-fit של העיצוב השאיר בטאבלט כרטיס אחד לבד בשורה.
// ============================================================
const ease = [0.22, 1, 0.36, 1]

export default function ServicesArches() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 200])
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40])

  return (
    <section
      ref={ref}
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-[var(--header-h)] bg-olive-50"
    >
      <motion.img
        src={services.floating}
        alt=""
        loading="lazy"
        style={{ rotate, y }}
        className="absolute -top-10 end-[7%] h-[110px] w-[110px] rounded-full border-[5px] border-white object-cover shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] lg:-top-[54px] lg:h-[170px] lg:w-[170px] lg:border-[6px]"
      />

      <div className="shell pb-20 pt-20 lg:pb-24">
        <SectionHeading
          id="services-title"
          title={
            <>
              {services.title[0]}
              <br />
              {services.title[1]}
            </>
          }
          subtitle={services.subtitle}
        />

        <motion.ul
          className="m-0 mt-[30px] grid list-none grid-cols-1 gap-[22px] p-0 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {services.items.map((s) => (
            <motion.li
              key={s.to}
              variants={{
                hidden: { opacity: 0, y: 70, rotate: 2 },
                shown: { opacity: 1, y: 0, rotate: 0 },
              }}
              transition={{ duration: 0.8, ease }}
              className="flex min-h-[290px] flex-col items-center gap-3 rounded-[120px_120px_14px_14px] bg-white px-5 pb-[30px] pt-10 text-center"
            >
              <LineIcon d={s.icon} className="text-olive" />
              <h3 className="m-0 mt-1 text-[18px] font-black leading-[1.3]">{s.title}</h3>
              <p className="m-0 text-[14px] leading-[1.7] text-charcoal-600">{s.text}</p>
              <Link
                to={s.to}
                className="mt-auto inline-flex min-h-11 items-center text-[14px] font-extrabold text-olive underline-offset-4 hover:underline"
              >
                לפרטים
                <span className="sr-only"> על {s.title}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
