// Generated from the approved canvas design (Ref-Factories.html). הקופי של העמוד נמצא כאן.
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import FactoryQuote from '../components/brand/FactoryQuote.jsx'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function Factories({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("הסעדה יומית למפעלים")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#FFFFFF", color: "#2E2A27", fontFamily: "'Birzia', 'Heebo', system-ui, sans-serif", fontWeight: "500" }} data-page="Factories">
      {" "}
      {" "}
      <section data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "480px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/factory.jpg" data-a="hero-img" alt="מגש צהריים עם שניצל, אורז ושעועית ירוקה" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.82) 0%, rgba(20, 17, 15, 0.58) 50%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", padding: "56px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
              <Link to="/" style={{ color: "#FFFFFF" }}>
                {"בית"}
              </Link>
              {" / הסעדה יומית למפעלים"}
            </nav>
            <h1 id="h1" style={{ margin: "0", fontSize: "clamp(2.3rem, 4.2vw, 3.5rem)", lineHeight: "1.12", fontWeight: "900", maxWidth: "760px" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"הצלצול להפסקה,"}
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"והאוכל כבר בחדר האוכל"}
                </span>
              </span>
            </h1>
            <p data-a="hero-fade" style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "rgba(255, 255, 255, 0.9)", maxWidth: "600px" }}>
              {"מטבח בשרי כשר בקרית גת שמבשל כל בוקר מעל 3,000 ארוחות חמות לעשרות מפעלים בדרום. בתפזורת לחדר האוכל או בחמגשיות אישיות, לפי איך שהמפעל שלכם עובד."}
            </p>
            <div data-a="hero-fade" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"אני רוצה הצעת מחיר למפעל"}
              </a>
              <a href="tel:+972545437526" dir="ltr" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", padding: "0 22px", borderRadius: "999px", border: "1.5px solid rgba(255, 255, 255, 0.8)", color: "#FFFFFF", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"054-543-7526"}
              </a>
            </div>
          </div>
        </div>
      </section>
      {" "}
      {" "}
      <section aria-labelledby="s2" style={{ padding: "72px clamp(24px, 5vw, 80px) 96px" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s2" data-a="words" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#B4511E" }}>
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"מנהל"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"רכש"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"שמע"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"את"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"זה"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"כבר:"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"\"מחר"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"זה"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"יגיע"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"בזמן\"."}
              </span>
            </span>
          </h2>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
          </div>
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "64px" }}>
            <div style={{ flex: "1 1 420px", position: "relative", minHeight: "420px", maxWidth: "560px" }}>
              {" "}
              <img src="/images/site/spread.jpg" data-a="col1" alt="עוף עם חומוס, סלטים בקערות ולחם" style={{ position: "absolute", top: "0", insetInlineStart: "0", width: "56%", aspectRatio: "1 / 0.92", objectFit: "cover", borderRadius: "80px 18px 80px 80px", border: "8px solid #FFFFFF", boxSizing: "border-box", zIndex: "2", background: "#F2EADE" }} />
              {" "}
              <img src="/images/site/tagine_white.jpg" data-a="col2" alt="טאג׳ין לבן עם תבשיל בקר ואורז" style={{ position: "absolute", top: "16px", insetInlineEnd: "0", width: "56%", height: "400px", objectFit: "cover", borderRadius: "22px 22px 70px 22px" }} />
              {" "}
              <span data-a="badge" style={{ position: "absolute", bottom: "26px", insetInlineEnd: "44%", width: "100px", height: "100px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #B4511E", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "3", padding: "6px", boxSizing: "border-box" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#B4511E", lineHeight: "1.2" }}>
                  {"מפעלים וחברות"}
                </span>
                <b dir="auto" style={{ fontSize: "18px", lineHeight: "1.15" }}>
                  {"40+"}
                </b>
              </span>
              {" "}
            </div>
            <div data-a="fade" style={{ flex: "1 1 420px", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px" }}>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#5A544E" }}>
                {"כשההפסקה של 200 עובדים תלויה במשאית אחת, כל איחור הופך לתלונה שמגיעה אליכם ולא למטבח. בדיוק בגלל זה הסירים שלנו עולים על האש ביום האספקה עצמו, והמשאיות יוצאות מקרית גת בבוקר של יום האספקה."}
              </p>
              <a href="#start" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"איך זה עובד אצל מפעל"}
              </a>
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s3" style={{ padding: "54px 0 0" }}>
        <div id="values" style={{ width: "100%", margin: "0", background: "#FFF5E8", position: "relative", padding: "80px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box" }}>
          {" "}
          <img src="/images/site/tagine_beef_couscous.jpg" data-a="spin" alt="" style={{ position: "absolute", top: "-54px", insetInlineEnd: "7%", width: "170px", height: "170px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.35)", border: "6px solid #FFFFFF" }} />
          {" "}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 id="s3" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#B4511E" }}>
              {"מה מפעל מקבל"}
              <br />
              {"ביום רגיל של אספקה."}
            </h2>
            <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "16px", lineHeight: "1.75", color: "#5A544E", maxWidth: "620px" }}>
              {"אותו דבר בשבוע הראשון ובשנה החמישית."}
            </p>
            <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
                <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
                <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
              </span>
              <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
                <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
              </span>
            </div>
            <div style={{ marginTop: "30px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "22px" }}>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 30V14h22v16M28 20h8l6 6v4H28M13 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM35 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 34h14" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"תפזורת או חמגשיות"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"חדר אוכל עם הגשה, או חמגשית אישית לכל עובד. מחליטים לפי המפעל, לא לפי מה שנוח לנו."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"העובדים מזמינים באפליקציה"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"כל עובד בוחר מנה באפליקציה של אלגריה, והמטבח מבשל לפי ההזמנות. פחות עודפים, פחות \"מה יש היום\"."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 6h22l6 6v30H10zM32 6v6h6M16 20h16M16 26h16M16 32h10" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"תפריט שמתחלף כל יום"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"עובד שאוכל אצלכם כל יום לא פוגש את אותו מגש פעמיים באותו שבוע."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"בשרי, כשר, חם"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"מטבח בשרי בהשגחת הרבנות הראשית קרית גת, ושרשרת חום מבוקרת עד דלת חדר האוכל."}
                </p>
              </div>
            </div>
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section aria-labelledby="start" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="start" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#B4511E" }}>
            {"מהשיחה הראשונה ועד הצלצול"}
          </h2>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
          </div>
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "64px" }}>
            <ol data-a="steps" style={{ flex: "1 1 460px", maxWidth: "720px", listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"01"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"מספרים לנו על המפעל"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"כמה עובדים, באילו משמרות, ואיך אוכלים היום: חדר אוכל או חמגשיות. שיחה קצרה בטלפון."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "74px", marginInlineEnd: "110px", border: "1px solid #F0C99A", borderTop: "0", borderInlineEnd: "0", borderRadius: "0 0 18px 0" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexDirection: "row-reverse", textAlign: "left" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"02"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px", alignItems: "flex-end" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"הצעה וחוזה"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"מחיר למנה ומינימום מנות, כתוב וסגור. בלי סעיפים שמופיעים רק בחשבונית."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "110px", marginInlineEnd: "74px", border: "1px solid #F0C99A", borderTop: "0", borderInlineStart: "0", borderRadius: "0 0 0 18px" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"03"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"שבוע ראשון"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"מתחילים לספק, אוספים משוב מהעובדים ומתקנים מה שצריך כבר באותו שבוע."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "74px", marginInlineEnd: "110px", border: "1px solid #F0C99A", borderTop: "0", borderInlineEnd: "0", borderRadius: "0 0 18px 0" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexDirection: "row-reverse", textAlign: "left" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"04"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px", alignItems: "flex-end" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"שגרה דרך האפליקציה"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"העובדים מזמינים, אנחנו מבשלים לפי ההזמנות, והאוכל מגיע לפני ההפסקה."}
                  </span>
                </span>
              </li>
            </ol>
            <img src="/images/site/matbucha.jpg" data-a="reveal" alt="בשר עם חומוס, מטבוחה ולחם" style={{ flex: "1 1 400px", maxWidth: "520px", width: "100%", aspectRatio: "1 / 1.15", objectFit: "cover", borderRadius: "22px", display: "block" }} />
          </div>
        </div>
      </section>
      {" "}
      {" "}
      <section id="map" aria-labelledby="map-h" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "56px" }}>
          <div style={{ flex: "1 1 420px", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "800", color: "#B4511E", background: "#FDEBD3", borderRadius: "999px", padding: "6px 14px" }}>
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 40a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM38 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM14 36h14a6 6 0 0 0 0-12H20a6 6 0 0 1 0-12h14" />
              </svg>
              {"אזור החלוקה שלנו"}
            </span>
            <h2 id="map-h" data-a="words" style={{ margin: "0", fontSize: "clamp(2rem, 3.4vw, 2.8rem)", lineHeight: "1.15", fontWeight: "900", color: "#B4511E" }}>
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
            <p data-a="title" style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#5A544E" }}>
              {"המשאיות יוצאות מהמטבח בקרית גת בבוקר של יום האספקה, ומגיעות לחדרי האוכל לפני ההפסקה. מפעל במקום אחר בדרום? נבדוק את המסלול."}
            </p>
            <ul style={{ listStyle: "none", margin: "4px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#FFF5E8", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"מבושל באותו בוקר"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#5A544E" }}>
                    {"הסירים עולים על האש ביום האספקה עצמו"}
                  </span>
                </span>
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#FFF5E8", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 30V12h24v18M28 18h9l7 7v5H28M12 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM36 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 34h16" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"מסלולי חלוקה קבועים"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#5A544E" }}>
                    {"כל מפעל מקבל שעת הגעה קבועה"}
                  </span>
                </span>
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#FFF5E8", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M24 42a18 18 0 1 0 0-36 18 18 0 0 0 0 36zM24 14v10l7 5" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"לפני ההפסקה"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#5A544E" }}>
                    {"בתפזורת או בחמגשיות אישיות"}
                  </span>
                </span>
              </li>
            </ul>
            <ul aria-label="ערים באזור החלוקה" style={{ listStyle: "none", margin: "6px 0 0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <li data-a="city-chip" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3", fontSize: "15px", fontWeight: "700" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)" }} />
                {"אשדוד"}
              </li>
              <li data-a="city-chip" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3", fontSize: "15px", fontWeight: "700" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)" }} />
                {"קרית מלאכי"}
              </li>
              <li data-a="city-chip" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3", fontSize: "15px", fontWeight: "700" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)" }} />
                {"אשקלון"}
              </li>
              <li data-a="city-chip" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3", fontSize: "15px", fontWeight: "700" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)" }} />
                {"שדרות"}
              </li>
              <li data-a="city-chip" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3", fontSize: "15px", fontWeight: "700" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)" }} />
                {"נתיבות"}
              </li>
              <li data-a="city-chip" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3", fontSize: "15px", fontWeight: "700" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)" }} />
                {"אופקים"}
              </li>
              <li data-a="city-chip" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3", fontSize: "15px", fontWeight: "700" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)" }} />
                {"באר שבע"}
              </li>
            </ul>
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
      <section aria-label="אלגריה במספרים" style={{ padding: "0" }}>
        <div style={{ width: "100%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", padding: "60px clamp(24px, 5vw, 80px)", boxSizing: "border-box" }}>
          {" "}
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", textAlign: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 30a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM24 12l2 4.5 4.8.5-3.6 3.2 1 4.8L24 22.6 19.8 25l1-4.8-3.6-3.2 4.8-.5zM16 28l-3 15 11-6 11 6-3-15" />
                </svg>
              </span>
              <span dir="ltr" data-count="25" data-suf="+" style={{ fontSize: "48px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"25+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"שנות ניסיון"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                </svg>
              </span>
              <span dir="ltr" data-count="3000" data-suf="+" style={{ fontSize: "48px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"3,000+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"ארוחות ביום"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 42V20l10 6v-6l10 6V12l16 8v22zM6 42h36M14 34h4M24 34h4M34 34h4" />
                </svg>
              </span>
              <span dir="ltr" data-count="40" data-suf="+" style={{ fontSize: "48px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"40+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"חברות ומפעלים מרוצים"}
              </span>
            </div>
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section aria-labelledby="s6" style={{ padding: "96px clamp(24px, 5vw, 80px)", background: "#FFF5E8" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s6" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#B4511E" }}>
            {"מה מנהלי רכש שואלים אותנו"}
          </h2>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#F0C99A" }} />
              <span style={{ width: "56px", height: "1px", background: "#F0C99A" }} />
            </span>
          </div>
          <div style={{ marginTop: "24px", width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"איך העובדים מזמינים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"באפליקציה של אלגריה. כל עובד בוחר מנה מהתפריט היומי, והמטבח מבשל לפי ההזמנות שנכנסו."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"תפזורת או חמגשיות אישיות?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"תלוי איך המפעל עובד. חדר אוכל עם הגשה מקבל תפזורת, ובמפעל בלי חדר אוכל כל עובד מקבל חמגשית אישית."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"יש מינימום הזמנה?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"כן. העבודה היא לפי חוזה עם מינימום מנות ליום, ואת המינימום סוגרים כבר בהצעת המחיר."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"אתם מספקים גם חלבי?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"לא. המטבח שלנו בשרי בלבד, בהשגחת הרבנות הראשית קרית גת."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"אתם עובדים בחגים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"בחלק מהחגים כן, לפי הביקוש. את לוח החגים מתאמים מראש מול כל מפעל."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"לאילו אזורים אתם מספקים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"קרית גת, אשקלון, אשדוד, באר שבע, שדרות, נתיבות, אופקים והיישובים שביניהן. מפעל במקום אחר בדרום? נבדוק את המסלול."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"כמה זה עולה?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"תלוי בכמות המנות, בצורת החלוקה ובהרכב התפריט. שולחים את מספר העובדים ומקבלים הצעה כתובה, לרוב עוד באותו יום."}
              </p>
              {" "}
            </details>
          </div>
        </div>
      </section>
      {" "}
      <section id="contact" aria-labelledby="cta-h" style={{ padding: "96px clamp(24px, 5vw, 80px)", background: "#FFF5E8" }}>
        <div data-a="panel" style={{ width: "100%", borderRadius: "26px", padding: "0", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
          <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 id="cta-h" style={{ margin: "0", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#B4511E" }}>
              {"הצעת מחיר למפעל"}
            </h2>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.8", color: "#5A544E", maxWidth: "480px" }}>
              {"כמה פרטים, ותקבלו הצעה כתובה עם מחיר למנה ומינימום יומי, לרוב עוד באותו יום."}
            </p>
            <a href="tel:+972545437526" dir="ltr" style={{ textAlign: "right", fontSize: "30px", fontWeight: "900", color: "#2E2A27", textDecoration: "none" }}>
              {"054-543-7526"}
            </a>
            <span style={{ fontSize: "14px", color: "#5A544E" }}>
              {"ראשון עד חמישי "}
              <span dir="ltr">
                {"08:00–16:00"}
              </span>
              {", שישי "}
              <span dir="ltr">
                {"07:00–14:00"}
              </span>
            </span>
            <ul style={{ listStyle: "none", margin: "8px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4h18l8 8v32H12zM30 4v8h8M18 24h12M18 30h12M18 36h8" />
                  </svg>
                </span>
                {"מחיר למנה ומינימום יומי, בכתב"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 30V12h24v18M28 18h9l7 7v5H28M12 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM36 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 34h16" />
                  </svg>
                </span>
                {"תפזורת או חמגשיות אישיות"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
                  </svg>
                </span>
                {"איש קשר אחד עם טלפון ישיר"}
              </li>
            </ul>
          </div>
          <FactoryQuote formOpen={formOpen} sent={sent} idle={idle} sending={sending} send={send} reset={reset} source="הסעדה יומית למפעלים" />
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}
