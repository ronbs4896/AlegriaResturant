import { motion } from 'framer-motion'

// ============================================================
//  העיטור שמתחת לכותרות: שני זוגות קווים ועיגול זית עם מזלג
//  וסכין. הקווים נמתחים מהמרכז והעיגול מסתובב פנימה, פעם אחת,
//  כשהכותרת נכנסת למסך.
// ============================================================
const ease = [0.22, 1, 0.36, 1]

function Lines({ align }) {
  return (
    <span className={`flex flex-col gap-[5px] ${align === 'start' ? 'items-start' : 'items-end'}`}>
      {[90, 56].map((w, i) => (
        <motion.span
          key={w}
          className="block h-px bg-olive-300"
          style={{ width: w }}
          variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
          transition={{ duration: 0.8, ease, delay: i * 0.06 }}
        />
      ))}
    </span>
  )
}

export default function Ornament({ className = '' }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`flex items-center gap-3 ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-40px' }}
    >
      <Lines align="start" />
      <motion.span
        className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-olive text-white"
        variants={{ hidden: { scale: 0, rotate: -120 }, shown: { scale: 1, rotate: 0 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
        </svg>
      </motion.span>
      <Lines align="end" />
    </motion.div>
  )
}
