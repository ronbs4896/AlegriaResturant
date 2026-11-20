// Generated from the approved canvas design (Ref-About.html). הקופי של העמוד נמצא כאן.
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import WaButton from '../components/brand/WaButton.jsx'
import { usePageMotion } from '../lib/motion.js'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function About({ seoPath }) {
  const root = usePageMotion()
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#FFFFFF", color: "#2E2A27", fontFamily: "'Birzia', 'Heebo', system-ui, sans-serif", fontWeight: "500" }} data-page="About">
      {" "}
      {" "}
      <section data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "440px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/spread.jpg" data-a="hero-img" alt="עוף עם חומוס, סלטים בקערות ולחם על שולחן עץ" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.8) 0%, rgba(20, 17, 15, 0.55) 50%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", margin: "0", padding: "56px clamp(24px, 5vw, 80px) 90px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
              <Link to="/" style={{ color: "#FFFFFF" }}>
                {"בית"}
              </Link>
              {" / הסיפור שלנו"}
            </nav>
            <h1 id="h1" style={{ margin: "0", fontSize: "clamp(2.3rem, 4.2vw, 3.4rem)", lineHeight: "1.12", fontWeight: "900", maxWidth: "640px" }}>
              {" "}
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"מטבח אחד בקרית גת,"}
                </span>
              </span>
              {" "}
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"יותר מ-25 שנה של סירים מלאים"}
                </span>
              </span>
              {" "}
            </h1>
            <p data-a="hero-fade" style={{ margin: "0", fontSize: "17px", lineHeight: "1.7", color: "rgba(255, 255, 255, 0.9)", maxWidth: "560px" }}>
              {"מהמטבח של אלגריה ועד מטבח מרכזי שמבשל מעל 3,000 ארוחות ביום למפעלים בכל הדרום."}
            </p>
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s2" style={{ padding: "72px clamp(24px, 5vw, 80px) 96px" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s2" data-a="words" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"הכל"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"התחיל"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"במטבח"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"של"}
              </span>
            </span>
            {" "}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <span data-w="" style={{ display: "inline-block" }}>
                {"אלגריה."}
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
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "56px" }}>
            <div style={{ flex: "1 1 420px", position: "relative", minHeight: "400px", maxWidth: "520px" }}>
              {" "}
              <img src="/images/site/mark.jpg" data-a="col1" alt="הדיוקן מהלוגו של קייטרינג אלגריה, האישה שממנה הכל התחיל" style={{ position: "absolute", top: "0", insetInlineStart: "0", width: "56%", aspectRatio: "1 / 0.95", objectFit: "cover", borderRadius: "80px 18px 80px 80px", border: "8px solid #FFFFFF", boxSizing: "border-box", zIndex: "2", background: "#F2EADE" }} />
              {" "}
              <img src="/images/site/friday.jpg" data-a="col2" alt="עוף בזיתים לשבת עם חלות" style={{ position: "absolute", top: "16px", insetInlineEnd: "0", width: "56%", height: "380px", objectFit: "cover", borderRadius: "22px 22px 70px 22px" }} />
              {" "}
              <span data-a="badge" style={{ position: "absolute", bottom: "30px", insetInlineEnd: "44%", width: "96px", height: "96px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #B4511E", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "3" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#B4511E" }}>
                  {"מבשלים מאז"}
                </span>
                <b style={{ fontSize: "19px", lineHeight: "1.1" }}>
                  {"שנות ה-90"}
                </b>
              </span>
              {" "}
            </div>
            <div data-a="fade" style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px" }}>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#5A544E" }}>
                {"אלגריה היא החמות של אושרית. אושרית למדה ממנה לבשל, הייתה צמודה אליה שנים, ובחרה לקרוא לעסק על שמה, כדי שהבישול המרוקאי שלה וטוב הלב שלה יגיעו לעוד הרבה שולחנות."}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.85", color: "#5A544E" }}>
                {"עברו יותר מ-25 שנה. הסירים גדלו, והיום המטבח שלנו בקרית גת מוציא מעל 3,000 ארוחות ביום למפעלים ולמשפחות בכל הדרום. הבישול נשאר שלה, ביד ומכל הלב."}
              </p>
              <blockquote style={{ margin: "4px 0 0", paddingInlineStart: "18px", borderInlineStart: "3px solid #B4511E", fontSize: "20px", lineHeight: "1.5", fontWeight: "900", color: "#2E2A27" }}>
                {"אהבת חינם שבאה לידי ביטוי באוכל. ככה אלגריה בישלה, וככה אנחנו ממשיכים."}
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-labelledby="s3" style={{ padding: "0" }}>
        <div id="values" style={{ width: "100%", margin: "0", background: "#FFF5E8", position: "relative", padding: "80px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box" }}>
          {" "}
          <img src="/images/site/tagine_orange.jpg" data-a="spin" alt="" style={{ position: "absolute", top: "-54px", insetInlineEnd: "7%", width: "170px", height: "170px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.35)", border: "6px solid #FFFFFF" }} />
          {" "}
          <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 id="s3" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"ארבעה דברים"}
              <br />
              {"שלא השתנו מאז המטבח הראשון."}
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
            <div style={{ marginTop: "30px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "22px" }}>
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "270px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 26a8 8 0 1 1 4-15 8 8 0 0 1 12 0 8 8 0 1 1 4 15v10H14zM14 42h20" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"מבשלים כל בוקר מחדש"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"הסירים עולים על האש ביום האספקה עצמו, ולא יום קודם."}
                </p>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "270px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 8h22l6 6v26H10zM32 8v6h6M16 22h16M16 28h16M16 34h10" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"בישול מרוקאי, ביד"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"בלי מכונות ובלי פס ייצור, כמו שאלגריה בישלה בבית."}
                </p>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "270px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"איש קשר אחד"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"בלי מוקד ובלי כרטיס פנייה. מרימים טלפון, ומה שסוכם קורה באותו שבוע."}
                </p>
              </div>{" "}
              {" "}<div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", minHeight: "270px", boxSizing: "border-box" }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10" />
                </svg>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", lineHeight: "1.3", fontWeight: "900" }}>
                  {"כשרות ושרשרת חום"}
                </h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"בהשגחת הרבנות הראשית קרית גת, וחם כשזה מגיע לחדר האוכל."}
                </p>
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
            {"מהמטבח הראשון ועד מעל 3,000 ארוחות ביום"}
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
          <div style={{ width: "100%", marginTop: "30px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px" }}>
            <ol data-a="steps" style={{ flex: "1 1 440px", listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span style={{ minWidth: "50px", height: "50px", padding: "0 8px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "900" }}>
                  {"שנות ה-90"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"מטבח אחד בקרית גת"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"אלגריה מבשלת בבית את המטבח המרוקאי, ואושרית לומדת לידה כל מתכון."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "74px", marginInlineEnd: "110px", border: "1px solid #F0C99A", borderTop: "0", borderInlineEnd: "0", borderRadius: "0 0 18px 0" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexDirection: "row-reverse", textAlign: "left" }}>
                <span dir="ltr" style={{ minWidth: "50px", height: "50px", padding: "0 8px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", fontWeight: "900" }}>
                  {"25+"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px", alignItems: "flex-end" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"הסירים גדלו, המפעלים נשארו"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"16 מתוך 17 המפעלים שלנו איתנו יותר משנתיים, והשבעה עשר עזב רק כי נסגר."}
                  </span>
                </span>
              </li>
              <li data-a="conn" aria-hidden="true" style={{ height: "48px", marginInlineStart: "110px", marginInlineEnd: "74px", border: "1px solid #F0C99A", borderTop: "0", borderInlineStart: "0", borderRadius: "0 0 0 18px" }} />
              <li data-a="step" style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <span style={{ minWidth: "50px", height: "50px", padding: "0 8px", boxSizing: "border-box", flexShrink: "0", borderRadius: "999px", border: "3px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "900" }}>
                  {"היום"}
                </span>
                <span style={{ width: "12px", height: "12px", flexShrink: "0", marginTop: "19px", borderRadius: "50%", background: "#F5A33B" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "6px" }}>
                  <b style={{ fontSize: "17px" }}>
                    {"מטבח מרכזי, מעל 3,000 ארוחות ביום"}
                  </b>
                  <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#5A544E" }}>
                    {"אותם סירים יוצאים למפעלים בדרום, לאירועים ולשולחן של שישי."}
                  </span>
                </span>
              </li>
            </ol>
            <img src="/images/site/tagine_blue.jpg" data-a="reveal" alt="טאג׳ין טורקיז עם בקר, ירקות וקוסקוס" style={{ flex: "1 1 400px", maxWidth: "470px", width: "100%", aspectRatio: "1 / 1.15", objectFit: "cover", borderRadius: "22px", display: "block" }} />
          </div>
        </div>
      </section>
      {" "}
      <section id="team" aria-labelledby="team-h" style={{ padding: "88px clamp(24px, 5vw, 80px) 96px", background: "#FFF9F1" }}>
        <div style={{ width: "100%", margin: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="team-h" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: "1.15", fontWeight: "900", color: "#2E2A27" }}>
            {"האנשים "}
            <span style={{ color: "#B4511E", fontWeight: "300", fontStyle: "italic" }}>
              {"שמאחורי הסירים"}
            </span>
          </h2>
          <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "17px", lineHeight: "1.75", color: "#5A544E", maxWidth: "680px" }}>
            {"עסק משפחתי מקרית גת. אלה האנשים שמובילים את המטבח ואת המשאיות שיוצאות כל בוקר."}
          </p>
          <div style={{ marginTop: "48px", width: "100%", maxWidth: "1100px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px 24px" }}>
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
              <div data-a="avatar" style={{ position: "relative", width: "168px", height: "168px" }}>
                {" "}
                <span data-a="ring" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "conic-gradient(from 0deg, #B4511E 0deg 62deg, transparent 62deg 72deg, #F0C99A 72deg 118deg, transparent 118deg 128deg, #B4511E 128deg 200deg, transparent 200deg 210deg, #F5A33B 210deg 268deg, transparent 268deg 278deg, #E3C77E 278deg 350deg, transparent 350deg 360deg)", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))" }} />
                {" "}
                <span style={{ position: "absolute", inset: "20px", borderRadius: "50%", background: "#F2EADE", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {" "}
                  {" "}
                  {" "}
                    <span style={{ fontSize: "56px", fontWeight: "900", color: "#2E2A27", lineHeight: "1" }}>
                      {"א"}
                    </span>
                    {" "}
                  {" "}
                  {" "}
                </span>
                {" "}
              </div>
              <h3 style={{ margin: "12px 0 0", fontSize: "19px", fontWeight: "900" }}>
                {"אושרית בן שושן"}
              </h3>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "#B4511E" }}>
                {"מייסדת ובעלים"}
              </span>
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
              <div data-a="avatar" style={{ position: "relative", width: "168px", height: "168px" }}>
                {" "}
                <span data-a="ring" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "conic-gradient(from 47deg, #F5A33B 0deg 62deg, transparent 62deg 72deg, #B4511E 72deg 118deg, transparent 118deg 128deg, #B4511E 128deg 200deg, transparent 200deg 210deg, #E3C77E 210deg 268deg, transparent 268deg 278deg, #F0C99A 278deg 350deg, transparent 350deg 360deg)", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))" }} />
                {" "}
                <span style={{ position: "absolute", inset: "20px", borderRadius: "50%", background: "#FDEBD3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {" "}
                  {" "}
                  {" "}
                    <span style={{ fontSize: "56px", fontWeight: "900", color: "#2E2A27", lineHeight: "1" }}>
                      {"ע"}
                    </span>
                    {" "}
                  {" "}
                  {" "}
                </span>
                {" "}
              </div>
              <h3 style={{ margin: "12px 0 0", fontSize: "19px", fontWeight: "900" }}>
                {"עמית בן שושן"}
              </h3>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "#B4511E" }}>
                {"מנכ״ל"}
              </span>
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
              <div data-a="avatar" style={{ position: "relative", width: "168px", height: "168px" }}>
                {" "}
                <span data-a="ring" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "conic-gradient(from 94deg, #E3C77E 0deg 62deg, transparent 62deg 72deg, #B4511E 72deg 118deg, transparent 118deg 128deg, #F0C99A 128deg 200deg, transparent 200deg 210deg, #B4511E 210deg 268deg, transparent 268deg 278deg, #F5A33B 278deg 350deg, transparent 350deg 360deg)", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))" }} />
                {" "}
                <span style={{ position: "absolute", inset: "20px", borderRadius: "50%", background: "#F2E7CF", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {" "}
                  {" "}
                  {" "}
                    <span style={{ fontSize: "56px", fontWeight: "900", color: "#2E2A27", lineHeight: "1" }}>
                      {"ר"}
                    </span>
                    {" "}
                  {" "}
                  {" "}
                </span>
                {" "}
              </div>
              <h3 style={{ margin: "12px 0 0", fontSize: "19px", fontWeight: "900" }}>
                {"רון בן שושן"}
              </h3>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "#B4511E" }}>
                {"סמנכ״ל טכנולוגיה וכספים"}
              </span>
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
              <div data-a="avatar" style={{ position: "relative", width: "168px", height: "168px" }}>
                {" "}
                <span data-a="ring" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "conic-gradient(from 141deg, #B4511E 0deg 62deg, transparent 62deg 72deg, #F0C99A 72deg 118deg, transparent 118deg 128deg, #B4511E 128deg 200deg, transparent 200deg 210deg, #F5A33B 210deg 268deg, transparent 268deg 278deg, #E3C77E 278deg 350deg, transparent 350deg 360deg)", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))" }} />
                {" "}
                <span style={{ position: "absolute", inset: "20px", borderRadius: "50%", background: "#F2EADE", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {" "}
                  {" "}
                  {" "}
                    <span style={{ fontSize: "56px", fontWeight: "900", color: "#2E2A27", lineHeight: "1" }}>
                      {"נ"}
                    </span>
                    {" "}
                  {" "}
                  {" "}
                </span>
                {" "}
              </div>
              <h3 style={{ margin: "12px 0 0", fontSize: "19px", fontWeight: "900" }}>
                {"נהוראי בן שושן"}
              </h3>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "#B4511E" }}>
                {"מנהל תפעול"}
              </span>
            </div>{" "}
          </div>
        </div>
      </section>
      {" "}
      <section aria-label="המטבח במספרים" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", padding: "52px clamp(24px, 5vw, 80px)", boxSizing: "border-box" }}>
          {" "}
          <div style={{ width: "100%", margin: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", textAlign: "center" }}>
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
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
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
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
            </div>{" "}
            {" "}<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span data-a="stat-ic" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(255, 255, 255, 0.8)", color: "#2E2A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 42V20l10 6v-6l10 6V12l16 8v22zM6 42h36M14 34h4M24 34h4M34 34h4" />
                </svg>
              </span>
              <span dir="ltr" data-count="97" data-suf="%" style={{ fontSize: "48px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
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
      <section id="contact" aria-labelledby="s7" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div data-a="panel" style={{ width: "100%", margin: "0", background: "#FFF5E8", borderRadius: "26px", padding: "48px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 id="s7" style={{ margin: "0", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"רוצים להכיר אותנו מקרוב?"}
            </h2>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.8", color: "#5A544E" }}>
              {"שיחה קצרה בטלפון על המפעל שלכם, והצעה כתובה לרוב עוד באותו יום."}
            </p>
            <ul style={{ listStyle: "none", margin: "8px 0 0", padding: "0", display: "flex", flexWrap: "wrap", gap: "12px 24px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M24 30a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM24 12l2 4.5 4.8.5-3.6 3.2 1 4.8L24 22.6 19.8 25l1-4.8-3.6-3.2 4.8-.5zM16 28l-3 15 11-6 11 6-3-15" />
                  </svg>
                </span>
                {"25+ שנות ניסיון"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 22h32v6a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 28zM4 22h40M18 16c0-4 3-4 3-8M27 16c0-4 3-4 3-8" />
                  </svg>
                </span>
                {"מעל 3,000 ארוחות ביום"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 42V20l10 6v-6l10 6V12l16 8v22zM6 42h36M14 34h4M24 34h4M34 34h4" />
                  </svg>
                </span>
                {"97% מהסועדים מרוצים"}
              </li>
            </ul>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "18px" }}>
            <a href="tel:+972545437526" dir="ltr" style={{ fontSize: "26px", fontWeight: "900", color: "#2E2A27", textDecoration: "none" }}>
              {"054-543-7526"}
            </a>
            <WaButton style={{ alignSelf: "flex-start" }} />
            <Link to="/factories#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "16px", fontWeight: "700", textDecoration: "none" }}>
              {"הצעת מחיר למפעל"}
            </Link>
          </div>
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}
