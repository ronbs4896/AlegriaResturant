// שאלות נפוצות, לפי נושא, עם סכמת FAQ לגוגל
// ds-normalized
import { useState } from 'react'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { usePageMotion } from '../lib/motion.js'
import { faq, faqCategories } from '../data/faq.js'
import { faqSchema } from '../data/structuredData.js'
import { PageHero, CtaBand, PAD, INK } from '../components/brand/Kit.jsx'
import { CaretDown as PhCaretDown } from '@phosphor-icons/react'

export default function Faq() {
  const root = usePageMotion()
  const seo = getSeo('/faq')
  const [cat, setCat] = useState(faqCategories[0].key)
  return (
    <div ref={root} dir="rtl" data-page="Faq" style={{ background: '#FFFFFF', color: INK }}>
      <Seo title={seo.title} description={seo.description} path="/faq" jsonLd={faqSchema(faq)} />
      <PageHero crumb="שאלות נפוצות" title="מה שואלים אותנו הכי הרבה" intro="לא מצאתם תשובה? התקשרו, עדיף לשאול לפני שמזמינים." />
      <section aria-label="שאלות ותשובות" style={{ padding: `8px ${PAD} 96px` }}>
        <div style={{ width: '100%', maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div role="group" aria-label="נושא" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {faqCategories.map((c) => {
              const sel = c.key === cat
              return (
                <button key={c.key} type="button" aria-pressed={sel} onClick={() => setCat(c.key)}
                  style={{ minHeight: 44, padding: '0 18px', borderRadius: 999, border: `1.5px solid ${sel ? '#B4511E' : '#FDEBD3'}`, background: sel ? 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)' : '#FFFFFF', color: INK, font: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  {c.label}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faq.filter((f) => f.cat === cat).map((f) => (
              <details key={f.q} className="faq-item" data-a="faq" style={{ background: '#FFFFFF', border: '1px solid #FDEBD3', borderRadius: 18, padding: '0 22px' }}>
                <summary style={{ minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: 18, fontWeight: 700 }}>
                  {f.q}
                  <PhCaretDown size={18} weight="regular" style={{ flexShrink: 0 }} aria-hidden="true" />
                </summary>
                <p style={{ margin: '0 0 20px', fontSize: "var(--fs-body)", lineHeight: '1.7' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  )
}
