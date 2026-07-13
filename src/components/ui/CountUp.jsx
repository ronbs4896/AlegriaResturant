import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// מונה עולה כשנכנס למסך.
export default function CountUp({ to = 0, duration = 1600, suffix = '', prefix = '', className = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) { setVal(to); return }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(eased * to))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('he-IL')}
      {suffix}
    </span>
  )
}
