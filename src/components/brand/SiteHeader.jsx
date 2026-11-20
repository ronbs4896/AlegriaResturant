// ============================================================
//  כותרת עליונה: לוגו, תפריט שירותים נפתח (מגה-מניו), קישורים
//  וכפתור הצעת מחיר. בנייד: כפתור תפריט שפותח מסך מלא.
//  עיצוב לפי ספר המותג: טקסט בפחם, גרדיאנט רק על כפתור הפעולה.
// ============================================================
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import WaButton from './WaButton.jsx'

const GRAD = 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)'
const INK = '#2E2A27'

export const SERVICES = [
  { title: 'הסעדה יומית למפעלים', text: 'בתפזורת או בחמגשיות, הזמנה באפליקציה', to: '/factories', hl: true, icon: 'M6 30V14h22v16M28 20h8l6 6v4H28M13 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM35 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 34h14' },
  { title: 'ארוחות מסובסדות לעובדים', text: 'המעסיק משתתף, ודוח חודשי אחד למחלקת השכר', to: '/services/subsidized-meals', icon: 'M24 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM6 42v-6a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v6M18 30v12M30 30v12' },
  { title: 'אירועי חברה וימי גיבוש', text: 'מ-20 ועד 300 משתתפים, מבושל באותו בוקר', to: '/services/corporate-events', icon: 'M4 34h40M8 34a16 16 0 0 1 32 0M24 18v-4M20 14h8M8 40h32' },
  { title: 'אירועים פרטיים', text: 'בריתות, בר ובת מצווה, שבע ברכות ואזכרות', to: '/services/event-catering', icon: 'M10 20h28v20H10zM6 14h36v6H6zM24 14v26M24 14c-4-8-12-6-8 0M24 14c4-8 12-6 8 0' },
  { title: 'מכירת שישי', text: 'לפי משקל, בלי מינימום, הזמנה בטלפון', to: '/friday', icon: 'M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8' },
  { title: 'המטבח שלנו', text: 'מטבח בשרי בקרית גת, 3,000 מנות ביום', to: '/kitchen', icon: 'M14 26a8 8 0 1 1 4-15 8 8 0 0 1 12 0 8 8 0 1 1 4 15v10H14zM14 42h20' },
  { title: 'כשרות ובטיחות מזון', text: 'רבנות קרית גת ושרשרת חום מבוקרת עד המפעל', to: '/kitchen#docs', icon: 'M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10' },
]

const LINKS = [
  { to: '/kitchen', label: 'המטבח שלנו' },
  { to: '/about', label: 'הסיפור שלנו' },
  { to: '/blog', label: 'בלוג' },
  { to: '/contact', label: 'צור קשר' },
]

const SERVICE_PATHS = ['/factories', '/friday', '/services']

const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Icon({ d, size = 34, color = '#B4511E', sw = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  )
}

