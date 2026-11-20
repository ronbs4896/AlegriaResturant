// הודעת עוגיות: מופיעה פעם אחת, עד שהגולש בוחר. אפשר לפתוח אותה שוב מ"הגדרות עוגיות" בפוטר.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie as PhCookie } from '@phosphor-icons/react'
import { getConsent, setConsent } from '../../lib/consent.js'
import { initAnalytics, revokeAnalytics } from '../../lib/analytics.js'

export default function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!getConsent()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener('alegria-cookie-settings', reopen)
    return () => window.removeEventListener('alegria-cookie-settings', reopen)
  }, [])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    if (value === 'all') initAnalytics()
    else revokeAnalytics()
    setOpen(false)
  }

  return (
    <div role="dialog" aria-live="polite" aria-label="הודעה על שימוש בעוגיות" className="cookie-banner">
      <PhCookie size={32} weight="duotone" color="#B4511E" aria-hidden="true" style={{ flexShrink: 0 }} />
      <p style={{ margin: 0, flex: '1 1 320px', fontSize: 16, lineHeight: 1.6 }}>
        האתר משתמש בעוגיות לצורך מדידה ופרסום, כמו הפיקסל של Meta. אפשר לאשר, או להשאיר רק את מה שהאתר צריך כדי לעבוד.{' '}
        <Link to="/cookies" style={{ color: '#2E2A27', fontWeight: 700 }}>מדיניות עוגיות</Link>
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button type="button" className="ds-btn" onClick={() => choose('all')}
          style={{ minHeight: 44, padding: '0 22px', borderRadius: 999, border: 0, background: 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)', color: '#2E2A27', font: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          אישור
        </button>
        <button type="button" className="ds-btn" onClick={() => choose('essential')}
          style={{ minHeight: 44, padding: '0 20px', borderRadius: 999, border: '1.5px solid #2E2A27', background: '#FFFFFF', color: '#2E2A27', font: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          רק הכרחיות
        </button>
      </div>
    </div>
  )
}
