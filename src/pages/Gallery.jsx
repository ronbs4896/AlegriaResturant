// גלריה: תמונות אמיתיות מהמטבח, בחיתוכי המותג (קשת ופינות 24)
import { useState } from 'react'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { usePageMotion } from '../lib/motion.js'
import { gallery, galleryCategories } from '../data/gallery.js'
import { PageHero, CtaBand, PAD, INK } from '../components/brand/Kit.jsx'

export default function Gallery() {
  const root = usePageMotion()
  const seo = getSeo('/gallery')
  const [cat, setCat] = useState('all')
  return (
    <div ref={root} dir="rtl" data-page="Gallery" style={{ background: '#F2EADE', color: INK }}>
      <Seo title={seo.title} description={seo.description} path="/gallery" />
      <PageHero crumb="גלריה" title="ככה זה נראה כשזה יוצא מהסיר" intro="מנות, מגשים ואירועים, הכל מהמטבח שלנו בקרית גת." />
      <section aria-label="תמונות" style={{ padding: `8px ${PAD} 96px` }}>
        <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div role="group" aria-label="סינון תמונות" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {galleryCategories.map((c) => {
              const sel = c.key === cat
              return (
                <button key={c.key} type="button" aria-pressed={sel} onClick={() => setCat(c.key)}
                  style={{ minHeight: 44, padding: '0 18px', borderRadius: 999, border: `1.5px solid ${sel ? INK : '#DDD1BE'}`, background: sel ? INK : '#FFFFFF', color: sel ? '#F2EADE' : INK, font: 'inherit', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                  {c.label}
                </button>
              )
            })}
          </div>
          <div style={{ columns: '3 260px', columnGap: 18 }}>
            {gallery.filter((g) => cat === 'all' || g.cat === cat).map((g, i) => (
              <figure key={g.src} data-a="gal" style={{ margin: '0 0 18px', breakInside: 'avoid' }}>
                <img src={g.src} alt={g.alt} loading="lazy" width={g.w} height={g.h}
                  style={{ display: 'block', width: '100%', height: 'auto', borderRadius: i % 3 === 0 ? '160px 160px 20px 20px' : 20 }} />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="רוצים את זה אצלכם?" />
    </div>
  )
}
