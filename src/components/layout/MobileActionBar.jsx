import { site } from '../../data/site.js'
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'

// רצועת פעולה תחתונה, נייד בלבד: טלפון ווואטסאפ במשקל שווה
export default function MobileActionBar() {
  const btn = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48, borderRadius: 999, fontWeight: 800, fontSize: 16, textDecoration: 'none' }
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden" style={{ background: 'rgba(46, 42, 39, 0.96)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 10 }}>
        <a href={`tel:${site.phone.dial}`} onClick={() => trackContact('phone', { source: 'mobile_bar' })}
          style={{ ...btn, background: 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)', color: '#2E2A27' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
          חייגו אלינו
        </a>
        <a href={buildWaLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp', { source: 'mobile_bar' })}
          style={{ ...btn, background: 'transparent', color: '#F2EADE', boxShadow: 'inset 0 0 0 1.5px rgba(242, 234, 222, 0.6)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z" /></svg>
          וואטסאפ
        </a>
      </div>
    </div>
  )
}
