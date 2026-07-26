import { Link } from 'react-router-dom'

// rounded-xl — מתואם לרדיוס הכרטיסים/השדות (היה חד מכל מה שסביבו)
const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none'

// גדלים רספונסיביים — קומפקטי במובייל, מרווח בדסקטופ
const sizes = {
  sm: 'px-4 py-2 text-meta',
  md: 'px-5 py-2.5 text-meta sm:px-6 sm:py-3 sm:text-body',
  lg: 'px-6 py-3 text-body sm:px-8 sm:py-4 sm:text-lead',
}

const variants = {
  primary:
    'bg-orange text-white shadow-ribbon hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0',
  honey:
    'bg-honey text-charcoal-900 shadow-warm hover:bg-honey-400 hover:-translate-y-0.5',
  outline:
    'border-2 border-charcoal/25 text-charcoal hover:border-orange hover:text-orange bg-transparent',
  'outline-light':
    'border-2 border-cream/40 text-cream hover:border-honey hover:text-honey bg-transparent',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1fb457] hover:-translate-y-0.5 shadow-warm',
  ghost: 'text-charcoal hover:text-orange bg-transparent',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  )
}
