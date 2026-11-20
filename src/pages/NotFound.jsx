import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { btnPrimary, btnSecondary, PAD, INK } from '../components/brand/Kit.jsx'

export default function NotFound() {
  return (
    <div dir="rtl" style={{ background: '#FFFFFF', color: INK }}>
      <Helmet>
        <title>הדף לא נמצא · קייטרינג אלגריה</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: `80px ${PAD}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, maxWidth: 520 }}>
          <b dir="ltr" style={{ fontSize: 96, lineHeight: 1, fontWeight: 900, background: 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>404</b>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#B4511E' }}>הדף הזה לא נמצא</h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7 }}>אולי הקישור השתנה. אפשר לחזור לדף הבית או לדבר איתנו.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            <Link to="/" style={btnPrimary}>לדף הבית</Link>
            <Link to="/contact" style={btnSecondary}>צור קשר</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
