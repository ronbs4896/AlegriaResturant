import Reveal from './Reveal.jsx'

// ============================================================
//  כותרת סקשן — הרכיב היחיד שמייצר h2 באתר.
//  הסולם החדש (text-h2) נותן יחס כותרת:גוף של ~2.5x, שם נוצרת
//  ההיררכיה שהייתה חסרה. פסקת המשנה במשקל 300 (.lead).
// ============================================================
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  light = false,
  className = '',
  as: Tag = 'h2',
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-start items-start'
  return (
    <Reveal>
      <div className={`flex flex-col ${alignCls} ${className}`}>
        {eyebrow && (
          <span className={`eyebrow mb-4 ${light ? 'text-cream/55' : ''}`}>{eyebrow}</span>
        )}
        <Tag
          className={`text-h2 font-black max-w-[20ch] ${light ? 'text-cream' : 'text-charcoal'}`}
        >
          {title}
        </Tag>
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
