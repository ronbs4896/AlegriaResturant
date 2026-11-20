// Generated from the approved canvas design (Ref-Subsidized.html). הקופי של העמוד נמצא כאן.
// ds-normalized
// mobile-fixed
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import WaButton from '../components/brand/WaButton.jsx'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { CalendarBlank as PhCalendarBlank, Certificate as PhCertificate, Coins as PhCoins, CookingPot as PhCookingPot, Factory as PhFactory, FileText as PhFileText, ForkKnife as PhForkKnife, Medal as PhMedal, Phone as PhPhone, ShieldCheck as PhShieldCheck } from '@phosphor-icons/react'

export default function Subsidized({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("ארוחות מסובסדות לעובדים")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#FFFFFF", color: "#2E2A27", fontFamily: "'Straight', 'Heebo', system-ui, sans-serif", fontWeight: "300" }} data-page="Subsidized">
      {" "}
      {" "}
      <section data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "480px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/couscous.jpg" data-a="hero-img" alt="קוסקוס עם ירקות בקערת טורקיז" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.82) 0%, rgba(20, 17, 15, 0.58) 50%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", padding: "56px clamp(24px, 5vw, 80px) clamp(56px, 7vw, 96px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
              <Link to="/" style={{ color: "#FFFFFF" }}>
                {"בית"}
              </Link>
              {" / ארוחות מסובסדות לעובדים"}
            </nav>
            <h1 id="h1" style={{ margin: "0", fontSize: "var(--fs-h1)", lineHeight: "1.08", fontWeight: "700", maxWidth: "760px" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"ארוחה חמה כהטבה,"}
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"שהעובדים מרגישים כל צהריים"}
                </span>
              </span>
            </h1>
            <p data-a="hero-fade" style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "rgba(255, 255, 255, 0.9)", maxWidth: "600px" }}>
              {"המפעל משתתף במחיר, העובד משלם פחות, ואפשר לשלם גם בסיבוס. את גובה ההשתתפות קובעים אתם."}
            </p>
            <div data-a="hero-fade" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a className="ds-btn" href="#contact" style={{ minHeight: "52px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "16px", fontWeight: "700", textDecoration: "none" }}>
                {"אני רוצה לבנות מודל סבסוד"}
              </a>
              <a className="ds-btn" href="tel:+972545437526" dir="ltr" style={{ minHeight: "52px", display: "inline-flex", alignItems: "center", padding: "0 22px", borderRadius: "999px", border: "1.5px solid rgba(255, 255, 255, 0.8)", color: "#FFFFFF", fontSize: "16px", fontWeight: "700", textDecoration: "none" }}>
                {"054-543-7526"}
              </a>
              <WaButton variant="hero" topic="ארוחות מסובסדות לעובדים" />
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s2" style={{ padding: "clamp(44px, 5.5vw, 72px) clamp(24px, 5vw, 80px) clamp(56px, 7vw, 96px)" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s2" data-a="words" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"הטבה"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"שלא"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"צריך"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"להסביר"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"בישיבת"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"צוות."}
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
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "64px" }}>
            <div style={{ flex: "1 1 420px", position: "relative", minHeight: "420px", maxWidth: "560px" }}>
              {" "}
              <img src="/images/site/factory.jpg" data-a="col1" alt="מגש צהריים עם שניצל, אורז ושעועית ירוקה" style={{ position: "absolute", top: "0", insetInlineStart: "0", width: "56%", aspectRatio: "1 / 0.92", objectFit: "cover", borderRadius: "80px 18px 80px 80px", border: "8px solid #FFFFFF", boxSizing: "border-box", zIndex: "2", background: "#F2EADE" }} />
              {" "}
              <img src="/images/site/tagine_veg.jpg" data-a="col2" alt="טאג׳ין טורקיז עם ירקות וקוסקוס" style={{ position: "absolute", top: "16px", insetInlineEnd: "0", width: "56%", height: "400px", objectFit: "cover", borderRadius: "22px 22px 70px 22px" }} />
              {" "}
              <span data-a="badge" style={{ position: "absolute", bottom: "26px", insetInlineEnd: "44%", width: "100px", height: "100px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #B4511E", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "3", padding: "6px", boxSizing: "border-box" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#B4511E", lineHeight: "1.2" }}>
                  {"מתחילים"}
                </span>
                <b dir="auto" style={{ fontSize: "18px", lineHeight: "1.15" }}>
                  {"בטעימה"}
                </b>
              </span>
              {" "}
            </div>
            <div data-a="fade" style={{ flex: "1 1 420px", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px" }}>
              <p style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540" }}>
                {"תוספת לתלוש נבלעת תוך חודש. ארוחה חמה כל צהריים, במחיר שהמפעל מוריד לעובד, היא הטבה שרואים כל יום ב-12:00."}
              </p>
              <p style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540" }}>
                {"אתם קובעים כמה המפעל משלם וכמה העובד. העובדים מזמינים באפליקציה, אנחנו מבשלים ומספקים, ואפשר לשלם גם בסיבוס."}
              </p>
              <a className="ds-btn" href="#start" style={{ minHeight: "52px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "16px", fontWeight: "700", textDecoration: "none" }}>
                {"איך זה עובד"}
              </a>
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s3" style={{ padding: "54px 0 0" }}>
        <div id="values" style={{ width: "100%", margin: "0", background: "#FFF5E8", position: "relative", padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px) clamp(56px, 7vw, 96px)", boxSizing: "border-box" }}>
          {" "}
          <img src="/images/site/tagine_orange.jpg" data-a="spin" alt="" style={{ position: "absolute", top: "-54px", insetInlineEnd: "7%", width: "170px", height: "170px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.35)", border: "6px solid #FFFFFF" }} />
          {" "}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 id="s3" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
              {"מה זה דורש"}
              <br />
              {"מכם בפועל."}
            </h2>
            <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540", maxWidth: "620px" }}>
              {"כמעט כלום. הנה הכל."}
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
            <div style={{ marginTop: "30px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "22px" }}>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <PhCoins size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"להחליט על אחוז"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"כמה המפעל משתתף. אפשר לשנות בהמשך."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <PhPhone size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"לתת לעובדים את האפליקציה"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"כל עובד מזמין לעצמו, בלי רשימות ובלי טלפונים."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <PhCertificate size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"לשלם איך שנוח לכם"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"אנחנו מקבלים גם סיבוס, כך שהסבסוד עובר דרך מה שכבר יש לכם."}
                </p>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "280px", boxSizing: "border-box" }}>
                <PhCalendarBlank size={46} weight="duotone" color="#B4511E" aria-hidden="true" />
                <h3 style={{ margin: "4px 0 0", fontSize: "var(--fs-h4)", lineHeight: "1.3", fontWeight: "700" }}>
                  {"להתחיל בטעימה"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                  {"טועמים לפני שסוגרים, ומתחילים לספק תוך כ-30 יום."}
                </p>
              </div>
            </div>
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section aria-labelledby="start" style={{ padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="start" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
            {"מהחלטה ועד ארוחה ראשונה"}
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
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "64px" }}>
            <ol data-a="steps" style={{ flex: "1 1 460px", maxWidth: "720px", listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"01"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "18px" }}>
                    {"קובעים מודל"}
                  </b>
                  <span style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#4A4540" }}>
                    {"בשיחה אחת: כמה משלם המפעל, כמה העובד, ובאילו ימים."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "74px", marginInlineEnd: "110px", border: "1px solid #F0C99A", borderTop: "0", borderInlineEnd: "0", borderRadius: "0 0 18px 0" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexDirection: "row-reverse", textAlign: "left" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"02"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px", alignItems: "flex-end" }}>
                  <b style={{ fontSize: "18px" }}>
                    {"העובדים מזמינים"}
                  </b>
                  <span style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#4A4540" }}>
                    {"באפליקציה של אלגריה, והאוכל מגיע חם לפני ההפסקה."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "110px", marginInlineEnd: "74px", border: "1px solid #F0C99A", borderTop: "0", borderInlineStart: "0", borderRadius: "0 0 0 18px" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"03"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "18px" }}>
                    {"תשלום"}
                  </b>
                  <span style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#4A4540" }}>
                    {"המפעל משלם את חלקו והעובד את שלו, ואפשר גם בסיבוס."}
                  </span>
                </span>
              </li>
            </ol>
            <img src="/images/site/spread.jpg" data-a="reveal" alt="עוף עם חומוס, סלטים בקערות ולחם" style={{ flex: "1 1 400px", maxWidth: "520px", width: "100%", aspectRatio: "1 / 1.15", objectFit: "cover", borderRadius: "22px", display: "block" }} />
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
                <PhMedal size={30} weight="duotone" aria-hidden="true" />
              </span>
              <span dir="ltr" data-count="25" data-suf="+" style={{ fontSize: "var(--fs-display)", fontWeight: "700", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"25+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"שנות ניסיון"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhCookingPot size={30} weight="duotone" aria-hidden="true" />
              </span>
              <span dir="ltr" data-count="3000" data-suf="+" style={{ fontSize: "var(--fs-display)", fontWeight: "700", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"3,000+"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"ארוחות ביום"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhFactory size={30} weight="duotone" aria-hidden="true" />
              </span>
              <span dir="ltr" data-count="97" data-suf="%" style={{ fontSize: "var(--fs-display)", fontWeight: "700", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {"97%"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "rgba(46, 42, 39, 0.82)" }}>
                {"מהסועדים מרוצים, בסקר של 250 סועדים"}
              </span>
            </div>
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section aria-labelledby="s5" style={{ padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px)", background: "#FFF5E8" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s5" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
            {"שאלות על סבסוד ארוחות"}
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
          <div style={{ marginTop: "24px", width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "18px", fontWeight: "700", minHeight: "32px", listStyle: "none" }}>
                {"כמה המעסיק משלם?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                {"כמה שתחליטו. נבנה איתכם מודל שמתאים לתקציב ולמספר העובדים, ואפשר לשנות אותו בהמשך."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "18px", fontWeight: "700", minHeight: "32px", listStyle: "none" }}>
                {"אפשר לשלם בסיבוס?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                {"כן, אנחנו מקבלים סיבוס."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "18px", fontWeight: "700", minHeight: "32px", listStyle: "none" }}>
                {"אפשר לנסות לפני שמתחייבים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                {"כן. מתחילים בטעימה, ואחרי שסוגרים חוזה מתחילים לספק, בדרך כלל תוך כ-30 יום."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "18px", fontWeight: "700", minHeight: "32px", listStyle: "none" }}>
                {"האוכל בשרי?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
                {"כן. המטבח שלנו בשרי בלבד, בהשגחת הרבנות הראשית קרית גת."}
              </p>
              {" "}
            </details>
          </div>
        </div>
      </section>
      {" "}
      <section id="contact" aria-labelledby="cta-h" style={{ padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px)" }}>
        <div data-a="panel" style={{ width: "100%", background: "#FFF5E8", borderRadius: "26px", padding: "clamp(28px, 4vw, 56px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
          <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 id="cta-h" style={{ margin: "0", fontSize: "var(--fs-h2)", lineHeight: "1.12", fontWeight: "700", color: "#2E2A27" }}>
              {"בונים מודל סבסוד"}
            </h2>
            <p style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540", maxWidth: "480px" }}>
              {"ספרו לנו כמה עובדים יש במפעל ואיזו השתתפות אתם שוקלים, ונחזור עם הצעה."}
            </p>
            <a href="tel:+972545437526" dir="ltr" style={{ textAlign: "right", fontSize: "var(--fs-phone)", fontWeight: "700", color: "#2E2A27", textDecoration: "none" }}>
              {"054-543-7526"}
            </a>
            <WaButton topic="ארוחות מסובסדות לעובדים" style={{ alignSelf: "flex-start" }} />
            <span style={{ fontSize: "14px", color: "#4A4540" }}>
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
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhFileText size={20} weight="regular" aria-hidden="true" />
                </span>
                {"הצעה כתובה, לרוב עוד באותו יום"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhPhone size={20} weight="regular" aria-hidden="true" />
                </span>
                {"איש קשר אחד עם טלפון ישיר"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhShieldCheck size={20} weight="regular" aria-hidden="true" />
                </span>
                {"מטבח בשרי בהשגחת הרבנות"}
              </li>
            </ul>
          </div>
          {formOpen ? (<>
            
            <form style={{ flex: "1.4 1 480px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }} onSubmit={(e) => { e.preventDefault(); send(e) }} noValidate>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"שם המפעל "}
                <input type="text" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "300" }} name="שם המפעל" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"כמה עובדים "}
                <select style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "300" }} name="כמה עובדים">
                  <option>
                    {"40–80"}
                  </option>
                  <option>
                    {"80–150"}
                  </option>
                  <option>
                    {"150–300"}
                  </option>
                  <option>
                    {"300+"}
                  </option>
                </select>
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"איש קשר "}
                <input type="text" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "300" }} name="איש קשר" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"טלפון "}
                <input type="tel" dir="ltr" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "300", textAlign: "right" }} name="טלפון" required />
              </label>
              <button className="ds-btn" type="button" onClick={send} style={{ gridColumn: "1 / -1", minHeight: "52px", border: "0", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", font: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
                {idle ? (<>
                  <span>
                    {"אני רוצה הצעה"}
                  </span>
                </>) : null}
                {sending ? (<>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    <span className="spin" aria-hidden="true" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(46, 42, 39, 0.3)", borderTopColor: "#2E2A27" }} />
                    {"שולחים"}
                  </span>
                </>) : null}
              </button>
              <WaButton variant="inline" label="או בוואטסאפ" topic="ארוחות מסובסדות לעובדים" style={{ gridColumn: "1 / -1", justifySelf: "center" }} />
            </form>
            
          </>) : null}
          {sent ? (<>
            
            <div data-a="thanks" role="status" style={{ flex: "1.4 1 480px", minHeight: "300px", background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "22px", padding: "36px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", textAlign: "center" }}>
              <span data-a="tk-badge" style={{ width: "88px", height: "88px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
                  <circle cx="44" cy="44" r="40" fill="#FDEBD3" />
                  <circle data-a="tk-ring" cx="44" cy="44" r="40" stroke="#B4511E" strokeWidth="3" transform="rotate(-90 44 44)" />
                  <path data-a="tk-check" d="M28 45l11 11 22-24" stroke="#B4511E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div data-a="tk-txt" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: "0", fontSize: "var(--fs-h4)", fontWeight: "700", color: "#2E2A27", lineHeight: "1.3" }}>
                  {"קיבלנו את הפרטים"}
                </h3>
                <p style={{ margin: "0", fontSize: "var(--fs-body)", lineHeight: "1.7", color: "#4A4540", maxWidth: "420px" }}>
                  {"נחזור אליכם בהקדם, לרוב עוד באותו יום. דחוף? חייגו 054-543-7526."}
                </p>
                <button className="ds-btn" type="button" onClick={reset} style={{ marginTop: "8px", minHeight: "44px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid #FDEBD3", background: "#FFFFFF", color: "#2E2A27", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                  {"שליחה נוספת"}
                </button>
              </div>
            </div>
            
          </>) : null}
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}
