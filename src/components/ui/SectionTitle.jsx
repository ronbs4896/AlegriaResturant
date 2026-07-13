import Reveal from './Reveal.jsx'

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  light = false,
  className = '',
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-start items-start'
  return (
    <Reveal>
      <div className={`flex flex-col ${alignCls} ${className}`}>
        {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-black max-w-3xl ${
            light ? 'text-cream' : 'text-charcoal'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-4 text-lg max-w-2xl leading-relaxed ${
              light ? 'text-cream/75' : 'text-charcoal-soft'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  )
}
