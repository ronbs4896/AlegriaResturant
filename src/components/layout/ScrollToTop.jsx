import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// מעבר עמוד: לראש העמוד, או לעוגן (#contact) אם יש בכתובת
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      let tries = 0
      const go = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else if (tries++ < 20) setTimeout(go, 100)
      }
      go()
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])
  return null
}
