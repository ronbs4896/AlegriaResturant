import { motion } from 'framer-motion'
import Ornament from './Ornament.jsx'

// ============================================================
//  כותרת סקשן: H2 בזית, משפט משנה, ועיטור.
//  align="center" לכותרות שעומדות לבד, "start" כשהכותרת יושבת
//  בעמודה ליד תמונה. title מקבל JSX כדי לאפשר <br /> מכוון.
// ============================================================
const ease = [0.22, 1, 0.36, 1]
const rise = {
  hidden: { opacity: 0, y: 36 },
  shown: { opacity: 1, y: 0 },
}

export default function SectionHeading({
  id,
  title,
  subtitle,
  align = 'center',
  ornament = true,
  className = '',
}) {
  const centered = align === 'center'
  return (
    <motion.div
      className={`flex flex-col gap-4 ${centered ? 'items-center text-center' : 'items-start'} ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.h2
        id={id}
        variants={rise}
        transition={{ duration: 0.8, ease }}
        className="m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-black leading-[1.2] text-olive"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease }}
          className={`m-0 text-base leading-[1.75] text-charcoal-600 ${centered ? 'max-w-[620px]' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
      {ornament && <Ornament />}
    </motion.div>
  )
}
