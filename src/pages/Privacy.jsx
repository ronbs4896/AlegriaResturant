import Seo from '../components/seo/Seo.jsx'
import { PageHero, Prose } from '../components/brand/Kit.jsx'
import { usePageMotion } from '../lib/motion.js'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'

export default function Privacy() {
  const root = usePageMotion()
  const seo = getSeo('/privacy')
  return (
    <div ref={root} dir="rtl" style={{ background: '#FFFFFF', color: '#2E2A27' }}>
      <Seo title={seo.title} description={seo.description} path="/privacy" />
      <PageHero crumb="מדיניות פרטיות" title="מדיניות פרטיות" />
      <Prose>
            <p>
              קייטרינג אלגריה מכבדת את פרטיות המשתמשים באתר. מסמך זה מסביר איזה מידע נאסף וכיצד נעשה בו שימוש.
            </p>
            <h2>איזה מידע אנחנו אוספים</h2>
            <p>
              כאשר אתם פונים אלינו דרך האתר (טופס או וואטסאפ), אתם מוסרים פרטים כגון שם,
              טלפון ועיר. הפרטים נשלחים אלינו במייל ומשמשים אך ורק ליצירת קשר ומתן שירות.
            </p>
            <h2>שימוש בכלי מדידה</h2>
            <p>
              האתר עושה שימוש בכלי מדידה ופרסום, כמו הפיקסל של Meta, ועשוי להשתמש גם ב-Google Analytics, כדי להבין איך משתמשים באתר ולשפר אותו.
              כלים אלה עשויים להשתמש בעוגיות. ניתן לחסום עוגיות דרך הגדרות הדפדפן.
            </p>
            <h2>אבטחת מידע</h2>
            <p>אנו נוקטים באמצעים סבירים לשמירה על המידע שנמסר לנו ולא מעבירים אותו לצדדים שלישיים ללא צורך.</p>
            <h2>יצירת קשר</h2>
            <p>
              בכל שאלה בנושא פרטיות ניתן לפנות אלינו במייל <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <p style={{ fontSize: 14 }}>מדיניות זו עודכנה לאחרונה בחודש יולי 2026.</p>
</Prose>
    </div>
  )
}
