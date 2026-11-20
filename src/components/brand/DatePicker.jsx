// ============================================================
// ds-normalized
//  בוחר תאריך מותאם (לא הדיפולט של הדפדפן): לוח חודשי בעברית,
//  ימים שעברו חסומים, התאריך הנבחר בגרדיאנט החתימה.
// ============================================================
import { useEffect, useMemo, useRef, useState } from 'react'

const MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
const WEEK = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']
const INK = '#2E2A27'
const LINE = '#FDEBD3'
const pad = (n) => (n < 10 ? '0' + n : '' + n)
const isoOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export default function DatePicker({ name = 'תאריך האירוע' }) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const [open, setOpen] = useState(false)
  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [sel, setSel] = useState(null)
  const root = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('touchstart', onDoc)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('touchstart', onDoc) }
  }, [open])

  const { y, m } = ym
  const atFirst = y === today.getFullYear() && m === today.getMonth()
  const go = (dm) => { const d = new Date(y, m + dm, 1); setYm({ y: d.getFullYear(), m: d.getMonth() }) }

  const cells = useMemo(() => {
    const out = []
    const first = new Date(y, m, 1).getDay()
    const count = new Date(y, m + 1, 0).getDate()
    for (let i = 0; i < first; i++) out.push(null)
    for (let d = 1; d <= count; d++) out.push(new Date(y, m, d))
    return out
  }, [y, m])

  let display = 'בחרו תאריך'
  if (sel) {
    const [sy, sm, sd] = sel.split('-').map(Number)
    const sdate = new Date(sy, sm - 1, sd)
    display = `${DAYS[sdate.getDay()]}, ${sd} ב${MONTHS[sm - 1]} ${sy}`
  }
  const todayIso = isoOf(today)

  return (
    <div ref={root} dir="rtl" onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false) }} style={{ position: 'relative', width: '100%', color: INK }}>
      <input type="hidden" name={name} value={sel ? display : ''} />
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="dialog" aria-expanded={open}
        aria-label={sel ? `תאריך האירוע: ${display}. לשינוי` : 'בחרו תאריך לאירוע'}
        style={{ width: '100%', minHeight: 52, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', boxSizing: 'border-box', background: '#FFFFFF', borderRadius: 999, font: 'inherit', fontSize: 16, textAlign: 'start', cursor: 'pointer', border: `1.5px solid ${open ? INK : LINE}`, boxShadow: open ? '0 0 0 4px rgba(245, 135, 31, 0.25)' : 'none' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4511E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
        <span style={{ fontWeight: sel ? 800 : 500, color: INK }}>{display}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginInlineStart: 'auto' }}><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open && (
        <div role="dialog" aria-label="בחירת תאריך האירוע" style={{ position: 'absolute', zIndex: 40, top: 'calc(100% + 10px)', insetInlineStart: 0, width: 344, maxWidth: 'calc(100vw - 32px)', background: '#FFFFFF', border: `1px solid ${LINE}`, borderRadius: 22, boxShadow: '0 24px 60px -18px rgba(46, 42, 39, 0.35), 0 4px 14px -6px rgba(46, 42, 39, 0.12)', padding: '18px 18px 14px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <button type="button" onClick={() => !atFirst && go(-1)} disabled={atFirst} aria-label="החודש הקודם" style={navStyle(atFirst)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <span aria-live="polite" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <b style={{ fontSize: 20, fontWeight: 700 }}>{MONTHS[m]}</b>
              <span dir="ltr" style={{ fontSize: 16, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{y}</span>
            </span>
            <button type="button" onClick={() => go(1)} aria-label="החודש הבא" style={navStyle(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 4, textAlign: 'center' }}>
            {WEEK.map((w) => <span key={w} style={{ fontSize: 14, fontWeight: 700, padding: '2px 0 6px' }}>{w}</span>)}
            {cells.map((date, i) => {
              if (!date) return <span key={'b' + i} aria-hidden="true" style={{ height: 42 }} />
              const iso = isoOf(date)
              const past = date < today
              const isSel = sel === iso
              const isToday = iso === todayIso
              const base = { width: '100%', height: 42, borderRadius: 12, font: 'inherit', fontSize: 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              const st = isSel
                ? { background: 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)', color: INK, border: 0, cursor: 'pointer', boxShadow: '0 6px 14px -6px rgba(245, 135, 31, 0.7)' }
                : past
                  ? { background: 'transparent', color: '#B9B2A8', border: 0, cursor: 'default', textDecoration: 'line-through' }
                  : isToday
                    ? { background: '#FFFFFF', color: INK, border: `1.5px solid ${INK}`, cursor: 'pointer' }
                    : { background: 'transparent', color: INK, border: 0, cursor: 'pointer' }
              return (
                <button key={iso} type="button" disabled={past} aria-pressed={isSel}
                  aria-label={`יום ${DAYS[date.getDay()]}, ${date.getDate()} ב${MONTHS[m]} ${y}${isToday ? ', היום' : ''}`}
                  onClick={() => { setSel(iso); setOpen(false) }} style={{ ...base, ...st }}>
                  {date.getDate()}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 12, borderTop: `1px solid ${LINE}` }}>
            <span style={{ fontSize: 'var(--fs-body-sm)', lineHeight: 1.6 }}>מאה אורחים ומעלה? כדאי שבועיים מראש.</span>
            <button type="button" onClick={() => setSel(null)} style={{ minHeight: 36, padding: '0 14px', border: 0, borderRadius: 999, background: '#FFF5E8', color: INK, font: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>ניקוי</button>
          </div>
        </div>
      )}
    </div>
  )
}

function navStyle(disabled) {
  return { width: 40, height: 40, borderRadius: '50%', border: `1px solid ${LINE}`, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: disabled ? '#B9B2A8' : INK, cursor: disabled ? 'default' : 'pointer' }
}
