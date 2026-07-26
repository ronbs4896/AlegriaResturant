import { motion, useReducedMotion } from 'framer-motion'

// ============================================================
//  חשיפת גלילה. עד היום כל החשיפות באתר היו אותו fade-up בדיוק,
//  וכשהכל זז אותו דבר התנועה מפסיקה להיות מידע והופכת לרעש.
//  from קובע מאיזה כיוון הבלוק נכנס:
//    bottom (ברירת מחדל) · start = מימין (כיוון הקריאה) · end = משמאל
//  בספליט: הצד הימני נכנס מ-start והשמאלי מ-end, כך שהתנועה
//  מספרת את הפריסה. מכבד prefers-reduced-motion.
// ============================================================
const offsets = {
  bottom: (y) => ({ y }),
  start: () => ({ x: 28 }), //  RTL: חיובי = נכנס מימין
  end: () => ({ x: -28 }),
}

export default function Reveal({
  children,
  delay = 0,
  y = 22,
  from = 'bottom',
  className = '',
  as = 'div',
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  const shift = (offsets[from] || offsets.bottom)(y)

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...shift }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
