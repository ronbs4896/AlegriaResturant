// ds-normalized
import Seo from '../components/seo/Seo.jsx'
import { PageHero, Prose } from '../components/brand/Kit.jsx'
import { usePageMotion } from '../lib/motion.js'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'

export default function Accessibility() {
  const root = usePageMotion()
  const seo = getSeo('/accessibility')
  return (
    <div ref={root} dir="rtl" style={{ background: '#FFFFFF', color: '#2E2A27' }}>
      <Seo title={seo.title} description={seo.description} path="/accessibility" />
      <PageHero crumb="הצהרת נגישות" title="הצהרת נגישות" />
      <Prose>
            <p>
              אתר קייטרינג אלגריה שואף לאפשר גלישה נוחה ונגישה לכלל המשתמשים, לרבות אנשים עם מוגבלויות,
              בהתאם לתקן הישראלי (ת"י 5568) ולהנחיות <span dir="ltr">WCAG 2.1</span> ברמה AA.
            </p>
            <h2>מה עשינו כדי להנגיש את האתר</h2>
            <ul>
              <li>מבנה סמנטי תקין וניווט מלא באמצעות מקלדת.</li>
              <li>ניגודיות צבעים מספקת בין טקסט לרקע.</li>
              <li>טקסט חלופי (alt) לתמונות בעלות משמעות.</li>
              <li>סימון פוקוס ברור לכל הרכיבים האינטראקטיביים.</li>
              <li>כיבוד העדפת המשתמש להפחתת אנימציות (reduced motion).</li>
              <li>תמיכה מלאה בכיווניות מימין לשמאל (RTL).</li>
            </ul>
            <h2>פנייה בנושא נגישות</h2>
            <p>
              נתקלתם בבעיית נגישות? נשמח לדעת ולתקן. פנו אלינו:
              <br />
              טלפון: <a href={`tel:${site.phone.dial}`} dir="ltr">{site.phone.display}</a>
              <br />
              אימייל: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p style={{ fontSize: "var(--fs-body-sm)", lineHeight: '1.7' }}>הצהרה זו עודכנה לאחרונה בחודש יולי 2026.</p>
</Prose>
    </div>
  )
}
