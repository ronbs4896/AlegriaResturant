import Header from './Header.jsx'
import Footer from './Footer.jsx'
import FloatingWhatsApp from './FloatingWhatsApp.jsx'
import MobileActionBar from './MobileActionBar.jsx'

export default function Layout({ children }) {
  return (
    // pb-20 במובייל — מרחב לרצועת הפעולה התחתונה כדי שלא תכסה את הפוטר
    <div className="flex min-h-screen flex-col pb-[4.5rem] sm:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </div>
  )
}
