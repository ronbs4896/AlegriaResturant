// Generated from the approved canvas design (Ref-Home.html, עיצוב הרפרנס המקורי). הקופי של העמוד נמצא כאן.
// ds-normalized
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import ClientLogos from '../components/brand/ClientLogos.jsx'
import WaButton from '../components/brand/WaButton.jsx'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import FactoryQuote from '../components/brand/FactoryQuote.jsx'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { ArrowLeft as PhArrowLeft, ArrowRight as PhArrowRight, CallBell as PhCallBell, Check as PhCheck, Clock as PhClock, CookingPot as PhCookingPot, Factory as PhFactory, FileText as PhFileText, ForkKnife as PhForkKnife, Medal as PhMedal, Path as PhPath, Phone as PhPhone, Truck as PhTruck, UsersThree as PhUsersThree } from '@phosphor-icons/react'

export default function Home({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("הסעדה למפעלים (דף הבית)")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#FFFFFF", color: "#2E2A27", fontFamily: "'Straight', 'Heebo', system-ui, sans-serif", fontWeight: "300" }} data-page="Home">
      {" "}
      {" "}
      <section id="top" data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "600px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 92%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/hero.jpg" data-a="hero-img" alt="טאג׳ין כתום עם תבשיל בקר, חומוס וקוסקוס" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.78) 0%, rgba(20, 17, 15, 0.55) 45%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", margin: "0", padding: "64px clamp(24px, 5vw, 80px) 110px", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px" }}>
            <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "20px", color: "#FFFFFF" }}>
              <h1 id="h1" style={{ margin: "0", fontSize: "var(--fs-h1)", lineHeight: "1.08", fontWeight: "700", letterSpacing: "-0.01em" }}>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                  <span data-a="hero-line" style={{ display: "block" }}>
                    {"הסעדה יומית"}
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                  <span data-a="hero-line" style={{ display: "block" }}>
                    {"למפעלים וחברות"}
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                  <span data-a="hero-line" style={{ display: "block" }}>
                    {"בכל הדרום."}
                  </span>
                </span>
              </h1>
              <p data-a="hero-fade" style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "rgba(255, 255, 255, 0.9)" }}>
                {"ארוחה חמה לפני כל הפסקה, מבושלת ביד באותו בוקר במטבח הבשרי והכשר שלנו בקרית גת. מעל 3,000 ארוחות ביום, בתפזורת לחדר האוכל או בחמגשיות אישיות."}
              </p>
              <div data-a="hero-fade">
                <a className="ds-btn" href="#contact" style={{ minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                  {"אני רוצה הצעת מחיר"}
                </a>
              </div>
            </div>
            <div data-a="hero-fade" className="hero-arrows" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", alignSelf: "stretch", justifyContent: "center" }}>
              <button type="button" aria-label="התמונה הקודמת" style={{ width: "44px", height: "44px", border: "0", background: "transparent", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhArrowRight size={26} weight="duotone" aria-hidden="true" />
              </button>
              <button type="button" aria-label="התמונה הבאה" style={{ width: "44px", height: "44px", border: "0", background: "transparent", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhArrowLeft size={26} weight="duotone" aria-hidden="true" />
              </button>
              <span style={{ width: "1px", height: "70px", borderInlineStart: "1px dashed rgba(255, 255, 255, 0.6)" }} />
              <span style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />
              </span>
            </div>
          </div>
        </div>
      </section>
      {" "}
      {" "}
      <section aria-labelledby="s2" style={{ padding: "72px clamp(24px, 5vw, 80px) 96px" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s2" data-a="words" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"יש"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"לכם"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"200"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"עובדים,"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"ושעה"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"אחת"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"להפסקה."}
              </span>
            </span>
          </h2>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PhForkKnife size={18} weight="regular" aria-hidden="true" />
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
          </div>
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "56px" }}>
            <div style={{ flex: "1 1 420px", position: "relative", minHeight: "400px", maxWidth: "520px" }}>
              {" "}
              <img src="/images/site/factory.jpg" data-a="col1" alt="מגש צהריים עם שניצל, אורז ושעועית ירוקה" style={{ position: "absolute", top: "0", insetInlineStart: "0", width: "56%", aspectRatio: "1 / 0.9", objectFit: "cover", borderRadius: "80px 18px 80px 80px", border: "8px solid #FFFFFF", boxSizing: "border-box", zIndex: "2" }} />
              {" "}
              <img src="/images/site/spread.jpg" data-a="col2" alt="עוף עם חומוס, סלטים בקערות ולחם" style={{ position: "absolute", top: "16px", insetInlineEnd: "0", width: "56%", height: "380px", objectFit: "cover", borderRadius: "22px 22px 70px 22px" }} />
              {" "}
              <span data-a="badge" style={{ position: "absolute", bottom: "30px", insetInlineEnd: "44%", width: "92px", height: "92px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #B4511E", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "3" }}>
                <b style={{ fontSize: "20px", lineHeight: "1", color: "#2E2A27" }}>
                  {"כשר"}
                </b>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#B4511E", lineHeight: "1.2", marginTop: "4px" }}>
                  {"רבנות"}
                  <br />
                  {"קרית גת"}
                </span>
              </span>
              {" "}
            </div>
            <div data-a="fade" style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "22px" }}>
              <p style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540" }}>
                {"כשההפסקה של 200 עובדים תלויה במשאית אחת, כל איחור הופך לתלונה שמגיעה אליכם. לכן אצלנו הסירים עולים על האש ביום האספקה עצמו, והמשאיות יוצאות מקרית גת בבוקר של יום האספקה. העובדים בוחרים מנה באפליקציה של אלגריה, ואנחנו מבשלים בדיוק לפי ההזמנות. 16 מתוך 17 המפעלים שלנו איתנו יותר משנתיים, והשבעה עשר עזב רק כי נסגר."}
              </p>
              <a className="ds-btn" href="#services" style={{ minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"מה אנחנו מבשלים"}
              </a>
            </div>
          </div>
        </div>
      </section>
      {" "}
      <ClientLogos />
      <section id="services" aria-labelledby="s3" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", background: "#FFF5E8", position: "relative", padding: "80px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box" }}>
          {" "}
          <img src="/images/site/tagine_beef_couscous.jpg" data-a="spin" alt="" style={{ position: "absolute", top: "-54px", insetInlineEnd: "7%", width: "170px", height: "170px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.35)", border: "6px solid #FFFFFF" }} />
          {" "}
          <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 id="s3" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
              {"ספק אחד,"}
              <br />
              {"ארבעה שירותי הסעדה לעסק שלכם."}
            </h2>
            <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540", maxWidth: "460px" }}>
              {"מטבח אחד בשרי וכשר, שמבשל כל בוקר למפעלים, לאירועים ולשולחנות שבת."}
            </p>
            <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
                <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
                <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
              </span>
              <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhForkKnife size={18} weight="regular" aria-hidden="true" />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
                <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
              </span>
            </div>
            <div style={{ marginTop: "30px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "22px" }}>
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <PhTruck size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"הסעדה יומית למפעלים"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"ארוחה חמה כל יום לפני ההפסקה, בתפזורת או בחמגשיות אישיות. העובדים מזמינים באפליקציה."}
                </p>
                <Link to="/factories" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "700", color: "#B4511E" }}>
                  {"לפרטים"}
                </Link>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <PhUsersThree size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"ארוחות מסובסדות לעובדים"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"המעסיק משתתף, העובד משלם מחיר מוזל, ואפשר לשלם גם בסיבוס."}
                </p>
                <Link to="/services/subsidized-meals" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "700", color: "#B4511E" }}>
                  {"לפרטים"}
                </Link>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <PhCallBell size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"אירועי חברה וימי גיבוש"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"עד 500 משתתפים. מבשלים באותו בוקר, והאוכל מגיע אליכם חם ומוכן להגשה."}
                </p>
                <Link to="/services/corporate-events" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "700", color: "#B4511E" }}>
                  {"לפרטים"}
                </Link>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <PhCookingPot size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"מכירת שישי"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"האוכל של שבת לפי משקל, בלי מינימום. מזמינים בטלפון עד רביעי, משלוח חינם מעל 250 ₪."}
                </p>
                <Link to="/friday" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "700", color: "#B4511E" }}>
                  {"לפרטים"}
                </Link>
              </div>{" "}
            </div>
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section aria-labelledby="s4" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s4" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
            {"מהשיחה הראשונה ועד הצלצול"}
          </h2>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PhForkKnife size={18} weight="regular" aria-hidden="true" />
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
          </div>
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px" }}>
            <ol data-a="steps" style={{ flex: "1 1 440px", listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ width: "50px", height: "50px", flexShrink: "0", borderRadius: "50%", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"01"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "18px" }}>
                    {"מספרים לנו על המפעל"}
                  </b>
                  <span style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#4A4540" }}>
                    {"כמה עובדים, באילו משמרות, ואיך אוכלים היום: חדר אוכל או חמגשיות. שיחה קצרה בטלפון."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "74px", marginInlineEnd: "110px", border: "1px solid #F0C99A", borderTop: "0", borderInlineEnd: "0", borderRadius: "0 0 18px 0" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexDirection: "row-reverse", textAlign: "left" }}>
                <span dir="ltr" style={{ width: "50px", height: "50px", flexShrink: "0", borderRadius: "50%", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"02"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px", alignItems: "flex-end" }}>
                  <b style={{ fontSize: "18px" }}>
                    {"הצעה וחוזה"}
                  </b>
                  <span style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#4A4540" }}>
                    {"מחיר למנה ומינימום מנות ליום, כתוב וסגור, לרוב עוד באותו יום. בלי סעיפים שמופיעים רק בחשבונית."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "110px", marginInlineEnd: "74px", border: "1px solid #F0C99A", borderTop: "0", borderInlineStart: "0", borderRadius: "0 0 0 18px" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ width: "50px", height: "50px", flexShrink: "0", borderRadius: "50%", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"03"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "18px" }}>
                    {"העובדים מזמינים באפליקציה"}
                  </b>
                  <span style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#4A4540" }}>
                    {"כל עובד בוחר מנה, אנחנו מבשלים לפי ההזמנות, והאוכל מגיע לפני ההפסקה. ואיש קשר אחד עם טלפון ישיר."}
                  </span>
                </span>
              </li>
            </ol>
            <img src="/images/site/matbucha.jpg" data-a="reveal" alt="בשר עם חומוס, מטבוחה ולחם על שולחן עץ" style={{ flex: "1 1 400px", maxWidth: "470px", width: "100%", aspectRatio: "1 / 1.2", objectFit: "cover", borderRadius: "22px", display: "block" }} />
          </div>
        </div>
      </section>
      {" "}
      <section id="kitchen" aria-labelledby="s5" style={{ padding: "0 clamp(24px, 5vw, 80px) 96px" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "56px" }}>
          <div style={{ flex: "0 1 380px", position: "relative", margin: "0 auto" }}>
            {" "}
            <span data-a="archbg" aria-hidden="true" style={{ position: "absolute", bottom: "-18px", insetInlineEnd: "-18px", width: "70%", height: "70%", borderRadius: "22px", background: "#FFF5E8" }} />
            {" "}
            <img src="/images/site/tagine_blue.jpg" data-a="arch" alt="טאג׳ין טורקיז עם בקר, ירקות וקוסקוס" style={{ position: "relative", display: "block", width: "100%", aspectRatio: "1 / 1.15", objectFit: "cover", borderRadius: "190px 190px 22px 22px" }} />
            {" "}
          </div>
          <div style={{ flex: "1 1 460px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <h2 id="s5" data-a="words" style={{ margin: "0", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"מה"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"קורה"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"כשהמפעל"}
                </span>
              </span>
              <br />
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"גדל"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"ב-100"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"עובדים?"}
                </span>
              </span>
            </h2>
            <p style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540" }}>
              {"מוסיפים אותם באפליקציה, והמטבח מבשל יותר כבר למחרת. מפעל של 40 עובדים ומפעל של 400 מקבלים את אותם סירים באותו בוקר, כי המטבח שלנו מבשל מעל 3,000 ארוחות ביום."}
            </p>
            <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px", fontSize: "16px" }}>
              {" "}<li data-a="point" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ width: "22px", height: "22px", flexShrink: "0", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhCheck size={12} weight="bold" aria-hidden="true" />
                </span>
                {"מטבח מרכזי שמבשל מעל 3,000 ארוחות ביום"}
              </li>{" "}
              {" "}<li data-a="point" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ width: "22px", height: "22px", flexShrink: "0", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhCheck size={12} weight="bold" aria-hidden="true" />
                </span>
                {"תפזורת או חמגשיות, לפי מה שמתאים למפעל"}
              </li>{" "}
              {" "}<li data-a="point" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ width: "22px", height: "22px", flexShrink: "0", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhCheck size={12} weight="bold" aria-hidden="true" />
                </span>
                {"איש קשר אחד שמכיר את המפעל שלכם"}
              </li>{" "}
            </ul>
            <a className="ds-btn" href="#contact" style={{ minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
              {"אני רוצה לשמוע איך זה ייראה אצלנו"}
            </a>
          </div>
        </div>
      </section>
      {" "}
      <section id="map" aria-labelledby="map-h" style={{ padding: "96px clamp(24px, 5vw, 80px)", maxWidth: "1308px", width: "100%" }}>
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "56px" }}>
          <div style={{ flex: "1 1 420px", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <span className="ds-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#B4511E", background: "#FDEBD3", borderRadius: "999px", padding: "6px 14px" }}>
              <PhPath size={18} weight="regular" aria-hidden="true" />
              {"אזור החלוקה שלנו"}
            </span>
            <h2 id="map-h" data-a="words" style={{ margin: "0", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"מקרית"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"גת"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"לכל"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"הדרום,"}
                </span>
              </span>
              <br />
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"בכל"}
                </span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span data-w="" style={{ display: "inline-block" }}>
                  {"בוקר."}
                </span>
              </span>
            </h2>
            <p data-a="title" style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540" }}>
              {"המשאיות יוצאות מהמטבח בקרית גת בבוקר של יום האספקה, ומגיעות לחדרי האוכל לפני ההפסקה. מפעל במקום אחר בדרום? נבדוק את המסלול."}
            </p>
            <ul style={{ listStyle: "none", margin: "4px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#FFF5E8", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhCookingPot size={24} weight="regular" aria-hidden="true" />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"מבושל באותו בוקר"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#4A4540" }}>
                    {"הסירים עולים על האש ביום האספקה עצמו"}
                  </span>
                </span>
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#FFF5E8", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhTruck size={24} weight="regular" aria-hidden="true" />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"מסלולי חלוקה קבועים"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#4A4540" }}>
                    {"כל מפעל מקבל שעת הגעה קבועה"}
                  </span>
                </span>
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#FFF5E8", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhClock size={24} weight="regular" aria-hidden="true" />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"לפני ההפסקה"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#4A4540" }}>
                    {"בתפזורת או בחמגשיות אישיות"}
                  </span>
                </span>
              </li>
            </ul>
            <ul aria-label="ערים באזור החלוקה" style={{ listStyle: "none", margin: "6px 0 0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px" }} />
          </div>
          <div data-a="map" style={{ flex: "1 1 420px", maxWidth: "560px", background: "#FFF5E8", borderRadius: "32px", padding: "16px", boxSizing: "border-box" }}>
            {" "}
            <svg viewBox="0 0 409 450" role="img" aria-label="מפת חלוקה של הדרום: מהמטבח בקרית גת לאשדוד, קרית מלאכי, אשקלון, שדרות, נתיבות, אופקים ובאר שבע" style={{ display: "block", width: "100%", height: "auto", borderRadius: "22px", fontFamily: "inherit" }}>
              <defs>
                <pattern id="landDots" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.1" fill="#F0C99A" />
                </pattern>
                <clipPath id="hubClip">
                  <circle cx="265.9" cy="174.0" r="16.5" />
                </clipPath>
              </defs>
              <rect data-a="sea" width="409" height="450" fill="#DCE7EA" />
              <path d="M-0.5 412.7L5 429.9L25.2 480L-30 480L-30 402.5L-26.3 351.9L-13.4 374.2L-9.7 384.3L-0.5 412.7Z" fill="#ECE8E1" stroke="#D8D2C7" strokeWidth="1" />
              <path d="M119.1 189.8L133.8 202.9L143 215.1L143 228.3L126.5 243.5L124.6 243.5L117.3 248.5L60.2 304.3L49.2 325.5L49.2 335.7L52.8 355.9L51 366.1L34.4 386.3L6.8 405.6L-0.5 412.7L-9.7 384.3L-13.4 374.2L-26.3 351.9L-13.4 343.8L-6.1 334.7L16 314.4L27.1 295.1L51 276.9L60.2 258.7L98.9 219.2L117.3 192.8L119.1 189.8ZM439 -30L439 322.5L404.4 322.5L373.1 326.6L360.2 330.6L345.5 332.6L332.6 330.6L321.6 322.5L316.1 302.2L323.4 282L345.5 243.5L349.2 224.2L349.2 207L351 190.8L360.2 174.6L360.2 172.6L369.4 161.4L411.8 131L428.4 112.8L437.6 104.7L439 100.6L439 48.9L413.6 36.8L406.3 34.8L402.6 37.8L393.4 46.9L389.7 50L386 51L376.8 51L360.2 47.9L354.7 37.8L356.6 35.8L360.2 27.7L373.1 22.6L387.9 14.5L380.5 -5.8L371.3 -29.1L373.1 -30L439 -30Z" fill="#ECE8E1" stroke="#D8D2C7" strokeWidth="1" />
              <path d="M-0.5 412.7L6.8 405.6L34.4 386.3L51 366.1L52.8 355.9L49.2 335.7L49.2 325.5L60.2 304.3L117.3 248.5L124.6 243.5L126.5 243.5L143 228.3L143 215.1L133.8 202.9L119.1 189.8L122.8 179.6L135.7 163.4L179.9 85.4L183.5 80.4L213 15.5L225.9 -15.9L236.9 -30L373.1 -30L371.3 -29.1L380.5 -5.8L387.9 14.5L373.1 22.6L360.2 27.7L356.6 35.8L354.7 37.8L360.2 47.9L376.8 51L386 51L389.7 50L393.4 46.9L402.6 37.8L406.3 34.8L413.6 36.8L439 48.9L439 100.6L437.6 104.7L428.4 112.8L411.8 131L369.4 161.4L360.2 172.6L360.2 174.6L351 190.8L349.2 207L349.2 224.2L345.5 243.5L323.4 282L316.1 302.2L321.6 322.5L332.6 330.6L345.5 332.6L360.2 330.6L373.1 326.6L404.4 322.5L439 322.5L439 480L25.2 480L5 429.9L-0.5 412.7Z" fill="#FFFFFF" stroke="#F0C99A" strokeWidth="1.2" />
              <path d="M-0.5 412.7L6.8 405.6L34.4 386.3L51 366.1L52.8 355.9L49.2 335.7L49.2 325.5L60.2 304.3L117.3 248.5L124.6 243.5L126.5 243.5L143 228.3L143 215.1L133.8 202.9L119.1 189.8L122.8 179.6L135.7 163.4L179.9 85.4L183.5 80.4L213 15.5L225.9 -15.9L236.9 -30L373.1 -30L371.3 -29.1L380.5 -5.8L387.9 14.5L373.1 22.6L360.2 27.7L356.6 35.8L354.7 37.8L360.2 47.9L376.8 51L386 51L389.7 50L393.4 46.9L402.6 37.8L406.3 34.8L413.6 36.8L439 48.9L439 100.6L437.6 104.7L428.4 112.8L411.8 131L369.4 161.4L360.2 172.6L360.2 174.6L351 190.8L349.2 207L349.2 224.2L345.5 243.5L323.4 282L316.1 302.2L321.6 322.5L332.6 330.6L345.5 332.6L360.2 330.6L373.1 326.6L404.4 322.5L439 322.5L439 480L25.2 480L5 429.9L-0.5 412.7Z" fill="url(#landDots)" opacity="0.8" />
              <text data-a="sea" x="70" y="96" direction="rtl" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7F9AA1" letterSpacing="1" transform="rotate(-58 70 96)">
                {"הים התיכון"}
              </text>
              <path data-a="route" d="M265.9 174.0 Q251.2 108.4 204.5 60.0" stroke="#B4511E" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q250.7 139.4 255.7 102.0" stroke="#B4511E" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q219.8 141.7 163.6 138.0" stroke="#B4511E" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q230.0 213.2 179.0 228.0" stroke="#B4511E" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q203.9 218.1 173.8 288.0" stroke="#B4511E" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q252.7 274.7 189.2 354.0" stroke="#B4511E" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q240.8 283.4 276.1 390.0" stroke="#B4511E" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <g data-a="city">
                <circle cx="204.5" cy="60.0" r="8.5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2" />
                <circle cx="204.5" cy="60.0" r="3.5" fill="#B4511E" />
              </g>
              <g data-a="city">
                <circle cx="255.7" cy="102.0" r="8.5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2" />
                <circle cx="255.7" cy="102.0" r="3.5" fill="#B4511E" />
              </g>
              <g data-a="city">
                <circle cx="163.6" cy="138.0" r="8.5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2" />
                <circle cx="163.6" cy="138.0" r="3.5" fill="#B4511E" />
              </g>
              <g data-a="city">
                <circle cx="179.0" cy="228.0" r="8.5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2" />
                <circle cx="179.0" cy="228.0" r="3.5" fill="#B4511E" />
              </g>
              <g data-a="city">
                <circle cx="173.8" cy="288.0" r="8.5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2" />
                <circle cx="173.8" cy="288.0" r="3.5" fill="#B4511E" />
              </g>
              <g data-a="city">
                <circle cx="189.2" cy="354.0" r="8.5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2" />
                <circle cx="189.2" cy="354.0" r="3.5" fill="#B4511E" />
              </g>
              <g data-a="city">
                <circle cx="276.1" cy="390.0" r="8.5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2" />
                <circle cx="276.1" cy="390.0" r="3.5" fill="#B4511E" />
              </g>
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.6" opacity="0" />
              <g data-a="hub">
                <circle data-a="hub-ring" cx="265.9" cy="174.0" r="15" fill="none" stroke="#B4511E" strokeWidth="2" />
                <circle cx="265.9" cy="174.0" r="19" fill="#FFFFFF" stroke="#B4511E" strokeWidth="2.5" />
                <image href="/images/site/mark.jpg" x="249.4" y="157.5" width="33" height="33" preserveAspectRatio="xMidYMid slice" clipPath="url(#hubClip)" />
              </g>
              <text data-a="city-label" x="191.5" y="64.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#2E2A27" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"אשדוד"}
              </text>
              <text data-a="city-label" x="268.7" y="106.5" direction="rtl" textAnchor="end" fontSize="13.5" fontWeight="800" fill="#2E2A27" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"קרית מלאכי"}
              </text>
              <text data-a="city-label" x="150.6" y="142.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#2E2A27" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"אשקלון"}
              </text>
              <text data-a="city-label" x="166.0" y="232.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#2E2A27" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"שדרות"}
              </text>
              <text data-a="city-label" x="160.8" y="292.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#2E2A27" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"נתיבות"}
              </text>
              <text data-a="city-label" x="176.2" y="358.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#2E2A27" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"אופקים"}
              </text>
              <text data-a="city-label" x="289.1" y="394.5" direction="rtl" textAnchor="end" fontSize="13.5" fontWeight="800" fill="#2E2A27" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"באר שבע"}
              </text>
              <text data-a="city-label" x="291.9" y="172.0" direction="rtl" textAnchor="end" fontSize="16" fontWeight="900" fill="#B4511E" stroke="#FFFFFF" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round">
                {"קרית גת"}
              </text>
              <text data-a="city-label" x="291.9" y="189.0" direction="rtl" textAnchor="end" fontSize="11.5" fontWeight="700" fill="#5A544E" stroke="#FFFFFF" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"המטבח שלנו"}
              </text>
              <g aria-hidden="true">
                <path d="M331.1 428v5h53.9v-5" stroke="#5A544E" strokeWidth="1.4" fill="none" />
                <text x="358.1" y="423" direction="rtl" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#5A544E">
                  {"10 ק״מ"}
                </text>
              </g>
            </svg>
            {" "}
          </div>
        </div>
      </section>
      {" "}
      <section aria-label="אלגריה במספרים" style={{ padding: "0", borderRadius: "25px" }}>
        <div style={{ width: "100%", margin: "0", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", padding: "60px clamp(24px, 5vw, 80px)", boxSizing: "border-box" }}>
          {" "}
          <div style={{ width: "100%", margin: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", textAlign: "center" }}>
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhMedal size={30} weight="duotone" aria-hidden="true" />
              </span>
              <span dir="ltr" data-count="25" data-suf="+" style={{ fontSize: "var(--fs-display)", fontWeight: "700", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"25+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"שנות ניסיון"}
              </span>
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhCookingPot size={30} weight="duotone" aria-hidden="true" />
              </span>
              <span dir="ltr" data-count="3000" data-suf="+" style={{ fontSize: "var(--fs-display)", fontWeight: "700", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"3,000+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"ארוחות ביום"}
              </span>
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhFactory size={30} weight="duotone" aria-hidden="true" />
              </span>
              <span dir="ltr" data-count="97" data-suf="%" style={{ fontSize: "var(--fs-display)", fontWeight: "700", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"97%"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"מהסועדים מרוצים, בסקר של 250 סועדים"}
              </span>
            </div>{" "}
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section id="about" aria-labelledby="s6" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s6" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
            {"מהמטבח שלנו בקרית גת"}
          </h2>
          <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540", maxWidth: "520px" }}>
            {"בישול מרוקאי ביתי, ביד, מהמתכונים של אלגריה."}
          </p>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PhForkKnife size={18} weight="regular" aria-hidden="true" />
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
          </div>
          <div style={{ width: "100%", marginTop: "26px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "16px" }}>
            {" "}<img src="/images/site/tagine_orange.jpg" data-a="gal" alt="טאג׳ין כתום עם קוסקוס" style={{ display: "block", width: "100%", aspectRatio: "1 / 1.2", objectFit: "cover", borderRadius: "100px 100px 16px 16px" }} />{" "}
            {" "}<img src="/images/site/couscous.jpg" data-a="gal" alt="קוסקוס עם ירקות" style={{ display: "block", width: "100%", aspectRatio: "1 / 1.2", objectFit: "cover", borderRadius: "16px" }} />{" "}
            {" "}<img src="/images/site/event.jpg" data-a="gal" alt="דג בגלייז עם אורז" style={{ display: "block", width: "100%", aspectRatio: "1 / 1.2", objectFit: "cover", borderRadius: "100px 100px 16px 16px" }} />{" "}
            {" "}<img src="/images/site/tagine_white.jpg" data-a="gal" alt="טאג׳ין לבן עם בקר ואורז" style={{ display: "block", width: "100%", aspectRatio: "1 / 1.2", objectFit: "cover", borderRadius: "16px" }} />{" "}
            {" "}<img src="/images/site/friday.jpg" data-a="gal" alt="עוף בזיתים עם חלות" style={{ display: "block", width: "100%", aspectRatio: "1 / 1.2", objectFit: "cover", borderRadius: "100px 100px 16px 16px" }} />{" "}
          </div>
        </div>
      </section>
      {" "}
      {" "}
      <section aria-labelledby="blog-h" style={{ padding: "96px clamp(24px, 5vw, 80px) 40px" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <h2 id="blog-h" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
            {"מהבלוג"}
          </h2>
          <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540", maxWidth: "620px" }}>
            {"מדריכים קצרים מהמטבח, למנהלי רכש ולמי שמתכנן אירוע."}
          </p>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PhForkKnife size={18} weight="regular" aria-hidden="true" />
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
          </div>
          <div style={{ marginTop: "24px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <article data-a="card" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Link to="/blog/how-much-food-per-guest-event-catering" style={{ display: "block" }}>
                <img src="/images/site/spread.jpg" alt="עוף עם חומוס, סלטים בקערות ולחם" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "18px 18px 0 0" }} />
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: "1" }}>
                <span className="ds-badge" style={{ alignSelf: "flex-start", fontSize: "13px", fontWeight: "700", color: "#B4511E", background: "#FDEBD3", borderRadius: "999px", padding: "5px 12px" }}>
                  {"אירועים"}
                </span>
                <h3 style={{ margin: "0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  <Link to="/blog/how-much-food-per-guest-event-catering" style={{ color: "#2E2A27", textDecoration: "none" }}>
                    {"כמה אוכל להזמין לאירוע? מדריך כמויות למנה לאדם"}
                  </Link>
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"כמה סלטים, עיקריות ותוספות לכל אורח, איך מחשבים ילדים, וכמה רזרבה להוסיף בלי לזרוק אוכל."}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", fontSize: "14px", color: "#4A4540" }}>
                    <span>
                      {"עמית בן שושן"}
                    </span>
                    <span dir="ltr">
                      {"14.07.2026"}
                    </span>
                    <span>
                      {"6 דק׳ קריאה"}
                    </span>
                  </span>
                </div>
              </div>
            </article>
            <article data-a="card" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Link to="/blog/industrial-catering-guide" style={{ display: "block" }}>
                <img src="/images/site/factory.jpg" alt="מגש צהריים עם שניצל, אורז ושעועית ירוקה" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "18px 18px 0 0" }} />
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: "1" }}>
                <span className="ds-badge" style={{ alignSelf: "flex-start", fontSize: "13px", fontWeight: "700", color: "#B4511E", background: "#FDEBD3", borderRadius: "999px", padding: "5px 12px" }}>
                  {"הסעדה למפעלים"}
                </span>
                <h3 style={{ margin: "0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  <Link to="/blog/industrial-catering-guide" style={{ color: "#2E2A27", textDecoration: "none" }}>
                    {"הסעדה למפעלים: מה לבדוק לפני שחותמים על חוזה"}
                  </Link>
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"תמחור לעובד, זמני אספקה, שמירת טמפרטורה והתאמות תזונתיות. מדריך מעשי למנהלי רכש בדרום."}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", fontSize: "14px", color: "#4A4540" }}>
                    <span>
                      {"עמית בן שושן"}
                    </span>
                    <span dir="ltr">
                      {"24.07.2026"}
                    </span>
                    <span>
                      {"5 דק׳ קריאה"}
                    </span>
                  </span>
                </div>
              </div>
            </article>
            <article data-a="card" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Link to="/blog/business-catering-south-israel" style={{ display: "block" }}>
                <img src="/images/site/tagine_white.jpg" alt="טאג׳ין לבן עם תבשיל בקר ואורז" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "18px 18px 0 0" }} />
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: "1" }}>
                <span className="ds-badge" style={{ alignSelf: "flex-start", fontSize: "13px", fontWeight: "700", color: "#B4511E", background: "#FDEBD3", borderRadius: "999px", padding: "5px 12px" }}>
                  {"הסעדה למפעלים"}
                </span>
                <h3 style={{ margin: "0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  <Link to="/blog/business-catering-south-israel" style={{ color: "#2E2A27", textDecoration: "none" }}>
                    {"הסעדה למפעלים בדרום: ארוחה חמה בכל יום עבודה"}
                  </Link>
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"מדרגות כמות, שמירת חום ותפריט יומי מתחלף, מניסיון של יותר מ-25 שנה במטבח."}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", fontSize: "14px", color: "#4A4540" }}>
                    <span>
                      {"עמית בן שושן"}
                    </span>
                    <span dir="ltr">
                      {"24.07.2026"}
                    </span>
                    <span>
                      {"5 דק׳ קריאה"}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          </div>
          <Link className="ds-btn" to="/blog" style={{ minHeight: "52px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 26px", borderRadius: "999px", border: "1.5px solid #B4511E", color: "#B4511E", fontSize: "16px", fontWeight: "700", textDecoration: "none", marginTop: "12px" }}>
            {"לכל המאמרים"}
          </Link>
        </div>
      </section>
      {" "}
      <section id="contact" aria-labelledby="s7" style={{ padding: "96px clamp(24px, 5vw, 80px)", background: "#FFF5E8" }}>
        <div data-a="panel" style={{ width: "100%", margin: "0", borderRadius: "26px", padding: "0", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 id="s7" data-a="title" style={{ margin: "0", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
              {"בואו נדבר על המפעל שלכם"}
            </h2>
            <p style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540" }}>
              {"כמה פרטים, ותקבלו הצעה כתובה עם מחיר למנה ומינימום יומי, לרוב עוד באותו יום."}
            </p>
            <a href="tel:+972545437526" dir="ltr" style={{ textAlign: "right", fontSize: "30px", fontWeight: "700", color: "#2E2A27", textDecoration: "none" }}>
              {"054-543-7526"}
            </a>
            <WaButton topic="הסעדה למפעל" style={{ alignSelf: "flex-start" }} />
            <ul style={{ listStyle: "none", margin: "8px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhFileText size={20} weight="regular" aria-hidden="true" />
                </span>
                {"מחיר למנה ומינימום יומי, בכתב"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhTruck size={20} weight="regular" aria-hidden="true" />
                </span>
                {"תפזורת או חמגשיות אישיות"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhPhone size={20} weight="regular" aria-hidden="true" />
                </span>
                {"איש קשר אחד עם טלפון ישיר"}
              </li>
            </ul>
          </div>
          <FactoryQuote formOpen={formOpen} sent={sent} idle={idle} sending={sending} send={send} reset={reset} source="הסעדה למפעלים (דף הבית)" />
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}
