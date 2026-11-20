// Generated from the approved canvas design (Ref-Private.html). הקופי של העמוד נמצא כאן.
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import WaButton from '../components/brand/WaButton.jsx'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import DatePicker from '../components/brand/DatePicker.jsx'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function PrivateEvents({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("אירוע פרטי")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#FFFFFF", color: "#2E2A27", fontFamily: "'Birzia', 'Heebo', system-ui, sans-serif", fontWeight: "500" }} data-page="PrivateEvents">
      {" "}
      {" "}
      <section data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "480px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/tagine_white.jpg" data-a="hero-img" alt="טאג׳ין לבן עם תבשיל בקר ואורז" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.82) 0%, rgba(20, 17, 15, 0.58) 50%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", padding: "56px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
              <Link to="/" style={{ color: "#FFFFFF" }}>
                {"בית"}
              </Link>
              {" / אירועים פרטיים"}
            </nav>
            <h1 id="h1" style={{ margin: "0", fontSize: "clamp(2.3rem, 4.2vw, 3.5rem)", lineHeight: "1.12", fontWeight: "900", maxWidth: "760px" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"מברית ועד שבע ברכות,"}
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"אתם עם האורחים, אנחנו במטבח"}
                </span>
              </span>
            </h1>
            <p data-a="hero-fade" style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "rgba(255, 255, 255, 0.9)", maxWidth: "600px" }}>
              {"אותו מטבח שמבשל כל בוקר לעשרות מפעלים, מבשל גם לשמחות שלכם. מ-20 אורחים בסלון ועד 300 באולם."}
            </p>
            <div data-a="hero-fade" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"אני רוצה תפריט לשמחה"}
              </a>
              <a href="tel:+972545437526" dir="ltr" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", padding: "0 22px", borderRadius: "999px", border: "1.5px solid rgba(255, 255, 255, 0.8)", color: "#FFFFFF", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"054-543-7526"}
              </a>
              <WaButton variant="hero" topic="אירוע פרטי" />
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s2" style={{ padding: "72px clamp(24px, 5vw, 80px) 96px" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s2" data-a="words" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"בשמחה,"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"הכי"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"קשה"}
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
                {"להיות"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"גם"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"המארחים"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"וגם"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"המטבח."}
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
              <img src="/images/site/friday.jpg" data-a="col1" alt="עוף בזיתים לשבת עם חלות" style={{ position: "absolute", top: "0", insetInlineStart: "0", width: "56%", aspectRatio: "1 / 0.92", objectFit: "cover", borderRadius: "80px 18px 80px 80px", border: "8px solid #FFFFFF", boxSizing: "border-box", zIndex: "2", background: "#F2EADE" }} />
              {" "}
              <img src="/images/site/tagine_orange.jpg" data-a="col2" alt="טאג׳ין כתום עם קוסקוס" style={{ position: "absolute", top: "16px", insetInlineEnd: "0", width: "56%", height: "400px", objectFit: "cover", borderRadius: "22px 22px 70px 22px" }} />
              {" "}
              <span data-a="badge" style={{ position: "absolute", bottom: "26px", insetInlineEnd: "44%", width: "100px", height: "100px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #B4511E", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "3", padding: "6px", boxSizing: "border-box" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#B4511E", lineHeight: "1.2" }}>
                  {"אירועים של"}
                </span>
                <b dir="auto" style={{ fontSize: "18px", lineHeight: "1.15" }}>
                  {"20 עד 300"}
                </b>
              </span>
              {" "}
            </div>
            <div data-a="fade" style={{ flex: "1 1 420px", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px" }}>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#5A544E" }}>
                {"עוף בזיתים, חריימה, קציצות ותבשילי בשר, לצד תוספות, סלטים קצוצים ומאפים. בונים איתכם תפריט לפי הקהל, כולל כמה ילדים יש ומי לא אוכל חריף."}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#5A544E" }}>
                {"ביום האירוע מבשלים בבוקר, מגיעים עם הכל ומסדרים את השולחנות."}
              </p>
              <a href="#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"אני רוצה הצעה"}
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
            <h2 id="s3" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"השמחות"}
              <br />
              {"שאנחנו מבשלים להן."}
            </h2>
            <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "16px", lineHeight: "1.75", color: "#5A544E", maxWidth: "620px" }}>
              {"תפריט אחר לכל שמחה, אותו מטבח בשרי כשר."}
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
                  <path d="M10 20h28v20H10zM6 14h36v6H6zM24 14v26M24 14c-4-8-12-6-8 0M24 14c4-8 12-6 8 0" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"בריתות"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"אירוע בוקר או צהריים, עם תפריט שמתאים לשעה."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 34h40M8 34a16 16 0 0 1 32 0M24 18v-4M20 14h8M8 40h32" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"בר ובת מצווה"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"מסעודה משפחתית ועד אירוע באולם."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM6 42v-6a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v6M18 30v12M30 30v12" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"שבע ברכות"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"ארוחה חגיגית לערב, בבית או באולם."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"אזכרות"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"אוכל חם ומסודר, בלי שתצטרכו לחשוב על זה."}
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
          <h2 id="start" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"איך מזמינים"}
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
                    {"מספרים על השמחה"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"מה חוגגים, כמה אורחים, איפה ומתי."}
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
                    {"תפריט והצעת מחיר"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"בונים יחד תפריט, ומקבלים הצעה כתובה."}
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
                    {"ביום האירוע"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"מבשלים בבוקר, מגיעים, מסדרים ומגישים."}
                  </span>
                </span>
              </li>
            </ol>
            <img src="/images/site/couscous.jpg" data-a="reveal" alt="קוסקוס עם ירקות בקערת טורקיז" style={{ flex: "1 1 400px", maxWidth: "520px", width: "100%", aspectRatio: "1 / 1.15", objectFit: "cover", borderRadius: "22px", display: "block" }} />
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s5" style={{ padding: "96px clamp(24px, 5vw, 80px)", background: "#FFF5E8" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s5" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"שאלות על אירועים פרטיים"}
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
                {"מה המינימום להזמנה?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"מ-20 אורחים. לאירוח קטן יותר בבית, מכירת השישי שלנו בלי מינימום הזמנה."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"כמה זמן מראש?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"לאירוע קטן מספיקים כמה ימים. לאירוע של מאה אורחים ומעלה, שבועיים."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"איך מחשבים כמויות לילדים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"ילד עד גיל 12 נחשב כחצי מנה. לכן אנחנו שואלים כמה ילדים יהיו."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"האוכל בשרי?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"כן, המטבח שלנו בשרי בלבד ובהשגחת הרבנות הראשית קרית גת."}
              </p>
              {" "}
            </details>
          </div>
        </div>
      </section>
      {" "}
      <section id="contact" aria-labelledby="order-h" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <h2 id="order-h" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"בונים תפריט לשמחה"}
          </h2>
          <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "16px", lineHeight: "1.75", color: "#5A544E", maxWidth: "620px" }}>
            {"ספרו לנו על האירוע, ונחזור אליכם עם הצעת תפריט ומחיר. לאירוע של מאה אורחים ומעלה כדאי לפנות שבועיים מראש."}
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
          {formOpen ? (<>
            
            <form data-a="panel" style={{ marginTop: "30px", width: "100%", maxWidth: "1100px", background: "#FFF9F1", padding: "clamp(32px, 5vw, 64px) clamp(22px, 5vw, 64px) clamp(28px, 4vw, 48px)", boxSizing: "border-box", clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0 100%)", display: "flex", flexDirection: "column", gap: "34px" }} onSubmit={(e) => { e.preventDefault(); send(e) }} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px 24px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"שם מלא"}
                    <span aria-hidden="true" style={{ color: "#B4511E", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <input className="fld" type="text" name="name" required aria-required="true" />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"טלפון"}
                    <span aria-hidden="true" style={{ color: "#B4511E", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <input className="fld" type="tel" name="phone" required aria-required="true" dir="ltr" style={{ textAlign: "right" }} />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px 24px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"מה חוגגים?"}
                    <span aria-hidden="true" style={{ color: "#B4511E", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <select className="fld" name="etype" required aria-required="true">
                    <option value="">
                      {"בחרו"}
                    </option>
                    <option>
                      {"ברית"}
                    </option>
                    <option>
                      {"בר / בת מצווה"}
                    </option>
                    <option>
                      {"שבע ברכות"}
                    </option>
                    <option>
                      {"אזכרה"}
                    </option>
                    <option>
                      {"אירוע משפחתי"}
                    </option>
                    <option>
                      {"אחר"}
                    </option>
                  </select>
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative", zIndex: "5" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"תאריך האירוע"}
                    <span aria-hidden="true" style={{ color: "#B4511E", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <DatePicker name="תאריך האירוע" />
                </div>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"מתי ביום?"}
                  </span>
                  <select className="fld" name="time">
                    <option value="">
                      {"בחרו"}
                    </option>
                    <option>
                      {"בוקר"}
                    </option>
                    <option>
                      {"צהריים"}
                    </option>
                    <option>
                      {"ערב"}
                    </option>
                  </select>
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px 24px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"כמה אורחים בערך?"}
                    <span aria-hidden="true" style={{ color: "#B4511E", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <select className="fld" name="guests" required aria-required="true">
                    <option value="">
                      {"בחרו"}
                    </option>
                    <option>
                      {"20–50"}
                    </option>
                    <option>
                      {"50–100"}
                    </option>
                    <option>
                      {"100–200"}
                    </option>
                    <option>
                      {"200–300"}
                    </option>
                  </select>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"כמה מהאורחים ילדים?"}
                  </span>
                  <select className="fld" name="kids">
                    <option value="">
                      {"בחרו"}
                    </option>
                    <option>
                      {"אין ילדים"}
                    </option>
                    <option>
                      {"עד 10"}
                    </option>
                    <option>
                      {"10–30"}
                    </option>
                    <option>
                      {"יותר מ-30"}
                    </option>
                  </select>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"איפה האירוע?"}
                  </span>
                  <select className="fld" name="venue">
                    <option value="">
                      {"בחרו"}
                    </option>
                    <option>
                      {"בבית"}
                    </option>
                    <option>
                      {"באולם"}
                    </option>
                    <option>
                      {"בבית כנסת"}
                    </option>
                    <option>
                      {"בגן אירועים"}
                    </option>
                    <option>
                      {"אחר"}
                    </option>
                  </select>
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px 24px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"עיר או מקום האירוע"}
                    <span aria-hidden="true" style={{ color: "#B4511E", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <input className="fld" type="text" name="place" placeholder="למשל אולם בקרית גת" required aria-required="true" />
                </label>
              </div>
              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                <legend style={{ padding: "0", marginBottom: "12px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"מה חשוב לכם בתפריט?"}
                  </span>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#5A544E" }}>
                    {"אפשר לבחור כמה."}
                  </span>
                </legend>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                  <label className="opt chk">
                    <input type="checkbox" name="menu" defaultValue="מנות בשר ועוף" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                    </svg>
                    <span>
                      {"מנות בשר ועוף"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="menu" defaultValue="דגים" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M4 34h40M8 34a16 16 0 0 1 32 0M24 18v-4M20 14h8M8 40h32" />
                    </svg>
                    <span>
                      {"דגים"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="menu" defaultValue="מנה צמחונית לפי בקשה" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M10 6h22l6 6v30H10zM32 6v6h6M16 20h16M16 26h16M16 32h10" />
                    </svg>
                    <span>
                      {"מנה צמחונית לפי בקשה"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="menu" defaultValue="ללא גלוטן" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10" />
                    </svg>
                    <span>
                      {"ללא גלוטן"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="menu" defaultValue="מנות לילדים" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M24 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM6 42v-6a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v6M18 30v12M30 30v12" />
                    </svg>
                    <span>
                      {"מנות לילדים"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="menu" defaultValue="מאפים וקינוחים" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M10 20h28v20H10zM6 14h36v6H6zM24 14v26M24 14c-4-8-12-6-8 0M24 14c4-8 12-6 8 0" />
                    </svg>
                    <span>
                      {"מאפים וקינוחים"}
                    </span>
                  </label>
                </div>
              </fieldset>
              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                <legend style={{ padding: "0", marginBottom: "12px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"במה נעזור לכם?"}
                  </span>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#5A544E" }}>
                    {"אפשר לבחור כמה."}
                  </span>
                </legend>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                  <label className="opt chk">
                    <input type="checkbox" name="help" defaultValue="בניית התפריט איתכם" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M8 10h32v22H20l-8 8v-8H8zM16 19h16M16 25h10" />
                    </svg>
                    <span>
                      {"בניית התפריט איתכם"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="help" defaultValue="בישול והובלה" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M6 30V14h22v16M28 20h8l6 6v4H28M13 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM35 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 34h14" />
                    </svg>
                    <span>
                      {"בישול והובלה"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="help" defaultValue="סידור והגשה במקום" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M4 34h40M8 34a16 16 0 0 1 32 0M24 18v-4M20 14h8M8 40h32" />
                    </svg>
                    <span>
                      {"סידור והגשה במקום"}
                    </span>
                  </label>
                </div>
              </fieldset>
              <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                  {"ספרו לנו עוד על האירוע"}
                </span>
                <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#5A544E" }}>
                  {"תקציב משוער, מנות שחייבות להיות, או כל דבר שחשוב לכם."}
                </span>
                <textarea className="fld" name="notes" />
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 24px", paddingTop: "22px", borderTop: "1px solid #FDEBD3" }}>
                <button type="button" onClick={send} style={{ minHeight: "56px", padding: "0 40px", border: "0", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", font: "inherit", fontSize: "17px", fontWeight: "800", display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  {idle ? (<>
                    <span>
                      {"אני רוצה הצעת תפריט"}
                    </span>
                  </>) : null}
                  {sending ? (<>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                      <span className="spin" aria-hidden="true" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(46, 42, 39, 0.3)", borderTopColor: "#2E2A27" }} />
                      {"שולחים"}
                    </span>
                  </>) : null}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <div style={{ marginInlineStart: "auto", maxWidth: "100%", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 20px", background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "18px", paddingBlock: "14px", paddingInline: "22px 14px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <b style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                      {"מעדיפים לדבר?"}
                    </b>
                    <span style={{ fontSize: "14px", lineHeight: "1.5", color: "#5A544E" }}>
                      {"כתבו לעמית בוואטסאפ, והוא יחזור אליכם עם תפריט."}
                    </span>
                  </span>
                  <WaButton topic="אירוע פרטי" showNumber />
                </div>
              </div>
              <span style={{ fontSize: "13px", color: "#5A544E" }}>
                <span style={{ color: "#B4511E" }}>
                  {"*"}
                </span>
                {" שדות חובה"}
              </span>
            </form>
            
          </>) : null}
          <div style={{ width: "100%", maxWidth: "1100px", marginTop: "30px", display: "flex" }}>
            {sent ? (<>
              
              <div data-a="thanks" role="status" style={{ flex: "1.4 1 480px", minHeight: "360px", background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "22px", padding: "36px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", textAlign: "center" }}>
                <span data-a="tk-badge" style={{ width: "88px", height: "88px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
                    <circle cx="44" cy="44" r="40" fill="#FDEBD3" />
                    <circle data-a="tk-ring" cx="44" cy="44" r="40" stroke="#B4511E" strokeWidth="3" transform="rotate(-90 44 44)" />
                    <path data-a="tk-check" d="M28 45l11 11 22-24" stroke="#B4511E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div data-a="tk-txt" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ margin: "0", fontSize: "24px", fontWeight: "900", color: "#2E2A27" }}>
                    {"קיבלנו את פרטי השמחה"}
                  </h3>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.7", color: "#5A544E", maxWidth: "420px" }}>
                    {"נחזור אליכם עם הצעת תפריט ומחיר. רוצים לדבר כבר עכשיו? וואטסאפ לעמית, 054-543-7526."}
                  </p>
                  <button type="button" onClick={reset} style={{ marginTop: "8px", minHeight: "44px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid #FDEBD3", background: "#FFFFFF", color: "#2E2A27", font: "inherit", fontSize: "15px", fontWeight: "800", cursor: "pointer" }}>
                    {"שליחה נוספת"}
                  </button>
                </div>
              </div>
              
            </>) : null}
          </div>
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}
