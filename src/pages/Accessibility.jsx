// הצהרת נגישות: לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013, ות"י 5568
import { Link } from 'react-router-dom'
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
      <PageHero crumb="הצהרת נגישות" title="הצהרת נגישות" intro="אנחנו רוצים שכל אחד יוכל להשתמש באתר בנוחות, גם אנשים עם מוגבלות." />
      <Prose>
        <h2>רמת הנגישות</h2>
        <p>
          האתר הונגש לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013, ולפי התקן הישראלי ת&quot;י 5568,
          שמבוסס על הנחיות <span dir="ltr">WCAG</span> של ארגון W3C, ברמה AA. האתר מותאם לדפדפנים הנפוצים, במחשב ובנייד.
        </p>

        <h2>מה עשינו באתר</h2>
        <ul>
          <li>ניווט מלא במקלדת: Tab עובר לרכיב הבא, Enter מפעיל, וכל רכיב שנבחר מסומן במסגרת ברורה.</li>
          <li>קישור &quot;דילוג לתוכן&quot; בתחילת כל עמוד, שמוביל ישר לתוכן הראשי.</li>
          <li>מבנה כותרות היררכי ותגיות שמאפשרים קריאה תקינה בתוכנות הקראת מסך.</li>
          <li>טקסט חלופי לתמונות שיש להן משמעות, ותמונות קישוט מוסתרות מתוכנות הקראה.</li>
          <li>ניגודיות צבעים מספקת בין טקסט לרקע, וגודל טקסט רץ של 16 פיקסלים לפחות.</li>
          <li>האתר מתאים את עצמו לכל גודל מסך, ותומך בהגדלת התצוגה בדפדפן.</li>
          <li>שדות בטפסים מסומנים בתוויות, והודעות שגיאה מוצגות ליד השדה הרלוונטי.</li>
          <li>מי שמגדיר במכשיר &quot;הפחתת תנועה&quot; יקבל את האתר בלי אנימציות.</li>
          <li>תמיכה מלאה בכיוון כתיבה מימין לשמאל.</li>
        </ul>

        <h2>מה עוד לא מושלם</h2>
        <p>
          ייתכן שחלק מהתכנים לא הונגשו במלואם, למשל תוכן שמגיע משירותים חיצוניים כמו וואטסאפ, או מסמכים שמצורפים לבקשה.
          אם נתקלתם בכזה, ספרו לנו ונדאג לתת לכם את המידע בדרך נגישה.
        </p>

        <h2>שירות נגיש בטלפון ובוואטסאפ</h2>
        <p>
          כל השירותים באתר זמינים גם בשיחה עם נציג, בטלפון <a href={`tel:${site.phone.dial}`} dir="ltr">{site.phone.display}</a> או בוואטסאפ,
          בימים ראשון עד חמישי בין <span dir="ltr">08:00–16:00</span> ובשישי בין <span dir="ltr">07:00–14:00</span>.
        </p>

        <h2>פנייה בנושא נגישות</h2>
        <p>נתקלתם בבעיית נגישות באתר, או צריכים התאמה? נשמח לשמוע ולתקן. כדי שנוכל לטפל מהר, ספרו לנו באיזה עמוד הייתה הבעיה ומה ניסיתם לעשות.</p>
        <ul>
          <li>טלפון: <a href={`tel:${site.phone.dial}`} dir="ltr">{site.phone.display}</a></li>
          <li>אימייל: <a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li>כתובת: {site.address.street}, {site.address.city}</li>
        </ul>
        <p>
          מידע נוסף על השימוש באתר נמצא ב<Link to="/terms">תקנון האתר</Link>.
        </p>
        <p style={{ fontSize: 'var(--fs-body-sm)', lineHeight: '1.7' }}>הצהרה זו עודכנה לאחרונה: {site.policiesUpdated}.</p>
      </Prose>
    </div>
  )
}