export default function SiteHeader() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const panel = useRef(null)
  const chev = useRef(null)
  const wrap = useRef(null)
  const servicesActive = SERVICE_PATHS.some((p) => pathname.startsWith(p))

  // סוגרים הכל במעבר עמוד
  useEffect(() => { setOpen(false); setMobile(false) }, [pathname])

  // אנימציית המגה-מניו
  useEffect(() => {
    const el = panel.current
    if (!el) return
    if (reduced()) { el.style.visibility = open ? 'visible' : 'hidden'; el.style.opacity = open ? '1' : '0'; return }
    gsap.killTweensOf(el)
    if (chev.current) gsap.to(chev.current, { rotate: open ? 180 : 0, duration: 0.3, ease: 'power2.out' })
    if (open) {
      gsap.set(el, { visibility: 'visible' })
      gsap.fromTo(el, { opacity: 0, y: -12, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.out' })
      gsap.fromTo(el.querySelectorAll('[data-mega="item"]'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out', delay: 0.12 })
      gsap.fromTo(el.querySelector('[data-mega="promo"]'), { rotate: -8, scale: 0.9, opacity: 0 }, { rotate: -1.5, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)', delay: 0.3 })
    } else {
      gsap.to(el, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in', onComplete: () => gsap.set(el, { visibility: 'hidden' }) })
    }
  }, [open])

  // Escape וקליק מחוץ לתפריט סוגרים אותו
  useEffect(() => {
    if (!open && !mobile) return
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setMobile(false) } }
    const onDown = (e) => { if (open && wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown) }
  }, [open, mobile])

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobile])

  const linkStyle = ({ isActive }) => ({
    minHeight: 44, display: 'inline-flex', alignItems: 'center', color: INK, textDecoration: 'none',
    boxShadow: isActive ? 'inset 0 -3px 0 #F5871F' : 'none',
  })

  return (
    <header ref={wrap} dir="rtl" className="site-header" style={{ position: 'sticky', top: 0, zIndex: 50, background: '#FFFFFF', color: INK, padding: '0 clamp(16px, 5vw, 80px)', boxShadow: '0 1px 0 #FDEBD3' }}>
      <div style={{ minHeight: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px 32px' }}>
        <Link to="/" aria-label="קייטרינג אלגריה, לדף הבית" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: INK }}>
          <img className="hdr-logo" src="/images/site/mark.jpg" alt="" width="50" height="50" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '1px solid #FDEBD3' }} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span className="hdr-name" style={{ fontSize: 20, fontWeight: 900, whiteSpace: 'nowrap' }}>קייטרינג אלגריה</span>
            <span className="hdr-sub" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>הסעדה למפעלים בדרום</span>
          </span>
        </Link>

        <nav aria-label="ניווט ראשי" className="hdr-desktop" style={{ alignItems: 'center', gap: '4px 30px', fontSize: 15, fontWeight: 700 }}>
          <button type="button" aria-expanded={open} aria-controls="mega-panel" onClick={() => setOpen((o) => !o)}
            style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', padding: 0, font: 'inherit', fontWeight: 700, color: INK, cursor: 'pointer', boxShadow: servicesActive ? 'inset 0 -3px 0 #F5871F' : 'none' }}>
            השירותים שלנו
            <svg ref={chev} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          {LINKS.map((l) => <NavLink key={l.to} to={l.to} style={linkStyle}>{l.label}</NavLink>)}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <WaButton variant="icon" source="header" className="hdr-wa" />
          <Link to="/contact" className="hdr-cta" style={{ minHeight: 46, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 22px', borderRadius: 999, background: GRAD, color: INK, fontSize: 15, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            הצעת מחיר
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </Link>
          <button type="button" className="hdr-burger" aria-label={mobile ? 'סגירת התפריט' : 'פתיחת התפריט'} aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile((m) => !m)}
            style={{ width: 46, height: 46, borderRadius: '50%', border: '1.5px solid #2E2A27', background: 'transparent', color: INK, alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {mobile ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* מגה-מניו, מחשב */}
      <div id="mega-panel" ref={panel} className="hdr-desktop-block" style={{ position: 'absolute', top: '100%', insetInline: 'clamp(16px, 5vw, 80px)', visibility: 'hidden', opacity: 0 }}>
        <div style={{ background: '#FFFFFF', padding: '30px 30px 54px', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 82% 97%, 64% 91%, 46% 98%, 28% 92%, 12% 97%, 0 91%)', boxShadow: '0 30px 60px -30px rgba(0, 0, 0, 0.35)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px 18px' }}>
            {SERVICES.map((it) => (
              <Link key={it.to} to={it.to} data-mega="item" onClick={() => setOpen(false)}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px 18px', borderRadius: 6, textDecoration: 'none', minHeight: 44, background: it.hl ? '#FFF5E8' : 'transparent' }}>
                <Icon d={it.icon} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 17, fontWeight: 900, color: INK }}>{it.title}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: INK }}>{it.text}</span>
                </span>
              </Link>
            ))}
            <div data-mega="promo" style={{ alignSelf: 'center', background: GRAD, color: INK, padding: '22px 22px 20px', transform: 'rotate(-1.5deg)', clipPath: 'polygon(0 3%, 100% 0, 98% 100%, 2% 97%)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.35 }}>מחיר למנה ומינימום יומי,<br />בכתב ועוד באותו יום.</span>
              <Link to="/factories#contact" onClick={() => setOpen(false)} style={{ alignSelf: 'flex-start', minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 18px', background: '#FFFFFF', color: INK, fontSize: 15, fontWeight: 800, textDecoration: 'none', transform: 'rotate(1.5deg)' }}>
                הצעת מחיר למפעל
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* תפריט נייד */}
      {mobile && (
        <div id="mobile-menu" style={{ position: 'fixed', top: 84, insetInline: 0, bottom: 0, background: '#FFFFFF', overflowY: 'auto', padding: '20px 20px 120px', zIndex: 60 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 800, letterSpacing: '0.04em' }}>השירותים שלנו</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SERVICES.map((it) => (
              <Link key={it.to} to={it.to} style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 56, padding: '8px 12px', borderRadius: 14, textDecoration: 'none', color: INK, background: it.hl ? '#FFF5E8' : 'transparent' }}>
                <Icon d={it.icon} size={28} />
                <span style={{ fontSize: 17, fontWeight: 800 }}>{it.title}</span>
              </Link>
            ))}
          </div>
          <div style={{ height: 1, background: '#FDEBD3', margin: '16px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} style={{ minHeight: 52, display: 'flex', alignItems: 'center', fontSize: 18, fontWeight: 800, color: INK, textDecoration: 'none' }}>{l.label}</Link>
            ))}
          </div>
          <a href="tel:+972545437526" style={{ marginTop: 18, minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, background: INK, color: '#FFFFFF', fontWeight: 800, textDecoration: 'none' }}>
            <span dir="ltr">054-543-7526</span>
          </a>
          <WaButton source="mobile_menu" style={{ marginTop: 10, minHeight: 52, width: '100%' }} />
        </div>
      )}
    </header>
  )
}
