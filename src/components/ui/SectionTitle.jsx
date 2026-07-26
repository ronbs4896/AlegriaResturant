import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Illustration from './Illustration.jsx'

// ============================================================
//  כותרת סקשן — הרכיב היחיד שמייצר h2 באתר.
//  הסולם (text-h2) נותן יחס כותרת:גוף של ~2.5x, שם נוצרת
//  ההיררכיה שהייתה חסרה. פסקת המשנה במשקל 300 (.lead).
//
//  art  = איור בקו אחד בתוך ה-eyebrow (שם מ-ui/Illustration.jsx).
//         עד היום ה-eyebrow היה מילה על רקע ריק.
//  rule = קו פליז שנמשך מימין לשמאל מתחת לכותרת בזמן החשיפה.
//         הקו מסמן את הכותרת ולא את הכפתור, כך שהפליז נשאר
//         מבטא ולא מתחרה בכתום על תשומת הלב.
// ============================================================
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  light = false,
  art,
  rule = false,
  className = '',
  as: Tag = 'h2',
}) {
  const reduce = useReducedMotion()
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-start items-start'

  return (
    <Reveal>
      <div className={`flex flex-col ${alignCls} ${className}`}>
        {eyebrow && (
          <span className={`eyebrow mb-4 ${light ? 'text-cream/55' : ''}`}>
            {art && <Illustration name={art} size={17} strokeWidth={2.4} />}
            {eyebrow}
          </span>
        )}
        <Tag
          className={`text-h2 font-black max-w-[20ch] ${light ? 'text-cream' : 'text-charcoal'}`}
        >
          {title}
        </Tag>
        {rule && (
          <motion.span
            aria-hidden="true"
            className={`mt-4 block h-0.5 w-24 origin-right rounded-full ${
              light ? 'bg-honey' : 'bg-charcoal/30'
            }`}
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
        {subtitle && (
          <p
            className={`mt-5 text-lead font-light max-w-[52ch] ${
              light ? 'text-cream/70' : 'text-charcoal-soft'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  )
}
