// מדיניות עוגיות: מה נשמר בדפדפן, למה, ואיך מבטלים
import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo.jsx'
import { PageHero, Prose } from '../components/brand/Kit.jsx'
import { usePageMotion } from '../lib/motion.js'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'
import { openCookieSettings } from '../lib/consent.js'

const ROWS = [
  ['הכרחיות', 'שמירת הבחירה שלכם בהודעת העוגיות', 'האתר (אחסון מקומי בדפדפן)', 'עד שתמחקו אותה'],
  ['מדידה ופרסום', 'מדידת ביקורים ופניות, והצגת מודעות למי שביקר באתר', 'Meta (הפיקסל של Meta, למשל _fbp)', 'עד 90 יום'],
  ['מדידה ופרסום', 'ניתוח שימוש באתר ומדידת קמפיינים, אם יופעל', 'Google (למשל _ga, _gcl_au)', 'עד שנתיים'],
]

export default function Cookies() {
  const root = usePageMotion()
  const seo = getSeo('/cookies')
  return (
    <div ref={root} dir="rtl" style={{ background: '#FFFFFF', color: '#2E2A27' }}>
      <Seo title={seo.title} description={seo.description} path="/cookies" />
      <PageHero crumb="מדיניות עוגיות" title="מדיניות עוגיות" intro="אילו עוגיות האתר משתמש בהן, למה, ואיך משנים את הבחירה." />
      <Prose>
        <h2>מה זה עוגיות</h2>
        <p>
          עוגיות (Cookies) הן קבצים קטנים שאתר שומר בדפדפן שלכם. הן עוזרות לאתר לזכור בחירות, ולנו להבין איך משתמשים באתר ואילו קמפיינים מביאים פניות.
          באותה משפחה נמצאים גם אחסון מקומי בדפדפן ופיקסלים של מדידה, ובעמוד הזה כולם נקראים עוגיות.
        </p>

        <h2>אילו עוגיות יש באתר</h2>
        <div style={{ overflowX: 'auto', margin: '8px 0 20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 560 }}>
            <thead>
              <tr>
                {['סוג', 'למה', 'של מי', 'כמה זמן'].map((h) => (
                  <th key={h} scope="col" style={{ textAlign: 'start', padding: '12px 14px', background: '#FFF5E8', borderBottom: '1px solid #FDEBD3', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} style={{ textAlign: 'start', padding: '12px 14px', borderBottom: '1px solid #FDEBD3', verticalAlign: 'top' }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>העוגיות ההכרחיות פועלות תמיד. עוגיות המדידה והפרסום פועלות עד שתבחרו &quot;רק הכרחיות&quot;.</p>

        <h2>איך משנים את הבחירה</h2>
        <ul>
          <li>
            באתר:{' '}
            <button type="button" onClick={openCookieSettings} style={{ border: 0, padding: 0, background: 'none', font: 'inherit', color: '#2E2A27', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>
              פתיחת הגדרות העוגיות
            </button>
            , או הקישור &quot;הגדרות עוגיות&quot; בתחתית כל עמוד.
          </li>
          <li>בדפדפן: אפשר לחסום או למחוק עוגיות בהגדרות הפרטיות של הדפדפן. חסימה מלאה עלולה לפגוע בחלק מהפעולות באתר.</li>
          <li>
            ב-Meta: אפשר לנהל את העדפות המודעות בחשבון שלכם, בעמוד{' '}
            <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">העדפות המודעות של Meta</a>.
          </li>
        </ul>

        <h2>ומה עם הפרטים שאתם ממלאים בטפסים?</h2>
        <p>
          זה כבר לא עוגיות. הפירוט נמצא ב<Link to="/privacy">מדיניות הפרטיות</Link>. שאלות? <a href={`tel:${site.phone.dial}`} dir="ltr">{site.phone.display}</a>.
        </p>
        <p style={{ fontSize: 'var(--fs-body-sm)', lineHeight: '1.7' }}>עודכן לאחרונה: {site.policiesUpdated}.</p>
      </Prose>
    </div>
  )
}
