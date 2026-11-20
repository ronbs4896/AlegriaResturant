import SiteHeader from '../brand/SiteHeader.jsx'
import SiteFooter from '../brand/SiteFooter.jsx'
import MobileActionBar from './MobileActionBar.jsx'
import CookieBanner from '../brand/CookieBanner.jsx'

export default function Layout({ children }) {
  return (
    // pb במובייל: מקום לרצועת הפעולה התחתונה כדי שלא תכסה את הפוטר
    <div className="flex min-h-screen flex-col pb-[4.5rem] sm:pb-0" style={{ background: '#FFFFFF' }}>
      <a href="#main" className="skip-link">דילוג לתוכן</a>
      <SiteHeader />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
      <MobileActionBar />
      <CookieBanner />
    </div>
  )
}
