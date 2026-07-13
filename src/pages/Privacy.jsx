import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'

export default function Privacy() {
  const seo = getSeo('/privacy')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/privacy" />
      <PageHeader eyebrow="פרטיות" title="מדיניות פרטיות" />
      <section className="bg-cream py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="prose prose-lg max-w-none text-charcoal-soft prose-headings:font-black prose-headings:text-charcoal prose-strong:text-charcoal">
            <p>
              מסעדת אלגריה מכבדת את פרטיות המשתמשים באתר. מסמך זה מסביר איזה מידע נאסף וכיצד נעשה בו שימוש.
            </p>
            <h2>איזה מידע אנחנו אוספים</h2>
            <p>
              כאשר אתם פונים אלינו דרך האתר (טופס הצעת מחיר או וואטסאפ), אתם מוסרים פרטים כגון שם,
              טלפון ועיר. פרטים אלה משמשים אך ורק ליצירת קשר ומתן שירות.
            </p>
            <h2>שימוש בכלי מדידה</h2>
            <p>
              האתר עשוי לעשות שימוש בכלי אנליטיקס (כגון Google Analytics) לצורך שיפור חוויית המשתמש.
              כלים אלה עשויים להשתמש בעוגיות. ניתן לחסום עוגיות דרך הגדרות הדפדפן.
            </p>
            <h2>אבטחת מידע</h2>
            <p>אנו נוקטים באמצעים סבירים לשמירה על המידע שנמסר לנו ולא מעבירים אותו לצדדים שלישיים ללא צורך.</p>
            <h2>יצירת קשר</h2>
            <p>
              בכל שאלה בנושא פרטיות ניתן לפנות אלינו במייל <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <p className="text-sm">מדיניות זו עודכנה לאחרונה בחודש יולי 2026.</p>
          </div>
        </Container>
      </section>
    </>
  )
}
