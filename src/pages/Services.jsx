// עמוד השירותים: כרטיסי קשת לכל שירות, כמו בעמוד הבית
import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { usePageMotion } from '../lib/motion.js'
import { SERVICES } from '../components/brand/SiteHeader.jsx'
import { PageHero, CtaBand, PAD, INK } from '../components/brand/Kit.jsx'

export default function Services() {
  const root = usePageMotion()
  const seo = getSeo('/services')
  const list = SERVICES.filter((s) => !s.to.includes('#'))
  return (
    <div ref={root} dir="rtl" data-page="Services" style={{ background: '#FFFFFF', color: INK }}>
      <Seo title={seo.title} description={seo.description} path="/services" />
      <PageHero crumb="השירותים שלנו" title="מטבח אחד, כל סוגי ההסעדה" intro="מטבח בשרי כשר בקרית גת שמבשל כל בוקר. בחרו את השירות שמתאים לכם, ונמשיך משם." />
      <section aria-label="השירותים" style={{ padding: `24px ${PAD} 96px` }}>
        <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
          {list.map((s) => (
            <Link key={s.to} to={s.to} data-a="card" style={{ background: '#FFFFFF', borderRadius: '120px 120px 14px 14px', padding: '44px 22px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', minHeight: 290, boxSizing: 'border-box', textDecoration: 'none', color: INK }}>
              <span style={{ width: 72, height: 72, borderRadius: '50%', background: '#FFF5E8', color: '#B4511E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
              </span>
              <span style={{ fontSize: 20, lineHeight: 1.3, fontWeight: 900 }}>{s.title}</span>
              <span style={{ fontSize: 15, lineHeight: 1.7 }}>{s.text}</span>
              <span style={{ marginTop: 'auto', fontSize: 15, fontWeight: 800, textDecoration: 'underline', textUnderlineOffset: 4 }}>לפרטים</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </div>
  )
}
