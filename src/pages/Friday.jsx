// Generated from the approved canvas design (Ref-Friday.html). הקופי של העמוד נמצא כאן.
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function Friday({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("מכירת שישי")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#F2EADE", color: "#2E2A27", fontFamily: "'Birzia', 'Heebo', system-ui, sans-serif", fontWeight: "500" }} data-page="Friday">
      {" "}
      {" "}
      <section data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "480px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/friday.jpg" data-a="hero-img" alt="עוף בזיתים לשבת עם חלות" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.82) 0%, rgba(20, 17, 15, 0.58) 50%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", padding: "56px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
              <Link to="/" style={{ color: "#FFFFFF" }}>
                {"בית"}
              </Link>
              {" / מכירת שישי"}
            </nav>
            <h1 id="h1" style={{ margin: "0", fontSize: "clamp(2.3rem, 4.2vw, 3.5rem)", lineHeight: "1.12", fontWeight: "900", maxWidth: "760px" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"האוכל של שבת,"}
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"בלי לעמוד במטבח ביום חמישי"}
                </span>
              </span>
            </h1>
            <p data-a="hero-fade" style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "rgba(255, 255, 255, 0.9)", maxWidth: "600px" }}>
              {"עוף בזיתים, חריימה, קוסקוס וחלות מהבוקר. משלמים לפי משקל, בלי מינימום הזמנה, ומשלוח חינם מעל 250 ₪."}
            </p>
            <div data-a="hero-fade" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#menu" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"אני רוצה לראות את התפריט"}
              </a>
              <a href="tel:+972545437526" dir="ltr" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", padding: "0 22px", borderRadius: "999px", border: "1.5px solid rgba(255, 255, 255, 0.8)", color: "#FFFFFF", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"054-543-7526"}
              </a>
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
                {"יום"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"חמישי"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"בערב,"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"ושום"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"סיר"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"עוד"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"לא"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"על"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"האש."}
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
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "64px" }}>
            <div style={{ flex: "1 1 420px", position: "relative", minHeight: "420px", maxWidth: "560px" }}>
              {" "}
              <img src="/images/site/matbucha.jpg" data-a="col1" alt="בשר עם חומוס, מטבוחה ולחם" style={{ position: "absolute", top: "0", insetInlineStart: "0", width: "56%", aspectRatio: "1 / 0.92", objectFit: "cover", borderRadius: "80px 18px 80px 80px", border: "8px solid #FFFFFF", boxSizing: "border-box", zIndex: "2", background: "#F2EADE" }} />
              {" "}
              <img src="/images/site/friday.jpg" data-a="col2" alt="עוף בזיתים לשבת עם חלות" style={{ position: "absolute", top: "16px", insetInlineEnd: "0", width: "56%", height: "400px", objectFit: "cover", borderRadius: "22px 22px 70px 22px" }} />
              {" "}
              <span data-a="badge" style={{ position: "absolute", bottom: "26px", insetInlineEnd: "44%", width: "100px", height: "100px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #A24A1B", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "3", padding: "6px", boxSizing: "border-box" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#2E2A27", lineHeight: "1.2" }}>
                  {"משלוח חינם"}
                </span>
                <b dir="auto" style={{ fontSize: "18px", lineHeight: "1.15" }}>
                  {"מעל 250 ₪"}
                </b>
              </span>
              {" "}
            </div>
            <div data-a="fade" style={{ flex: "1 1 420px", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px" }}>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#2E2A27" }}>
                {"זה הרגע שבשבילו קיימת מכירת השישי. כל חמישי המטבח שלנו בקרית גת נכנס להילוך של שבת, ובשישי בבוקר נשאר לכם רק לערוך שולחן."}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#2E2A27" }}>
                {"מתקשרים לנציג עד רביעי בערב, אומרים כמה ומה, ומחליטים: איסוף מקרית גת או משלוח עד הבית."}
              </p>
              <blockquote style={{ margin: "4px 0 0", paddingInlineStart: "18px", borderInlineStart: "3px solid #A24A1B", fontSize: "20px", lineHeight: "1.5", fontWeight: "900", color: "#2E2A27" }}>
                {"\"מזמינים כל שבוע. הילדים בטוחים שסבתא שלהם בישלה את החריימה, ואנחנו לא מתקנים אותם.\""}
              </blockquote>
              <a href="#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "#2E2A27", color: "#F2EADE", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"אני רוצה להזמין"}
              </a>
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s3" style={{ padding: "54px 0 0" }}>
        <div id="menu" style={{ width: "100%", background: "#EADFCD", position: "relative", padding: "80px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box" }}>
          {" "}
          <img src="/images/site/tagine_orange.jpg" data-a="spin" alt="" style={{ position: "absolute", top: "-54px", insetInlineEnd: "7%", width: "170px", height: "170px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.35)", border: "6px solid #FFFFFF" }} />
          {" "}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 id="s3" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"התפריט של השבוע"}
            </h2>
            <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "16px", lineHeight: "1.75", color: "#2E2A27", maxWidth: "620px" }}>
              {"מתחלף כל שבוע. משלמים לפי משקל, והכמויות מוגבלות, אז מי שמתקשר מוקדם מסודר."}
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
            <div style={{ marginTop: "30px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "22px" }}>
              <div data-a="menu" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "46px 24px 26px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: "0 0 8px", textAlign: "center", fontSize: "19px", fontWeight: "900", color: "#2E2A27" }}>
                  {"מנות עיקריות"}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"עוף בזיתים ולימון כבוש"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }}>
                    {"מתכון מרוקאי"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"דג חריימה"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }}>
                    {"ברוטב פיקנטי"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"קציצות ברוטב עגבניות"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"תבשיל שעועית לבנה"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }}>
                    {"ביתי"}
                  </span>
                </div>
              </div>
              <div data-a="menu" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "46px 24px 26px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: "0 0 8px", textAlign: "center", fontSize: "19px", fontWeight: "900", color: "#2E2A27" }}>
                  {"תוספות"}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"אורז צהוב"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"קוסקוס עם ירקות"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"תפוחי אדמה בתנור"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"חמין / דפינה"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }}>
                    {"לפי הזמנה"}
                  </span>
                </div>
              </div>
              <div data-a="menu" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "46px 24px 26px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: "0 0 8px", textAlign: "center", fontSize: "19px", fontWeight: "900", color: "#2E2A27" }}>
                  {"סלטים וממרחים"}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"מטבוחה"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"סלט חצילים"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"חומוס ביתי"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"סלט ישראלי קצוץ"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
              </div>
              <div data-a="menu" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "46px 24px 26px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: "0 0 8px", textAlign: "center", fontSize: "19px", fontWeight: "900", color: "#2E2A27" }}>
                  {"מאפים וקינוחים"}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"חלה מתוקה"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }}>
                    {"אפייה טרייה"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px dashed #DDD1BE" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {"עוגת שמרים"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#2E2A27" }} />
                </div>
              </div>
            </div>
            <a href="tel:+972545437526" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "#2E2A27", color: "#F2EADE", fontSize: "15px", fontWeight: "700", textDecoration: "none", marginTop: "18px" }}>
              {"אני רוצה להזמין, "}
              <span dir="ltr">
                {"054-543-7526"}
              </span>
            </a>
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section aria-labelledby="start" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="start" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"איך מזמינים לשישי"}
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
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "64px" }}>
            <ol data-a="steps" style={{ flex: "1 1 460px", maxWidth: "720px", listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #DDD1BE", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"01"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#A24A1B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"מתקשרים לנציג"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                    {"עד יום רביעי בערב, ב-054-543-7526."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "74px", marginInlineEnd: "110px", border: "1px solid #DDD1BE", borderTop: "0", borderInlineEnd: "0", borderRadius: "0 0 18px 0" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexDirection: "row-reverse", textAlign: "left" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #DDD1BE", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"02"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#A24A1B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px", alignItems: "flex-end" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"אומרים מה וכמה"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                    {"המחיר לפי משקל, והנציג עוזר לכוון כמויות לפי מספר הסועדים."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "110px", marginInlineEnd: "74px", border: "1px solid #DDD1BE", borderTop: "0", borderInlineStart: "0", borderRadius: "0 0 0 18px" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 10px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #DDD1BE", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", fontWeight: "900" }}>
                  {"03"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#A24A1B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"מקבלים בשישי בבוקר"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#2E2A27" }}>
                    {"איסוף מקרית גת, או משלוח עד הבית. חינם מעל 250 ₪."}
                  </span>
                </span>
              </li>
            </ol>
            <img src="/images/site/tagine_white.jpg" data-a="reveal" alt="טאג׳ין לבן עם תבשיל בקר ואורז" style={{ flex: "1 1 400px", maxWidth: "520px", width: "100%", aspectRatio: "1 / 1.15", objectFit: "cover", borderRadius: "22px", display: "block" }} />
          </div>
        </div>
      </section>
      {" "}
      {" "}
      <section aria-labelledby="s5" style={{ padding: "96px clamp(24px, 5vw, 80px)", background: "#EADFCD" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s5" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"שאלות על מכירת שישי"}
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
          <div style={{ marginTop: "24px", width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"איך מזמינים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#2E2A27" }}>
                {"רק בטלפון, מול נציג, ב-054-543-7526. אפשר גם להשאיר פרטים בטופס, ונציג יחזור אליכם."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"עד מתי אפשר להזמין?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#2E2A27" }}>
                {"עד יום רביעי בערב, לשישי הקרוב."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"יש מינימום הזמנה?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#2E2A27" }}>
                {"לא. אפשר להזמין גם קופסה אחת של מטבוחה."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"כמה עולה משלוח?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#2E2A27" }}>
                {"בהזמנה מעל 250 ₪ המשלוח חינם. בהזמנה קטנה יותר הנציג יגיד לכם את דמי המשלוח לאזור שלכם."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"איך מתומחר האוכל?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#2E2A27" }}>
                {"לפי משקל. הנציג יעזור לכם להחליט כמה צריך לשולחן שלכם."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"איפה אוספים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#EADFCD", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#2E2A27" }}>
                {"בקרית גת, ביום שישי בבוקר."}
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
            {"מזמינים לשישי"}
          </h2>
          <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "16px", lineHeight: "1.75", color: "#2E2A27", maxWidth: "620px" }}>
            {"מתקשרים לנציג, או משאירים פרטים כאן ונחזור אליכם. סמנו מראש מה מעניין אתכם, ונגיע לשיחה עם התשובות."}
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
          {formOpen ? (<>
            
            <form data-a="panel" style={{ marginTop: "30px", width: "100%", maxWidth: "1100px", background: "#EADFCD", padding: "clamp(32px, 5vw, 64px) clamp(22px, 5vw, 64px) clamp(28px, 4vw, 48px)", boxSizing: "border-box", clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0 100%)", display: "flex", flexDirection: "column", gap: "34px" }} onSubmit={(e) => { e.preventDefault(); send(e) }} noValidate>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "18px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", borderRadius: "18px", padding: "22px 26px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <b style={{ fontSize: "20px" }}>
                    {"ההזמנות לשישי נסגרות בטלפון, מול נציג"}
                  </b>
                  <span style={{ fontSize: "15px", opacity: "0.9" }}>
                    {"ראשון עד רביעי בערב. אין מינימום הזמנה, משלוח חינם מעל 250 ₪."}
                  </span>
                </span>
                <a href="tel:+972545437526" dir="ltr" style={{ minHeight: "52px", display: "inline-flex", alignItems: "center", padding: "0 26px", borderRadius: "999px", background: "#FFFFFF", color: "#2E2A27", fontSize: "20px", fontWeight: "900", textDecoration: "none" }}>
                  {"054-543-7526"}
                </a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px 24px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"שם מלא"}
                    <span aria-hidden="true" style={{ color: "#2E2A27", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <input className="fld" type="text" name="name" required aria-required="true" />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"טלפון"}
                    <span aria-hidden="true" style={{ color: "#2E2A27", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <input className="fld" type="tel" name="phone" required aria-required="true" dir="ltr" style={{ textAlign: "right" }} />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px 24px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"עיר או יישוב"}
                    <span aria-hidden="true" style={{ color: "#2E2A27", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <input className="fld" type="text" name="city" placeholder="למשל קרית גת" required aria-required="true" />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"מתי נוח שנחזור אליכם?"}
                  </span>
                  <select className="fld" name="when">
                    <option value="">
                      {"בחרו"}
                    </option>
                    <option>
                      {"עכשיו"}
                    </option>
                    <option>
                      {"בבוקר"}
                    </option>
                    <option>
                      {"בצהריים"}
                    </option>
                    <option>
                      {"אחר הצהריים"}
                    </option>
                  </select>
                </label>
              </div>
              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                <legend style={{ padding: "0", marginBottom: "12px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"איך תרצו לקבל את ההזמנה?"}
                    <span aria-hidden="true" style={{ color: "#2E2A27", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#2E2A27" }}>
                    {"משלוח חינם בהזמנה מעל 250 ₪."}
                  </span>
                </legend>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                  <label className="opt">
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M24 44s14-13 14-24a14 14 0 0 0-28 0c0 11 14 24 14 24zM24 25a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
                    </svg>
                    <input type="radio" name="pickup" defaultValue="איסוף מקרית גת, שישי בבוקר" required />
                    {"איסוף מקרית גת, שישי בבוקר"}
                  </label>
                  <label className="opt">
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 30V14h22v16M28 20h8l6 6v4H28M13 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM35 38a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 34h14" />
                    </svg>
                    <input type="radio" name="pickup" defaultValue="משלוח עד הבית" />
                    {"משלוח עד הבית"}
                  </label>
                </div>
              </fieldset>
              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                <legend style={{ padding: "0", marginBottom: "12px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"כמה סועדים יהיו בשולחן?"}
                    <span aria-hidden="true" style={{ color: "#2E2A27", marginInlineStart: "4px" }}>
                      {"*"}
                    </span>
                  </span>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#2E2A27" }}>
                    {"המחיר לפי משקל, והנציג יעזור לכם לכוון כמויות."}
                  </span>
                </legend>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
                  <label className="opt">
                    <input type="radio" name="diners" defaultValue="2–4" required />
                    {"2–4"}
                  </label>
                  <label className="opt">
                    <input type="radio" name="diners" defaultValue="5–8" />
                    {"5–8"}
                  </label>
                  <label className="opt">
                    <input type="radio" name="diners" defaultValue="9–14" />
                    {"9–14"}
                  </label>
                  <label className="opt">
                    <input type="radio" name="diners" defaultValue="15 ומעלה" />
                    {"15 ומעלה"}
                  </label>
                </div>
              </fieldset>
              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "18px", minWidth: "0" }}>
                <legend style={{ padding: "0", marginBottom: "14px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"מה מעניין אתכם מהתפריט?"}
                  </span>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#2E2A27" }}>
                    {"לא חובה. סמנו מנות וכתבו כמות משוערת, למשל חצי קילו או שתי חלות."}
                  </span>
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="26" height="26" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                    </svg>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#2E2A27" }}>
                      {"מנות עיקריות"}
                    </span>
                    <span style={{ flexGrow: "1", height: "1px", background: "#DDD1BE" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="עוף בזיתים ולימון כבוש" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"עוף בזיתים ולימון כבוש"}
                          <span style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#2E2A27" }}>
                            {"מתכון מרוקאי"}
                          </span>
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות עוף בזיתים ולימון כבוש, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="דג חריימה" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"דג חריימה"}
                          <span style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#2E2A27" }}>
                            {"ברוטב פיקנטי"}
                          </span>
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות דג חריימה, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="קציצות ברוטב עגבניות" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"קציצות ברוטב עגבניות"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות קציצות ברוטב עגבניות, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="תבשיל שעועית לבנה" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"תבשיל שעועית לבנה"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות תבשיל שעועית לבנה, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="26" height="26" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 34h40M8 34a16 16 0 0 1 32 0M24 18v-4M20 14h8M8 40h32" />
                    </svg>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#2E2A27" }}>
                      {"תוספות"}
                    </span>
                    <span style={{ flexGrow: "1", height: "1px", background: "#DDD1BE" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="אורז צהוב" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"אורז צהוב"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות אורז צהוב, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="קוסקוס עם ירקות" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"קוסקוס עם ירקות"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות קוסקוס עם ירקות, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="תפוחי אדמה בתנור" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"תפוחי אדמה בתנור"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות תפוחי אדמה בתנור, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="חמין / דפינה" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"חמין / דפינה"}
                          <span style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#2E2A27" }}>
                            {"לפי הזמנה"}
                          </span>
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות חמין / דפינה, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="26" height="26" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M10 6h22l6 6v30H10zM32 6v6h6M16 20h16M16 26h16M16 32h10" />
                    </svg>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#2E2A27" }}>
                      {"סלטים וממרחים"}
                    </span>
                    <span style={{ flexGrow: "1", height: "1px", background: "#DDD1BE" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="מטבוחה" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"מטבוחה"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות מטבוחה, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="סלט חצילים" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"סלט חצילים"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות סלט חצילים, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="חומוס ביתי" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"חומוס ביתי"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות חומוס ביתי, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="סלט ישראלי קצוץ" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"סלט ישראלי קצוץ"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות סלט ישראלי קצוץ, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="26" height="26" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M10 20h28v20H10zM6 14h36v6H6zM24 14v26M24 14c-4-8-12-6-8 0M24 14c4-8 12-6 8 0" />
                    </svg>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#2E2A27" }}>
                      {"מאפים וקינוחים"}
                    </span>
                    <span style={{ flexGrow: "1", height: "1px", background: "#DDD1BE" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="חלה מתוקה" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"חלה מתוקה"}
                          <span style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#2E2A27" }}>
                            {"אפייה טרייה"}
                          </span>
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות חלה מתוקה, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
                      <label className="opt chk" style={{ flex: "1 1 auto" }}>
                        <input type="checkbox" name="dish" defaultValue="עוגת שמרים" />
                        <span className="box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        </span>
                        <span>
                          {"עוגת שמרים"}
                        </span>
                      </label>
                      <input className="fld" type="text" placeholder="כמה?" aria-label="כמות עוגת שמרים, למשל חצי קילו" style={{ width: "96px", minHeight: "60px", textAlign: "center", padding: "0 6px", flexShrink: "0" }} />
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                <legend style={{ padding: "0", marginBottom: "12px" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                    {"יש רגישויות שכדאי שנדע?"}
                  </span>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#2E2A27" }}>
                    {"אפשר לבחור כמה. את הפרטים כתבו בהערות."}
                  </span>
                </legend>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                  <label className="opt chk">
                    <input type="checkbox" name="diet" defaultValue="ללא גלוטן" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10" />
                    </svg>
                    <span>
                      {"ללא גלוטן"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="diet" defaultValue="בלי חריף" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M20 30V8a4 4 0 0 1 8 0v22a8 8 0 1 1-8 0zM24 18v16" />
                    </svg>
                    <span>
                      {"בלי חריף"}
                    </span>
                  </label>
                  <label className="opt chk">
                    <input type="checkbox" name="diet" defaultValue="אלרגיה אחרת" />
                    <span className="box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#A24A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M12 4h18l8 8v32H12zM30 4v8h8M18 26l4 4 8-8" />
                    </svg>
                    <span>
                      {"אלרגיה אחרת"}
                    </span>
                  </label>
                </div>
              </fieldset>
              <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "17px", fontWeight: "900", color: "#2E2A27" }}>
                  {"הערות"}
                </span>
                <span style={{ display: "block", marginTop: "4px", fontSize: "14px", fontWeight: "500", color: "#2E2A27" }}>
                  {"שעה מועדפת לאיסוף, אלרגיות, או כל דבר אחר."}
                </span>
                <textarea className="fld" name="notes" />
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 24px", paddingTop: "22px", borderTop: "1px solid #DDD1BE" }}>
                <button type="button" onClick={send} style={{ minHeight: "56px", padding: "0 40px", border: "0", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", font: "inherit", fontSize: "17px", fontWeight: "800", display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  {idle ? (<>
                    <span>
                      {"שלחו לי נציג"}
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
                <span style={{ flex: "1 1 280px", fontSize: "14px", lineHeight: "1.6", color: "#2E2A27" }}>
                  {"זו בקשה לשיחה, ההזמנה נסגרת רק בטלפון מול נציג. ההזמנות לשישי נסגרות ביום רביעי בערב."}
                </span>
              </div>
              <span style={{ fontSize: "13px", color: "#2E2A27" }}>
                <span style={{ color: "#2E2A27" }}>
                  {"*"}
                </span>
                {" שדות חובה"}
              </span>
            </form>
            
          </>) : null}
          <div style={{ width: "100%", maxWidth: "1100px", marginTop: "30px", display: "flex" }}>
            {sent ? (<>
              
              <div data-a="thanks" role="status" style={{ flex: "1.4 1 480px", minHeight: "360px", background: "#FFFFFF", border: "1px solid #DDD1BE", borderRadius: "22px", padding: "36px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", textAlign: "center" }}>
                <span data-a="tk-badge" style={{ width: "88px", height: "88px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
                    <circle cx="44" cy="44" r="40" fill="#DDD1BE" />
                    <circle data-a="tk-ring" cx="44" cy="44" r="40" stroke="#A24A1B" strokeWidth="3" transform="rotate(-90 44 44)" />
                    <path data-a="tk-check" d="M28 45l11 11 22-24" stroke="#A24A1B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div data-a="tk-txt" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ margin: "0", fontSize: "24px", fontWeight: "900", color: "#2E2A27" }}>
                    {"קיבלנו, נציג יחזור אליכם"}
                  </h3>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.7", color: "#2E2A27", maxWidth: "420px" }}>
                    {"נציג יתקשר אליכם בשעה שבחרתם כדי לסגור את ההזמנה לשישי. ההזמנות נסגרות ביום רביעי בערב."}
                  </p>
                  <button type="button" onClick={reset} style={{ marginTop: "8px", minHeight: "44px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid #DDD1BE", background: "#FFFFFF", color: "#2E2A27", font: "inherit", fontSize: "15px", fontWeight: "800", cursor: "pointer" }}>
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
