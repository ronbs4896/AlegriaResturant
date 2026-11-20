// ============================================================
//  רכיבים משותפים לעמודים שאין להם עיצוב קנבס משלהם (שירותים,
//  גלריה, שאלות נפוצות, עמודים משפטיים). אותה שפה: קרם, פחם,
//  כותרות שנחשפות, פס החתימה, כפתור אחד בגרדיאנט.
// ============================================================
import { Link } from 'react-router-dom'

export const INK = '#2E2A27'
export const CREAM = '#F2EADE'
export const SAND = '#EADFCD'
export const LINE = '#DDD1BE'
export const GRAD = 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)'
export const PAD = 'clamp(20px, 5vw, 80px)'

export const btnPrimary = { minHeight: 52, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 28px', borderRadius: 999, background: GRAD, color: INK, fontSize: 16, fontWeight: 800, textDecoration: 'none', border: 0, cursor: 'pointer' }
export const btnSecondary = { ...btnPrimary, background: INK, color: CREAM }
export const btnOutlineLight = { ...btnPrimary, background: 'transparent', color: CREAM, boxShadow: 'inset 0 0 0 1.5px rgba(242, 234, 222, 0.6)' }

export function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
        <span data-w="" style={{ display: 'inline-block' }}>{w}</span>
      </span>{' '}
    </span>
  ))
}

export function SigBar({ dark }) {
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ flexGrow: 1, height: 8, background: 'linear-gradient(90deg, #F5871F 0%, #FCC50D 100%)' }} />
      <span style={{ width: 12, height: 12, background: dark ? CREAM : INK }} />
    </div>
  )
}

export function PageHero({ crumb, title, intro, children }) {
  return (
    <section aria-labelledby="h1" style={{ padding: `56px ${PAD} 40px` }}>
      <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: 14 }}>
          <Link to="/">בית</Link> / {crumb}
        </nav>
        <h1 id="h1" data-a="words" style={{ margin: 0, fontSize: 'clamp(2.2rem, 4.6vw, 3.6rem)', lineHeight: 1.1, fontWeight: 900, maxWidth: 900 }}>
          <Words text={title} />
        </h1>
        {intro && <p data-a="hero-fade" style={{ margin: 0, fontSize: 19, lineHeight: 1.8, maxWidth: 720 }}>{intro}</p>}
        {children}
        <div style={{ marginTop: 12 }}><SigBar /></div>
      </div>
    </section>
  )
}

export function CtaBand({ title = 'בואו נדבר על מה שאתם צריכים', text = 'הצעה כתובה, לרוב עוד באותו יום. אפשר גם להרים טלפון.', to = '/contact', label = 'אני רוצה הצעת מחיר' }) {
  return (
    <section aria-label="יצירת קשר" style={{ padding: `0 ${PAD} 96px` }}>
      <div data-a="panel" style={{ width: '100%', maxWidth: 1180, margin: '0 auto', background: INK, color: CREAM, borderRadius: 32, padding: 'clamp(32px, 5vw, 56px)', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
        <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', lineHeight: 1.2, fontWeight: 900, color: CREAM }}>{title}</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: CREAM }}>{text}</p>
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
