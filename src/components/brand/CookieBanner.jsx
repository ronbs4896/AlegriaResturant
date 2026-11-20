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
      <PhCookie size={22} weight="duotone" color="#B4511E" aria-hidden="true" className="cookie-ic" />
      <p className="cookie-txt">
        האתר משתמש בעוגיות למדידה ופרסום.{' '}
        <Link to="/cookies">מדיניות עוגיות</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn cookie-ok" onClick={() => choose('all')}>אישור</button>
        <button type="button" className="cookie-btn" onClick={() => choose('essential')}>רק הכרחיות</button>
      </div>
    </div>
  )
}
