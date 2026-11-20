import SiteHeader from '../brand/SiteHeader.jsx'
import SiteFooter from '../brand/SiteFooter.jsx'
import CookieBanner from '../brand/CookieBanner.jsx'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#FFFFFF' }}>
      <a href="#main" className="skip-link">דילוג לתוכן</a>
      <SiteHeader />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </div>
  )
}
