import { motion } from 'framer-motion'
import SectionHeading from '../brand/SectionHeading.jsx'
import { kitchen } from '../../data/home.js'

// ============================================================
//  "מהמטבח שלנו בקרית גת" — חמש מנות, קשת ומלבן לסירוגין.
//  במובייל שתי עמודות וארבע תמונות: חמישית הייתה נשארת לבד
//  בשורה. שם הסירוגין הוא לוח שחמט — לפי הסדר של הנתונים, כל
//  הקשתות היו נופלות בעמודה אחת.
// ============================================================
const ease = [0.22, 1, 0.36, 1]
const ARCH = 'rounded-[100px_100px_16px_16px]'
const RECT = 'rounded-2xl'

// מובייל: שחמט בגריד של 2 (שורה + עמודה זוגי = קשת). md+: לפי הנתונים.
function shape(i, arch) {
  const mobileArch = (Math.floor(i / 2) + (i % 2)) % 2 === 0
  const m = mobileArch ? ARCH : RECT
  const d = arch ? 'md:rounded-[100px_100px_16px_16px]' : 'md:rounded-2xl'
  return `${m} ${d}`
}

export default function KitchenGallery() {
  return (
    <section id="about" aria-labelledby="kitchen-title" className="shell scroll-mt-[var(--header-h)] py-20 lg:py-24">
      <SectionHeading id="kitchen-title" title={kitchen.title} subtitle={kitchen.subtitle} />
      <motion.ul
        className="m-0 mt-[26px] grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-5"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        {kitchen.images.map((img, i) => (
          <motion.li
            key={img.src}
            variants={{ hidden: { opacity: 0, y: 50, scale: 0.92 }, shown: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ duration: 0.8, ease }}
            className={i === kitchen.images.length - 1 ? 'hidden md:block' : ''}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={`block aspect-[1/1.2] w-full object-cover ${shape(i, img.arch)}`}
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
