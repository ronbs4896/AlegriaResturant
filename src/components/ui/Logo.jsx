import { Link } from 'react-router-dom'
import { site } from '../../data/site.js'

// לוגו אלגריה — האמבלם הרשמי (JPG). אין לשנות צבעוניות/למתוח (הנחיות מותג).
export default function Logo({ className = '', size = 56, withText = false }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`} aria-label={site.name}>
      <img
        src="/images/logo/logo.jpg"
        alt={site.name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
      {withText && (
        <span className="font-black text-xl leading-none">{site.name}</span>
      )}
    </Link>
  )
}
