// כרטיס הצעת מחיר למפעלים: בחירות בצ'יפים במקום רשימות נפתחות,
// ושלושה שדות טקסט בלבד. משמש בדף הבית ובעמוד המפעלים.

const SIZES = ['30–80', '80–150', '150–300', '300+']
const SERVING = ['חדר אוכל, תפזורת', 'חמגשיות אישיות', 'עוד לא יודעים']

function Chip({ name, value, defaultChecked }) {
  return (
    <label className="opt opt-chip">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} />
      <span dir={/^[\d+–]+$/.test(value) ? 'ltr' : undefined}>{value}</span>
    </label>
  )
}

export default function FactoryQuote({ formOpen, sent, idle, sending, send, reset, title = 'הצעת מחיר למפעל' }) {
  return (
    <div className="fq-card" style={{ flex: '1.3 1 460px' }}>
      {formOpen ? (
        <form onSubmit={(e) => { e.preventDefault(); send(e) }} noValidate className="fq-form">
          <div className="fq-head">
            <span className="fq-title">{title}</span>
            <span className="fq-note">פחות מדקה</span>
          </div>

          <fieldset className="fq-set">
            <legend>כמה עובדים אוכלים ביום?</legend>
            <div className="fq-chips fq-chips-4">
              {SIZES.map((v) => <Chip key={v} name="כמה עובדים" value={v} />)}
            </div>
          </fieldset>

          <fieldset className="fq-set">
            <legend>איך מגישים?</legend>
            <div className="fq-chips fq-chips-3">
              {SERVING.map((v) => <Chip key={v} name="איך מגישים" value={v} />)}
            </div>
          </fieldset>

          <div className="fq-row">
            <label className="fq-lbl">
              איש קשר
              <input className="fld" type="text" name="איש קשר" autoComplete="name" />
            </label>
            <label className="fq-lbl">
              טלפון
              <input className="fld" type="tel" name="טלפון" dir="ltr" style={{ textAlign: 'right' }} autoComplete="tel" required />
            </label>
          </div>

          <label className="fq-lbl">
            שם המפעל ועיר
            <input className="fld" type="text" name="מפעל ועיר" placeholder="שם המפעל, עיר" autoComplete="organization" />
          </label>

          <button type="button" onClick={send} className="fq-btn">
            {idle ? <span>אני רוצה הצעת מחיר</span> : null}
            {sending ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <span className="spin" aria-hidden="true" style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(46, 42, 39, 0.3)', borderTopColor: '#2E2A27' }} />
                שולחים
              </span>
            ) : null}
          </button>
          <p className="fq-foot">
            <svg width="16" height="16" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
            </svg>
            חוזרים אליכם בטלפון עם הצעה כתובה, בלי התחייבות.
          </p>
        </form>
      ) : null}

      {sent ? (
        <div data-a="thanks" role="status" className="fq-thanks">
          <span data-a="tk-badge" style={{ width: '88px', height: '88px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
              <circle cx="44" cy="44" r="40" fill="#EADFCD" />
              <circle data-a="tk-ring" cx="44" cy="44" r="40" stroke="#A24A1B" strokeWidth="3" transform="rotate(-90 44 44)" />
              <path data-a="tk-check" d="M28 45l11 11 22-24" stroke="#A24A1B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div data-a="tk-txt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#2E2A27' }}>קיבלנו את פרטי המפעל</h3>
            <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.7, color: '#2E2A27', maxWidth: '420px' }}>
              נחזור אליכם עם הצעה כתובה, לרוב עוד באותו יום. דחוף? חייגו <span dir="ltr">054-543-7526</span>.
            </p>
            <button type="button" onClick={reset} style={{ marginTop: '8px', minHeight: '44px', padding: '0 20px', borderRadius: '999px', border: '1.5px solid #DDD1BE', background: '#FFFFFF', color: '#2E2A27', font: 'inherit', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}>
              שליחה נוספת
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
