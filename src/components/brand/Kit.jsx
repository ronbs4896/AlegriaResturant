// ============================================================
//  רכיבים משותפים לעמודים שאין להם עיצוב קנבס משלהם (שירותים,
//  גלריה, שאלות נפוצות, עמודים משפטיים). אותה שפה של עיצוב הרפרנס:
//  רקע לבן, פס אפרסק, כותרות בטרקוטה, קישוט הקווים והעיגול, כפתור בגרדיאנט.
// ============================================================
import { Link } from 'react-router-dom'

export const INK = '#2E2A27'
export const CREAM = '#FFFFFF'
export const SAND = '#FFF5E8'
export const LINE = '#FDEBD3'
export const TERRA = '#B4511E'
export const MUTED = '#5A544E'
const ORN = '#F0C99A'
export const GRAD = 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)'
export const PAD = 'clamp(20px, 5vw, 80px)'

export const btnPrimary = { minHeight: 52, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 28px', borderRadius: 999, background: GRAD, color: INK, fontSize: 16, fontWeight: 800, textDecoration: 'none', border: 0, cursor: 'pointer' }
export const btnSecondary = { ...btnPrimary, background: 'transparent', color: TERRA, boxShadow: `inset 0 0 0 1.5px ${TERRA}` }
export const btnOutlineLight = btnSecondary

export function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
        <span data-w="" style={{ display: 'inline-block' }}>{w}</span>
      </span>{' '}
    </span>
  ))
}

// הקישוט של הרפרנס: שני קווים, עיגול גרדיאנט עם מזלג וסכין, שני קווים
export function SigBar() {
  const lines = (end) => (
    <span style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: end ? 'flex-end' : 'flex-start' }}>
      <span style={{ width: 90, height: 1, background: ORN }} />
      <span style={{ width: 56, height: 1, background: ORN }} />
    </span>
  )
  return (
    <div data-a="orn" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {lines(false)}
      <span style={{ width: 34, height: 34, borderRadius: '50%', background: GRAD, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" /></svg>
      </span>
      {lines(true)}
    </div>
  )
}

export function PageHero({ crumb, title, intro, children }) {
  return (
    <section aria-labelledby="h1" style={{ padding: `56px ${PAD} 48px`, background: SAND, marginBottom: 48 }}>
      <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}>
        <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: 14, color: MUTED }}>
          <Link to="/">בית</Link> / {crumb}
        </nav>
        <h1 id="h1" data-a="words" style={{ margin: 0, fontSize: 'clamp(2.2rem, 4.6vw, 3.6rem)', lineHeight: 1.1, fontWeight: 900, maxWidth: 900, color: TERRA }}>
          <Words text={title} />
        </h1>
        <SigBar />
        {intro && <p data-a="hero-fade" style={{ margin: 0, fontSize: 18, lineHeight: 1.8, maxWidth: 720, color: MUTED }}>{intro}</p>}
        {children}
      </div>
    </section>
  )
}

export function CtaBand({ title = 'בואו נדבר על מה שאתם צריכים', text = 'הצעה כתובה, לרוב עוד באותו יום. אפשר גם להרים טלפון.', to = '/contact', label = 'אני רוצה הצעת מחיר' }) {
  return (
    <section aria-label="יצירת קשר" style={{ padding: `0 ${PAD} 96px` }}>
      <div data-a="panel" style={{ width: '100%', maxWidth: 1180, margin: '0 auto', background: SAND, color: INK, borderRadius: 32, padding: 'clamp(32px, 5vw, 56px)', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
        <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', lineHeight: 1.2, fontWeight: 900, color: TERRA }}>{title}</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: MUTED }}>{text}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link to={to} style={btnPrimary}>{label}</Link>
          <a href="tel:+972545437526" style={btnOutlineLight}><span dir="ltr">054-543-7526</span></a>
        </div>
      </div>
    </section>
  )
}

export function Prose({ children }) {
  return (
    <section style={{ padding: `8px ${PAD} 80px` }}>
      <div className="brand-prose" style={{ width: '100%', maxWidth: 760, margin: '0 auto', fontSize: 18, lineHeight: 1.9, color: INK }}>
        {children}
      </div>
    </section>
  )
}
