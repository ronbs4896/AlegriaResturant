import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ============================================================
//  מעבר עמוד → לראש העמוד. קישור עם עוגן (/factories#contact)
//  → אל העוגן. העמודים נטענים בעצלתיים, ולכן היעד עשוי להופיע
//  רק כמה פריימים אחרי הניווט: מחפשים אותו עד שנייה בערך.
// ============================================================
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let raf
    const seek = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
      if (tries++ < 60) raf = requestAnimationFrame(seek)
    }
    seek()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
