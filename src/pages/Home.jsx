// Generated from the approved canvas design (Ref-Home.html). הקופי של העמוד נמצא כאן.
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import FactoryQuote from '../components/brand/FactoryQuote.jsx'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function Home({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("הסעדה למפעלים (דף הבית)")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#F2EADE", color: "#2E2A27", fontFamily: "'Birzia', 'Heebo', system-ui, sans-serif", fontWeight: "500" }} data-page="Home">
      {" "}
      {" "}
      <section id="top" data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "600px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 92%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/hero.jpg" data-a="hero-img" alt="טאג׳ין כתום עם תבשיל בקר, חומוס וקוסקוס" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.78) 0%, rgba(20, 17, 15, 0.55) 45%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", margin: "0", padding: "64px clamp(24px, 5vw, 80px) 110px", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px" }}>
            <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "20px", color: "#FFFFFF" }}>
              <h1 id="h1" style={{ margin: "0", fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)", lineHeight: "1.12", fontWeight: "900", letterSpacing: "-0.01em" }}>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                  <span data-a="hero-line" style={{ display: "block" }}>
                    {"הצלצול להפסקה,"}
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                  <span data-a="hero-line" style={{ display: "block" }}>
                    {"והאוכל כבר"}
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                  <span data-a="hero-line" style={{ display: "block" }}>
                    {"על השולחן."}
                  </span>
                </span>
              </h1>
              <p data-a="hero-fade" style={{ margin: "0", fontSize: "17px", lineHeight: "1.7", color: "rgba(255, 255, 255, 0.9)" }}>
                {"מטבח בשרי כשר בקרית גת שמבשל כל בוקר מעל 3,000 ארוחות חמות לעשרות מפעלים בדרום. בתפזורת לחדר האוכל או בחמגשיות אישיות, לפי איך שהמפעל שלכם עובד."}
              </p>
              <div data-a="hero-fade" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
                <a href="#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                  {"אני רוצה הצעת מחיר"}
                </a>
                <span style={{ fontSize: "15px", fontWeight: "500", color: "rgba(255, 255, 255, 0.85)" }}>
                  {"מחפשים אוכל לשישי או לאירוע? "}
                  <Link to="/friday" style={{ color: "#FFFFFF", fontWeight: "800", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                    {"מכירת שישי"}
                  </Link>
                  {" · "}
                  <Link to="/services/event-catering" style={{ color: "#FFFFFF", fontWeight: "800", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                    {"אירועים פרטיים"}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-label="אלגריה במספרים" style={{ padding: "0", borderRadius: "25px" }}>
        <div style={{ width: "100%", margin: "0", background: "#2E2A27", color: "#F2EADE", padding: "60px clamp(24px, 5vw, 80px)", boxSizing: "border-box" }}>
          {" "}
          <div style={{ width: "100%", margin: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", textAlign: "center" }}>
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(242, 234, 222, 0.08)", border: "1px solid rgba(242, 234, 222, 0.18)", color: "#FCC50D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 30a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM24 12l2 4.5 4.8.5-3.6 3.2 1 4.8L24 22.6 19.8 25l1-4.8-3.6-3.2 4.8-.5zM16 28l-3 15 11-6 11 6-3-15" />
                </svg>
              </span>
              <span dir="ltr" data-count="25" data-suf="+" style={{ fontSize: "56px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                {"25+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(242, 234, 222, 0.82)" }}>
                {"שנות ניסיון"}
              </span>
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(242, 234, 222, 0.08)", border: "1px solid rgba(242, 234, 222, 0.18)", color: "#FCC50D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                </svg>
              </span>
              <span dir="ltr" data-count="3000" data-suf="+" style={{ fontSize: "56px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                {"3,000+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(242, 234, 222, 0.82)" }}>
                {"ארוחות ביום"}
              </span>
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(242, 234, 222, 0.08)", border: "1px solid rgba(242, 234, 222, 0.18)", color: "#FCC50D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 42V20l10 6v-6l10 6V12l16 8v22zM6 42h36M14 34h4M24 34h4M34 34h4" />
                </svg>
              </span>
              <span dir="ltr" data-count="40" data-suf="+" style={{ fontSize: "56px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                {"40+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(242, 234, 222, 0.82)" }}>
                {"חברות ומפעלים מרוצים"}
              </span>
            </div>{" "}
          </div>
          {" "}
        </div>
      </section>
      {" "}
      {" "}
      <section aria-labelledby="s2" style={{ padding: "72px clamp(24px, 5vw, 80px) 96px" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s2" data-a="words" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
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
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
            </span>
          </div>
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "56px" }}>
            <div style={{ flex: "1 1 420px", position: "relative", minHeight: "400px", maxWidth: "520px" }}>
              {" "}
              <img src="/images/site/factory.jpg" data-a="col1" alt="מגש צהריים עם שניצל, אורז ושעועית ירוקה" style={{ position: "absolute", top: "0", insetInlineStart: "0", width: "56%", aspectRatio: "1 / 0.9", objectFit: "cover", borderRadius: "80px 18px 80px 80px", border: "8px solid #FFFFFF", boxSizing: "border-box", zIndex: "2" }} />
              {" "}
              <img src="/images/site/spread.jpg" data-a="col2" alt="עוף עם חומוס, סלטים בקערות ולחם" style={{ position: "absolute", top: "16px", insetInlineEnd: "0", width: "56%", height: "380px", objectFit: "cover", borderRadius: "22px 22px 70px 22px" }} />
              {" "}
              <span data-a="badge" style={{ position: "absolute", bottom: "30px", insetInlineEnd: "44%", width: "92px", height: "92px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #A24A1B", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "3" }}>
                <b style={{ fontSize: "20px", lineHeight: "1", color: "#2E2A27" }}>
                  {"כשר"}
                </b>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#2E2A27", lineHeight: "1.2", marginTop: "4px" }}>
                  {"רבנות"}
                  <br />
                  {"קרית גת"}
                </span>
              </span>
              {" "}
            </div>
            <div data-a="fade" style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "22px" }}>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#2E2A27" }}>
                {"כשההפסקה של 200 עובדים תלויה במשאית אחת, כל איחור הופך לתלונה שמגיעה אליכם. לכן הסירים עולים על האש ביום האספקה עצמו, והעובדים בוחרים מנה באפליקציה, כך שמבשלים בדיוק לפי ההזמנות."}
              </p>
              <a href="#services" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 28px", borderRadius: "999px", background: "#2E2A27", color: "#F2EADE", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"מה אנחנו מבשלים"}
              </a>
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section id="services" aria-labelledby="s3" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", background: "#4F5B31", position: "relative", padding: "80px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box" }}>
          {" "}
          <img src="/images/site/tagine_beef_couscous.jpg" data-a="spin" alt="" style={{ position: "absolute", top: "-54px", insetInlineEnd: "7%", width: "170px", height: "170px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.35)", border: "6px solid #FFFFFF" }} />
          {" "}
          <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 id="s3" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#F2EADE" }}>
              {"ספק אחד,"}
              <br />
              {"ארבעה שירותי הסעדה לעסק שלכם."}
            </h2>
            <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "15px", lineHeight: "1.7", color: "rgba(242, 234, 222, 0.82)", maxWidth: "460px" }}>
              {"מטבח אחד בשרי וכשר, שמבשל כל בוקר למפעלים, לאירועים ולשולחנות שבת."}
            </p>
            <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
                <span style={{ width: "90px", height: "1px", background: "rgba(242, 234, 222, 0.35)" }} />
                <span style={{ width: "56px", height: "1px", background: "rgba(242, 234, 222, 0.35)" }} />
              </span>
              <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#F2EADE", color: "#4F5B31", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <span style={{ width: "90px", height: "1px", background: "rgba(242, 234, 222, 0.35)" }} />
                <span style={{ width: "56px", height: "1px", background: "rgba(242, 234, 222, 0.35)" }} />
              </span>
            </div>
            <div style={{ marginTop: "30px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "22px" }}>
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 30V14h22v16M28 20h8l6 6v4H28M13 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM35 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 34h14M10 19h12M10 24h8" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"הסעדה יומית למפעלים"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                  {"ארוחה חמה כל יום לפני ההפסקה, בתפזורת או בחמגשיות אישיות. העובדים מזמינים באפליקציה."}
                </p>
                <Link to="/factories" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "800", color: "#2E2A27" }}>
                  {"לפרטים"}
                </Link>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM6 42v-6a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v6M18 30v12M30 30v12M20 8h8" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"ארוחות מסובסדות לעובדים"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                  {"המעסיק משתתף, העובד משלם מחיר מוזל, ומחלקת השכר מקבלת דוח אחד בחודש."}
                </p>
                <Link to="/services/subsidized-meals" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "800", color: "#2E2A27" }}>
                  {"לפרטים"}
                </Link>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 34h40M8 34a16 16 0 0 1 32 0M24 18v-4M20 14h8M8 40h32" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"אירועי חברה וימי גיבוש"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                  {"מ-20 ועד 300 משתתפים. מבשלים באותו בוקר, מגיעים עם הכל ומסדרים את השולחנות."}
                </p>
                <Link to="/services/corporate-events" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "800", color: "#2E2A27" }}>
                  {"לפרטים"}
                </Link>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "290px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"מכירת שישי"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                  {"האוכל של שבת לפי משקל, בלי מינימום. מזמינים בטלפון עד רביעי, משלוח חינם מעל 250 ₪."}
                </p>
                <Link to="/friday" style={{ marginTop: "auto", fontSize: "14px", fontWeight: "800", color: "#2E2A27" }}>
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
          <h2 id="s4" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"מהשיחה הראשונה ועד הצלצול"}
          </h2>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
            </span>
          </div>
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px" }}>
            <ol data-a="steps" style={{ flex: "1 1 440px", listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ width: "50px", height: "50px", flexShrink: "0", borderRadius: "50%", border: "3px solid #DDD1BE", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"01"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#A24A1B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"מספרים לנו על המפעל"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                    {"כמה עובדים, באילו משמרות, ואיך אוכלים היום: חדר אוכל או חמגשיות. שיחה אחת בטלפון."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "74px", marginInlineEnd: "110px", border: "1px solid #DDD1BE", borderTop: "0", borderInlineEnd: "0", borderRadius: "0 0 18px 0" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexDirection: "row-reverse", textAlign: "left" }}>
                <span dir="ltr" style={{ width: "50px", height: "50px", flexShrink: "0", borderRadius: "50%", border: "3px solid #DDD1BE", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"02"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#A24A1B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px", alignItems: "flex-end" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"הצעה וחוזה"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                    {"מחיר למנה ומינימום מנות ליום, כתוב וסגור, לרוב עוד באותו יום. בלי סעיפים שמופיעים רק בחשבונית."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "110px", marginInlineEnd: "74px", border: "1px solid #DDD1BE", borderTop: "0", borderInlineStart: "0", borderRadius: "0 0 0 18px" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ width: "50px", height: "50px", flexShrink: "0", borderRadius: "50%", border: "3px solid #DDD1BE", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"03"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#A24A1B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"העובדים מזמינים באפליקציה"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
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
            <span data-a="archbg" aria-hidden="true" style={{ position: "absolute", bottom: "-18px", insetInlineEnd: "-18px", width: "70%", height: "70%", borderRadius: "22px", background: "#EADFCD" }} />
            {" "}
            <img src="/images/site/tagine_blue.jpg" data-a="arch" alt="טאג׳ין טורקיז עם בקר, ירקות וקוסקוס" style={{ position: "relative", display: "block", width: "100%", aspectRatio: "1 / 1.15", objectFit: "cover", borderRadius: "190px 190px 22px 22px" }} />
            {" "}
          </div>
          <div style={{ flex: "1 1 460px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <h2 id="s5" data-a="words" style={{ margin: "0", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
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
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#2E2A27" }}>
              {"מוסיפים אותם באפליקציה, והמטבח מבשל יותר כבר למחרת. מפעל של 40 עובדים ומפעל של 400 מקבלים את אותם סירים באותו בוקר, כי המטבח שלנו מבשל מעל 3,000 ארוחות ביום."}
            </p>
            <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px", fontSize: "16px" }}>
              {" "}<li data-a="point" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ width: "22px", height: "22px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {"מטבח מרכזי שמבשל מעל 3,000 ארוחות ביום"}
              </li>{" "}
              {" "}<li data-a="point" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ width: "22px", height: "22px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {"תפזורת או חמגשיות, לפי מה שמתאים למפעל"}
              </li>{" "}
              {" "}<li data-a="point" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ width: "22px", height: "22px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {"איש קשר אחד שמכיר את המפעל שלכם"}
              </li>{" "}
            </ul>
            <a href="#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 28px", borderRadius: "999px", background: "#2E2A27", color: "#F2EADE", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
              {"אני רוצה לשמוע איך זה ייראה אצלנו"}
            </a>
          </div>
        </div>
      </section>
      {" "}
      <section id="map" aria-labelledby="map-h" style={{ padding: "96px clamp(24px, 5vw, 80px)", maxWidth: "1308px", width: "100%" }}>
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "56px" }}>
          <div style={{ flex: "1 1 420px", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "800", color: "#2E2A27", background: "#EADFCD", borderRadius: "999px", padding: "6px 14px" }}>
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 40a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM38 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM14 36h14a6 6 0 0 0 0-12H20a6 6 0 0 1 0-12h14" />
              </svg>
              {"אזור החלוקה שלנו"}
            </span>
            <h2 id="map-h" data-a="words" style={{ margin: "0", fontSize: "clamp(2rem, 3.4vw, 2.8rem)", lineHeight: "1.15", fontWeight: "900", color: "#2E2A27" }}>
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
            <p data-a="title" style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#2E2A27" }}>
              {"המשאיות יוצאות מהמטבח בקרית גת בבוקר של יום האספקה, ומגיעות לחדרי האוכל לפני ההפסקה. מפעל במקום אחר בדרום? נבדוק את המסלול."}
            </p>
            <ul style={{ listStyle: "none", margin: "4px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"מבושל באותו בוקר"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#2E2A27" }}>
                    {"הסירים עולים על האש ביום האספקה עצמו"}
                  </span>
                </span>
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 30V12h24v18M28 18h9l7 7v5H28M12 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM36 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 34h16" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"מסלולי חלוקה קבועים"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#2E2A27" }}>
                    {"כל מפעל מקבל שעת הגעה קבועה"}
                  </span>
                </span>
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ width: "48px", height: "48px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M24 42a18 18 0 1 0 0-36 18 18 0 0 0 0 36zM24 14v10l7 5" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <b style={{ fontSize: "16px", color: "#2E2A27" }}>
                    {"לפני ההפסקה"}
                  </b>
                  <span style={{ fontSize: "14px", color: "#2E2A27" }}>
                    {"בתפזורת או בחמגשיות אישיות"}
                  </span>
                </span>
              </li>
            </ul>
            <ul aria-label="ערים באזור החלוקה" style={{ listStyle: "none", margin: "6px 0 0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px" }} />
          </div>
          <div data-a="map" style={{ flex: "1 1 420px", maxWidth: "560px", background: "#2E2A27", borderRadius: "32px", padding: "16px", boxSizing: "border-box" }}>
            {" "}
            <svg viewBox="0 0 409 450" role="img" aria-label="מפת חלוקה של הדרום: מהמטבח בקרית גת לאשדוד, קרית מלאכי, אשקלון, שדרות, נתיבות, אופקים ובאר שבע" style={{ display: "block", width: "100%", height: "auto", borderRadius: "22px", fontFamily: "inherit" }}>
              <defs>
                <pattern id="landDots" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.1" fill="#5A544E" />
                </pattern>
                <clipPath id="hubClip">
                  <circle cx="265.9" cy="174.0" r="16.5" />
                </clipPath>
              </defs>
              <rect data-a="sea" width="409" height="450" fill="#221F1C" />
              <path d="M-0.5 412.7L5 429.9L25.2 480L-30 480L-30 402.5L-26.3 351.9L-13.4 374.2L-9.7 384.3L-0.5 412.7Z" fill="#38332E" stroke="#48423C" strokeWidth="1" />
              <path d="M119.1 189.8L133.8 202.9L143 215.1L143 228.3L126.5 243.5L124.6 243.5L117.3 248.5L60.2 304.3L49.2 325.5L49.2 335.7L52.8 355.9L51 366.1L34.4 386.3L6.8 405.6L-0.5 412.7L-9.7 384.3L-13.4 374.2L-26.3 351.9L-13.4 343.8L-6.1 334.7L16 314.4L27.1 295.1L51 276.9L60.2 258.7L98.9 219.2L117.3 192.8L119.1 189.8ZM439 -30L439 322.5L404.4 322.5L373.1 326.6L360.2 330.6L345.5 332.6L332.6 330.6L321.6 322.5L316.1 302.2L323.4 282L345.5 243.5L349.2 224.2L349.2 207L351 190.8L360.2 174.6L360.2 172.6L369.4 161.4L411.8 131L428.4 112.8L437.6 104.7L439 100.6L439 48.9L413.6 36.8L406.3 34.8L402.6 37.8L393.4 46.9L389.7 50L386 51L376.8 51L360.2 47.9L354.7 37.8L356.6 35.8L360.2 27.7L373.1 22.6L387.9 14.5L380.5 -5.8L371.3 -29.1L373.1 -30L439 -30Z" fill="#38332E" stroke="#48423C" strokeWidth="1" />
              <path d="M-0.5 412.7L6.8 405.6L34.4 386.3L51 366.1L52.8 355.9L49.2 335.7L49.2 325.5L60.2 304.3L117.3 248.5L124.6 243.5L126.5 243.5L143 228.3L143 215.1L133.8 202.9L119.1 189.8L122.8 179.6L135.7 163.4L179.9 85.4L183.5 80.4L213 15.5L225.9 -15.9L236.9 -30L373.1 -30L371.3 -29.1L380.5 -5.8L387.9 14.5L373.1 22.6L360.2 27.7L356.6 35.8L354.7 37.8L360.2 47.9L376.8 51L386 51L389.7 50L393.4 46.9L402.6 37.8L406.3 34.8L413.6 36.8L439 48.9L439 100.6L437.6 104.7L428.4 112.8L411.8 131L369.4 161.4L360.2 172.6L360.2 174.6L351 190.8L349.2 207L349.2 224.2L345.5 243.5L323.4 282L316.1 302.2L321.6 322.5L332.6 330.6L345.5 332.6L360.2 330.6L373.1 326.6L404.4 322.5L439 322.5L439 480L25.2 480L5 429.9L-0.5 412.7Z" fill="#4A443D" stroke="#6B645B" strokeWidth="1.2" />
              <path d="M-0.5 412.7L6.8 405.6L34.4 386.3L51 366.1L52.8 355.9L49.2 335.7L49.2 325.5L60.2 304.3L117.3 248.5L124.6 243.5L126.5 243.5L143 228.3L143 215.1L133.8 202.9L119.1 189.8L122.8 179.6L135.7 163.4L179.9 85.4L183.5 80.4L213 15.5L225.9 -15.9L236.9 -30L373.1 -30L371.3 -29.1L380.5 -5.8L387.9 14.5L373.1 22.6L360.2 27.7L356.6 35.8L354.7 37.8L360.2 47.9L376.8 51L386 51L389.7 50L393.4 46.9L402.6 37.8L406.3 34.8L413.6 36.8L439 48.9L439 100.6L437.6 104.7L428.4 112.8L411.8 131L369.4 161.4L360.2 172.6L360.2 174.6L351 190.8L349.2 207L349.2 224.2L345.5 243.5L323.4 282L316.1 302.2L321.6 322.5L332.6 330.6L345.5 332.6L360.2 330.6L373.1 326.6L404.4 322.5L439 322.5L439 480L25.2 480L5 429.9L-0.5 412.7Z" fill="url(#landDots)" opacity="0.8" />
              <text data-a="sea" x="70" y="96" direction="rtl" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7C756C" letterSpacing="1" transform="rotate(-58 70 96)">
                {"הים התיכון"}
              </text>
              <path data-a="route" d="M265.9 174.0 Q251.2 108.4 204.5 60.0" stroke="#F5871F" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q250.7 139.4 255.7 102.0" stroke="#F5871F" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q219.8 141.7 163.6 138.0" stroke="#F5871F" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q230.0 213.2 179.0 228.0" stroke="#F5871F" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q203.9 218.1 173.8 288.0" stroke="#F5871F" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q252.7 274.7 189.2 354.0" stroke="#F5871F" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <path data-a="route" d="M265.9 174.0 Q240.8 283.4 276.1 390.0" stroke="#F5871F" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9" />
              <g data-a="city">
                <circle cx="204.5" cy="60.0" r="8.5" fill="#2E2A27" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="204.5" cy="60.0" r="3.5" fill="#FCC50D" />
              </g>
              <g data-a="city">
                <circle cx="255.7" cy="102.0" r="8.5" fill="#2E2A27" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="255.7" cy="102.0" r="3.5" fill="#FCC50D" />
              </g>
              <g data-a="city">
                <circle cx="163.6" cy="138.0" r="8.5" fill="#2E2A27" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="163.6" cy="138.0" r="3.5" fill="#FCC50D" />
              </g>
              <g data-a="city">
                <circle cx="179.0" cy="228.0" r="8.5" fill="#2E2A27" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="179.0" cy="228.0" r="3.5" fill="#FCC50D" />
              </g>
              <g data-a="city">
                <circle cx="173.8" cy="288.0" r="8.5" fill="#2E2A27" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="173.8" cy="288.0" r="3.5" fill="#FCC50D" />
              </g>
              <g data-a="city">
                <circle cx="189.2" cy="354.0" r="8.5" fill="#2E2A27" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="189.2" cy="354.0" r="3.5" fill="#FCC50D" />
              </g>
              <g data-a="city">
                <circle cx="276.1" cy="390.0" r="8.5" fill="#2E2A27" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="276.1" cy="390.0" r="3.5" fill="#FCC50D" />
              </g>
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FCC50D" stroke="#2E2A27" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FCC50D" stroke="#2E2A27" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FCC50D" stroke="#2E2A27" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FCC50D" stroke="#2E2A27" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FCC50D" stroke="#2E2A27" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FCC50D" stroke="#2E2A27" strokeWidth="2.6" opacity="0" />
              <circle data-a="truck" cx="265.9" cy="174.0" r="5" fill="#FCC50D" stroke="#2E2A27" strokeWidth="2.6" opacity="0" />
              <g data-a="hub">
                <circle data-a="hub-ring" cx="265.9" cy="174.0" r="15" fill="none" stroke="#FCC50D" strokeWidth="2" />
                <circle cx="265.9" cy="174.0" r="19" fill="#F2EADE" stroke="#FCC50D" strokeWidth="2.5" />
                <image href="/images/site/mark.jpg" x="249.4" y="157.5" width="33" height="33" preserveAspectRatio="xMidYMid slice" clipPath="url(#hubClip)" />
              </g>
              <text data-a="city-label" x="191.5" y="64.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#F2EADE" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"אשדוד"}
              </text>
              <text data-a="city-label" x="268.7" y="106.5" direction="rtl" textAnchor="end" fontSize="13.5" fontWeight="800" fill="#F2EADE" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"קרית מלאכי"}
              </text>
              <text data-a="city-label" x="150.6" y="142.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#F2EADE" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"אשקלון"}
              </text>
              <text data-a="city-label" x="166.0" y="232.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#F2EADE" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"שדרות"}
              </text>
              <text data-a="city-label" x="160.8" y="292.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#F2EADE" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"נתיבות"}
              </text>
              <text data-a="city-label" x="176.2" y="358.5" direction="rtl" textAnchor="start" fontSize="13.5" fontWeight="800" fill="#F2EADE" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"אופקים"}
              </text>
              <text data-a="city-label" x="289.1" y="394.5" direction="rtl" textAnchor="end" fontSize="13.5" fontWeight="800" fill="#F2EADE" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"באר שבע"}
              </text>
              <text data-a="city-label" x="291.9" y="172.0" direction="rtl" textAnchor="end" fontSize="16" fontWeight="900" fill="#FCC50D" stroke="#2E2A27" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round">
                {"קרית גת"}
              </text>
              <text data-a="city-label" x="291.9" y="189.0" direction="rtl" textAnchor="end" fontSize="11.5" fontWeight="700" fill="#B9B2A8" stroke="#2E2A27" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                {"המטבח שלנו"}
              </text>
              <g aria-hidden="true">
                <path d="M331.1 428v5h53.9v-5" stroke="#8C857C" strokeWidth="1.4" fill="none" />
                <text x="358.1" y="423" direction="rtl" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#8C857C">
                  {"10 ק״מ"}
                </text>
              </g>
            </svg>
            {" "}
          </div>
        </div>
      </section>
      {" "}
      <section id="about" aria-labelledby="s6" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s6" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"מהמטבח שלנו בקרית גת"}
          </h2>
          <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "15px", lineHeight: "1.7", color: "#2E2A27", maxWidth: "520px" }}>
            {"אוכל ביתי שמתבשל כל בוקר, מהמתכונים של המטבח הראשון שלנו."}
          </p>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
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
          <h2 id="blog-h" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"מהבלוג"}
          </h2>
          <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "16px", lineHeight: "1.75", color: "#2E2A27", maxWidth: "620px" }}>
            {"מדריכים קצרים מהמטבח, למנהלי רכש ולמי שמתכנן אירוע."}
          </p>
          <div data-a="orn" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
            </span>
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#EADFCD", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v7a2 2 0 0 1-4 0V3M6 10v11M16 3c-2 0-3 2-3 6 0 2 1 3 3 3v9" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
              <span style={{ width: "90px", height: "1px", background: "#DDD1BE" }} />
              <span style={{ width: "56px", height: "1px", background: "#DDD1BE" }} />
            </span>
          </div>
          <div style={{ marginTop: "24px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <article data-a="card" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Link to="/blog/how-much-food-per-guest-event-catering" style={{ display: "block" }}>
                <img src="/images/site/spread.jpg" alt="עוף עם חומוס, סלטים בקערות ולחם" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "18px 18px 0 0" }} />
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: "1" }}>
                <span style={{ alignSelf: "flex-start", fontSize: "13px", fontWeight: "800", color: "#2E2A27", background: "#EADFCD", borderRadius: "999px", padding: "5px 12px" }}>
                  {"אירועים"}
                </span>
                <h3 style={{ margin: "0", fontSize: "19px", lineHeight: "1.35", fontWeight: "900" }}>
                  <Link to="/blog/how-much-food-per-guest-event-catering" style={{ color: "#2E2A27", textDecoration: "none" }}>
                    {"כמה אוכל להזמין לאירוע? מדריך כמויות למנה לאדם"}
                  </Link>
                </h3>
                <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.7", color: "#2E2A27" }}>
                  {"כמה סלטים, עיקריות ותוספות לכל אורח, איך מחשבים ילדים, וכמה רזרבה להוסיף בלי לזרוק אוכל."}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", fontSize: "13px", color: "#2E2A27" }}>
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
            <article data-a="card" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Link to="/blog/industrial-catering-guide" style={{ display: "block" }}>
                <img src="/images/site/factory.jpg" alt="מגש צהריים עם שניצל, אורז ושעועית ירוקה" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "18px 18px 0 0" }} />
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: "1" }}>
                <span style={{ alignSelf: "flex-start", fontSize: "13px", fontWeight: "800", color: "#2E2A27", background: "#EADFCD", borderRadius: "999px", padding: "5px 12px" }}>
                  {"הסעדה למפעלים"}
                </span>
                <h3 style={{ margin: "0", fontSize: "19px", lineHeight: "1.35", fontWeight: "900" }}>
                  <Link to="/blog/industrial-catering-guide" style={{ color: "#2E2A27", textDecoration: "none" }}>
                    {"הסעדה למפעלים: מה לבדוק לפני שחותמים על חוזה"}
                  </Link>
                </h3>
                <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.7", color: "#2E2A27" }}>
                  {"תמחור לעובד, זמני אספקה, שמירת טמפרטורה והתאמות תזונתיות. מדריך מעשי למנהלי רכש בדרום."}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", fontSize: "13px", color: "#2E2A27" }}>
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
            <article data-a="card" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Link to="/blog/business-catering-south-israel" style={{ display: "block" }}>
                <img src="/images/site/tagine_white.jpg" alt="טאג׳ין לבן עם תבשיל בקר ואורז" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "18px 18px 0 0" }} />
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: "1" }}>
                <span style={{ alignSelf: "flex-start", fontSize: "13px", fontWeight: "800", color: "#2E2A27", background: "#EADFCD", borderRadius: "999px", padding: "5px 12px" }}>
                  {"הסעדה למפעלים"}
                </span>
                <h3 style={{ margin: "0", fontSize: "19px", lineHeight: "1.35", fontWeight: "900" }}>
                  <Link to="/blog/business-catering-south-israel" style={{ color: "#2E2A27", textDecoration: "none" }}>
                    {"הסעדה למפעלים בדרום: ארוחה חמה בכל יום עבודה"}
                  </Link>
                </h3>
                <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.7", color: "#2E2A27" }}>
                  {"מדרגות כמות, שמירת חום ותפריט יומי מתחלף, מניסיון של 25 שנה במטבח בקרית גת."}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", fontSize: "13px", color: "#2E2A27" }}>
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
          <Link to="/blog" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 26px", borderRadius: "999px", border: "1.5px solid #A24A1B", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none", marginTop: "12px" }}>
            {"לכל המאמרים"}
          </Link>
        </div>
      </section>
      {" "}
      <section id="contact" aria-labelledby="s7" style={{ padding: "0 clamp(24px, 5vw, 80px) 96px" }}>
        <div data-a="panel" style={{ width: "100%", margin: "0", background: "#EADFCD", borderRadius: "26px", padding: "clamp(20px, 4vw, 56px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 id="s7" data-a="title" style={{ margin: "0", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"בואו נדבר על המפעל שלכם"}
            </h2>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.8", color: "#2E2A27" }}>
              {"כמה פרטים, ותקבלו הצעה כתובה עם מחיר למנה ומינימום יומי, לרוב עוד באותו יום."}
            </p>
            <a href="tel:+972545437526" dir="ltr" style={{ textAlign: "right", fontSize: "30px", fontWeight: "900", color: "#2E2A27", textDecoration: "none" }}>
              {"054-543-7526"}
            </a>
            <ul style={{ listStyle: "none", margin: "8px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #DDD1BE", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4h18l8 8v32H12zM30 4v8h8M18 24h12M18 30h12M18 36h8" />
                  </svg>
                </span>
                {"מחיר למנה ומינימום יומי, בכתב"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #DDD1BE", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 30V12h24v18M28 18h9l7 7v5H28M12 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM36 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 34h16" />
                  </svg>
                </span>
                {"תפזורת או חמגשיות אישיות"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #DDD1BE", color: "#A24A1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
                  </svg>
                </span>
                {"איש קשר אחד עם טלפון ישיר"}
              </li>
            </ul>
          </div>
          <FactoryQuote formOpen={formOpen} sent={sent} idle={idle} sending={sending} send={send} reset={reset} />
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}
