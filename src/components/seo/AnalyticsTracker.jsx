import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageview } from '../../lib/analytics.js'

// מאתחל אנליטיקס פעם אחת ומדווח pageview בכל ניווט.
export default function AnalyticsTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageview(pathname)
  }, [pathname])

  return null
}
