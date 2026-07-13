import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'

export default function Accessibility() {
  const seo = getSeo('/accessibility')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/accessibility" />
      <PageHeader eyebrow="נגישות" title="הצהרת נגישות" />
      <section className="bg-cream py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="prose prose-lg max-w-none text-charcoal-soft prose-headings:font-black prose-headings:text-charcoal prose-strong:text-charcoal">
            <p>
              אתר קייטרינג אלגריה שואף לאפשר גלישה נוחה ונגישה לכלל המשתמשים, לרבות אנשים עם מוגבלויות,
              בהתאם לתקן הישראלי (ת"י 5568) ולהנחיות <span dir="ltr" className="num">WCAG 2.1</span> ברמה AA.
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
              טלפון: <a href={`tel:${site.phone.dial}`} dir="ltr" className="num">{site.phone.display}</a>
              <br />
              אימייל: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="text-sm">הצהרה זו עודכנה לאחרונה בחודש יולי 2026.</p>
          </div>
        </Container>
      </section>
    </>
  )
}
