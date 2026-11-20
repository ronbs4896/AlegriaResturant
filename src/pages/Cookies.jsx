// מדיניות עוגיות
import { Link } from 'react-router-dom'
import LegalDoc from '../components/brand/LegalDoc.jsx'
import { site } from '../data/site.js'
import { openCookieSettings } from '../lib/consent.js'

const tel = <a href={`tel:${site.phone.dial}`} dir="ltr">{site.phone.display}</a>
const btn = { border: 0, padding: 0, background: 'none', font: 'inherit', fontWeight: 700, color: '#2E2A27', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }

const ROWS = [
  ['הכרחיות', 'שמירת הבחירה שלכם בהודעת העוגיות', 'המפעילה (אחסון מקומי בדפדפן)', 'עד מחיקה ידנית'],
  ['מדידה ופרסום', 'מדידת ביקורים ופניות, ייחוס קמפיינים והצגת מודעות למי שביקר באתר', 'Meta Platforms (למשל _fbp)', 'עד 90 יום'],
  ['מדידה ופרסום', 'ניתוח שימוש באתר ומדידת קמפיינים, ככל שיופעל', 'Google (למשל _ga, _gcl_au)', 'עד 24 חודשים'],
]

const table = (
  <span style={{ display: 'block', overflowX: 'auto', marginTop: 8 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, minWidth: 560 }}>
      <thead>
        <tr>
          {['סוג', 'מטרה', 'הגורם המציב', 'משך שמירה'].map((h) => (
            <th key={h} scope="col" style={{ textAlign: 'start', padding: '10px 12px', background: '#FFF5E8', borderBottom: '1px solid #FDEBD3', fontWeight: 700 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} style={{ textAlign: 'start', padding: '10px 12px', borderBottom: '1px solid #FDEBD3', verticalAlign: 'top' }}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </span>
)

const SECTIONS = [
  {
    title: 'כללי',
    items: [
      <>מדיניות זו מתארת את השימוש שעושה {site.legalName} (להלן: &quot;המפעילה&quot;) בעוגיות ובטכנולוגיות דומות באתר <span dir="ltr">www.alegriacatering.co.il</span> (להלן: &quot;האתר&quot;), ומהווה חלק בלתי נפרד מ<Link to="/privacy">מדיניות הפרטיות</Link> ומ<Link to="/terms">תקנון האתר</Link>.</>,
      'עוגיות (Cookies) הן קבצי טקסט קטנים הנשמרים בדפדפן או במכשיר בעת הגלישה. לצורך מדיניות זו, המונח "עוגיות" כולל גם טכנולוגיות דומות, כגון אחסון מקומי בדפדפן (Local Storage), פיקסלים ותגיות מדידה.',
    ],
  },
  {
    title: 'סוגי העוגיות באתר',
    items: [
      'עוגיות הכרחיות: נדרשות לתפקוד האתר ולשמירת הבחירות שלכם, ואינן ניתנות לביטול באמצעות הגדרות האתר.',
      'עוגיות מדידה ופרסום: מוצבות על ידי צדדים שלישיים, ומשמשות למדידת השימוש באתר, לייחוס פניות לקמפיינים ולהצגת פרסומות רלוונטיות בפלטפורמות של אותם צדדים.',
      <>פירוט העוגיות המרכזיות:{table}</>,
      'רשימת העוגיות עשויה להשתנות מעת לעת, בהתאם לשינויים באתר ובשירותי הצדדים השלישיים.',
    ],
  },
  {
    title: 'הסכמה וניהול העדפות',
    items: [
      'בכניסה הראשונה לאתר מוצגת הודעה על השימוש בעוגיות, המאפשרת לאשר את כל העוגיות או לבחור "רק הכרחיות". בבחירה ב"רק הכרחיות", עוגיות המדידה והפרסום לא יופעלו.',
      <>ניתן לשנות את הבחירה בכל עת באמצעות <button type="button" onClick={openCookieSettings} style={btn}>הגדרות העוגיות</button>, או הקישור &quot;הגדרות עוגיות&quot; בתחתית כל עמוד.</>,
      'בנוסף, ניתן לחסום או למחוק עוגיות באמצעות הגדרות הדפדפן. חסימה של עוגיות הכרחיות עלולה לפגוע בתפקוד חלק מהאתר.',
      <>ניתן לנהל את העדפות הפרסום ב-Meta בעמוד <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">העדפות המודעות</a>, וב-Google בעמוד <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">הגדרות המודעות</a>.</>,
    ],
  },
  {
    title: 'עוגיות של צדדים שלישיים',
    items: [
      <>המידע הנאסף באמצעות עוגיות של צדדים שלישיים מעובד על ידם בהתאם למדיניות הפרטיות שלהם, ובכלל זה <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות של Meta</a> ו<a href="https://policies.google.com/privacy?hl=iw" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות של Google</a>. המפעילה אינה אחראית לאופן שבו צדדים שלישיים מעבדים מידע זה.</>,
    ],
  },
  {
    title: 'שינויים ויצירת קשר',
    items: [
      'המפעילה רשאית לעדכן את המדיניות מעת לעת. הנוסח המחייב הוא הנוסח המפורסם בעמוד זה.',
      <>בכל שאלה בנושא עוגיות ניתן לפנות אלינו בטלפון {tel} או במייל <a href={`mailto:${site.email}`}>{site.email}</a>.</>,
    ],
  },
]

export default function Cookies() {
  return (
    <LegalDoc
      path="/cookies"
      title="מדיניות עוגיות"
      intro="אילו עוגיות האתר משתמש בהן, למה, ואיך משנים את הבחירה."
      sections={SECTIONS}
    />
  )
}
