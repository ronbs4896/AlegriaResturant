import Header from './Header.jsx'
import Footer from './Footer.jsx'
import FloatingWhatsApp from './FloatingWhatsApp.jsx'
import MobileActionBar from './MobileActionBar.jsx'

export default function Layout({ children }) {
  return (
    // המרווח לרצועת הפעולה התחתונה במובייל יושב בתוך הפוטר, כדי
    // שיקבל את הרקע שלו ולא ייראה כפס בצבע אחר מתחתיו.
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* overflow-x: clip — אלמנטים שמחכים לאנימציית כניסה מוזזים הצידה
          (x: -50) ובולטים מעבר למסך; בלי זה אפשר לגרור את העמוד לרוחב
          במובייל. clip ולא hidden: hidden יוצר מיכל גלילה ושובר sticky. */}
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </div>
  )
}
