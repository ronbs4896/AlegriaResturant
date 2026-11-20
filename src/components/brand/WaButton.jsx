// ============================================================
//  כפתור וואטסאפ לעמית (054-543-7526), עם הסמל של וואטסאפ.
//  פותח שיחה עם הודעה פתוחה מוכנה, ומדווח "יצירת קשר" למדידה.
//  variant: outline (ברירת מחדל) · hero (על תמונה כהה) · inline (קישור בתוך טופס) · icon (עיגול בלבד)
// ============================================================
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'

const GREEN = '#25D366'
const TERRA = '#B4511E'

export function WaIcon({ size = 20, color = GREEN }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

const BASE = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, textDecoration: 'none', fontWeight: 800, whiteSpace: 'nowrap', boxSizing: 'border-box' }
const VARIANTS = {
  outline: { ...BASE, minHeight: 48, padding: '0 22px', borderRadius: 999, background: '#FFFFFF', border: `1.5px solid ${TERRA}`, color: TERRA, fontSize: 16 },
  hero: { ...BASE, minHeight: 48, padding: '0 22px', borderRadius: 999, background: 'transparent', border: '1.5px solid rgba(255, 255, 255, 0.8)', color: '#FFFFFF', fontSize: 15, fontWeight: 700 },
  inline: { ...BASE, gap: 8, minHeight: 44, color: '#2E2A27', fontSize: 15, fontWeight: 700, whiteSpace: 'normal' },
  icon: { ...BASE, width: 44, height: 44, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #FDEBD3' },
}

export default function WaButton({ variant = 'outline', label = 'וואטסאפ לעמית', topic, source, showNumber = false, style, className }) {
  const message = topic
    ? `היי עמית, הגעתי מהאתר של קייטרינג אלגריה ואשמח לשמוע על ${topic}.`
    : 'היי עמית, הגעתי מהאתר של קייטרינג אלגריה ואשמח לפרטים.'
  const onClick = () => trackContact('whatsapp', { source: source || (typeof window !== 'undefined' ? window.location.pathname : '') })
  const props = { href: buildWaLink(message), target: '_blank', rel: 'noopener noreferrer', onClick }
  if (variant === 'icon') {
    return (
      <a {...props} className={className} aria-label="וואטסאפ לעמית" style={{ ...VARIANTS.icon, ...style }}>
        <WaIcon size={22} />
      </a>
    )
  }
  return (
    <a {...props} className={className} style={{ ...VARIANTS[variant], ...style }}>
      <WaIcon size={variant === 'inline' ? 18 : 20} />
      {variant === 'inline' ? <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{label}</span> : <span>{label}</span>}
      {showNumber ? <span dir="ltr" style={{ fontWeight: 700 }}>054-543-7526</span> : null}
    </a>
  )
}
