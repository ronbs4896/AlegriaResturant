// Generated from the approved canvas design (Ref-Contact.html). הקופי של העמוד נמצא כאן.
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import WaButton, { WaIcon } from '../components/brand/WaButton.jsx'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function Contact({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("צור קשר")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#FFFFFF", color: "#2E2A27", fontFamily: "'Birzia', 'Heebo', system-ui, sans-serif", fontWeight: "500" }} data-page="Contact">
      {" "}
      {" "}
      <section data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "480px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/matbucha.jpg" data-a="hero-img" alt="בשר עם חומוס, מטבוחה ולחם" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.82) 0%, rgba(20, 17, 15, 0.58) 50%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", padding: "56px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
              <Link to="/" style={{ color: "#FFFFFF" }}>
                {"בית"}
              </Link>
              {" / צור קשר"}
            </nav>
            <h1 id="h1" style={{ margin: "0", fontSize: "clamp(2.3rem, 4.2vw, 3.5rem)", lineHeight: "1.12", fontWeight: "900", maxWidth: "760px" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"שיחה קצרה בטלפון,"}
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"והצעה כתובה באותו יום"}
                </span>
              </span>
            </h1>
            <p data-a="hero-fade" style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "rgba(255, 255, 255, 0.9)", maxWidth: "600px" }}>
              {"מפעל, אירוע או שבת, ספרו לנו מה צריך ונחזור אליכם עם תפריט והצעה."}
            </p>
            <div data-a="hero-fade" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#contact" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 28px", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"לטופס"}
              </a>
              <a href="tel:+972545437526" dir="ltr" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", padding: "0 22px", borderRadius: "999px", border: "1.5px solid rgba(255, 255, 255, 0.8)", color: "#FFFFFF", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {"054-543-7526"}
              </a>
              <WaButton variant="hero" />
            </div>
          </div>
        </div>
      </section>
      {" "}
      <section aria-label="דרכי יצירת קשר" style={{ padding: "54px 0 0" }}>
        <div style={{ width: "100%", background: "#FFF5E8", position: "relative", padding: "80px clamp(24px, 5vw, 80px) 88px", boxSizing: "border-box" }}>
          {" "}
          <img src="/images/site/couscous.jpg" data-a="spin" alt="" style={{ position: "absolute", top: "-54px", insetInlineEnd: "7%", width: "170px", height: "170px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.35)", border: "6px solid #FFFFFF" }} />
          {" "}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 id="s2" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"ארבע דרכים להגיע אלינו"}
            </h2>
            <p data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "16px", lineHeight: "1.75", color: "#5A544E", maxWidth: "620px" }}>
              {"הכי מהר זה טלפון. עונים בשעות הפעילות, ולרוב חוזרים עוד באותו יום."}
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
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center", minHeight: "230px", boxSizing: "border-box" }}>
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
                </svg>
                <h2 style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: "900" }}>
                  {"טלפון"}
                </h2>
                <div style={{ fontSize: "15px", lineHeight: "1.7", color: "#5A544E" }}>
                  <a href="tel:+972545437526" dir="ltr" style={{ fontSize: "20px", fontWeight: "900", color: "#2E2A27", textDecoration: "none" }}>
                    {"054-543-7526"}
                  </a>
                </div>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center", minHeight: "230px", boxSizing: "border-box" }}>
                <WaIcon size={40} />
                <h2 style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: "900" }}>
                  {"וואטסאפ"}
                </h2>
                <div style={{ fontSize: "15px", lineHeight: "1.7", color: "#5A544E" }}>
                  <WaButton variant="inline" label="שלחו הודעה" />
                </div>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center", minHeight: "230px", boxSizing: "border-box" }}>
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 42a18 18 0 1 0 0-36 18 18 0 0 0 0 36zM24 14v10l7 5" />
                </svg>
                <h2 style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: "900" }}>
                  {"שעות פעילות"}
                </h2>
                <div style={{ fontSize: "15px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"ראשון עד חמישי "}
                  <span dir="ltr">
                    {"08:00–16:00"}
                  </span>
                  <br />
                  {"שישי "}
                  <span dir="ltr">
                    {"07:00–14:00"}
                  </span>
                </div>
              </div>
              <div data-a="card" style={{ background: "#FFFFFF", borderRadius: "120px 120px 14px 14px", padding: "40px 22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center", minHeight: "230px", boxSizing: "border-box" }}>
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#B4511E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 44s14-13 14-24a14 14 0 0 0-28 0c0 11 14 24 14 24zM24 25a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
                </svg>
                <h2 style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: "900" }}>
                  {"אזור שירות"}
                </h2>
                <div style={{ fontSize: "15px", lineHeight: "1.7", color: "#5A544E" }}>
                  {"קרית גת וכל הדרום"}
                </div>
              </div>
            </div>
            <div data-a="title" style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"קרית גת"}
              </span>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"אשקלון"}
              </span>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"אשדוד"}
              </span>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"באר שבע"}
              </span>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"שדרות"}
              </span>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"נתיבות"}
              </span>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"אופקים"}
              </span>
              <span style={{ fontSize: "15px", fontWeight: "700", padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #FDEBD3" }}>
                {"קרית מלאכי"}
              </span>
            </div>
          </div>
          {" "}
        </div>
      </section>
      {" "}
      <section id="contact" aria-labelledby="cta-h" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div data-a="panel" style={{ width: "100%", background: "#FFF5E8", borderRadius: "26px", padding: "clamp(28px, 4vw, 56px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
          <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 id="cta-h" style={{ margin: "0", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"ספרו לנו מה צריך"}
            </h2>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.8", color: "#5A544E", maxWidth: "480px" }}>
              {"כמה פרטים, ונחזור אליכם בהקדם. הזמנה לשישי? היא נסגרת בטלפון מול נציג."}
            </p>
            <a href="tel:+972545437526" dir="ltr" style={{ textAlign: "right", fontSize: "30px", fontWeight: "900", color: "#2E2A27", textDecoration: "none" }}>
              {"054-543-7526"}
            </a>
            <WaButton style={{ alignSelf: "flex-start" }} />
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
                {"הצעה כתובה, לרוב עוד באותו יום"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
                  </svg>
                </span>
                {"איש קשר אחד עם טלפון ישיר"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10" />
                  </svg>
                </span>
                {"מטבח בשרי בהשגחת הרבנות"}
              </li>
            </ul>
          </div>
          {formOpen ? (<>
            
            <form style={{ flex: "1.4 1 480px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }} onSubmit={(e) => { e.preventDefault(); send(e) }} noValidate>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"במה מדובר "}
                <select style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "500" }} name="במה מדובר">
                  <option>
                    {"הסעדה יומית למפעל"}
                  </option>
                  <option>
                    {"ארוחות מסובסדות לעובדים"}
                  </option>
                  <option>
                    {"אירוע חברה"}
                  </option>
                  <option>
                    {"אירוע פרטי"}
                  </option>
                  <option>
                    {"מכירת שישי"}
                  </option>
                  <option>
                    {"משהו אחר"}
                  </option>
                </select>
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"שם "}
                <input type="text" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "500" }} name="שם" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"שם החברה (אם יש) "}
                <input type="text" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "500" }} name="שם החברה (אם יש)" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"טלפון "}
                <input type="tel" dir="ltr" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "500", textAlign: "right" }} name="טלפון" required />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700", gridColumn: "1 / -1" }}>
                {"הודעה "}
                <textarea rows="3" style={{ borderRadius: "22px", border: "1px solid #EFDCC4", background: "#FFFFFF", padding: "14px 18px", font: "inherit", fontWeight: "500", resize: "vertical" }} name="הודעה" />
              </label>
              <button type="button" onClick={send} style={{ gridColumn: "1 / -1", minHeight: "52px", border: "0", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", font: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
                {idle ? (<>
                  <span>
                    {"שלחו לי תשובה"}
                  </span>
                </>) : null}
                {sending ? (<>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    <span className="spin" aria-hidden="true" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(46, 42, 39, 0.3)", borderTopColor: "#2E2A27" }} />
                    {"שולחים"}
                  </span>
                </>) : null}
              </button>
              <WaButton variant="inline" label="או בוואטסאפ" style={{ gridColumn: "1 / -1", justifySelf: "center" }} />
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
                <h3 style={{ margin: "0", fontSize: "24px", fontWeight: "900", color: "#2E2A27" }}>
                  {"קיבלנו את הפרטים"}
                </h3>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.7", color: "#5A544E", maxWidth: "420px" }}>
                  {"נחזור אליכם בהקדם, לרוב עוד באותו יום. דחוף? חייגו 054-543-7526."}
                </p>
                <button type="button" onClick={reset} style={{ marginTop: "8px", minHeight: "44px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid #FDEBD3", background: "#FFFFFF", color: "#2E2A27", font: "inherit", fontSize: "15px", fontWeight: "800", cursor: "pointer" }}>
                  {"שליחה נוספת"}
                </button>
              </div>
            </div>
            
          </>) : null}
        </div>
      </section>
      {" "}
      {" "}
      <section aria-labelledby="s5" style={{ padding: "96px clamp(24px, 5vw, 80px)", background: "#FFF5E8" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <h2 id="s5" data-a="title" style={{ margin: "0", textAlign: "center", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
            {"לפני שמתקשרים"}
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
                {"כמה מהר חוזרים?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"לרוב עוד באותו יום, בשעות הפעילות."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"איפה המטבח?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"בקרית גת. משם אנחנו מספקים לכל הדרום."}
              </p>
              {" "}
            </details>
            <details data-a="faq" style={{ background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "16px", padding: "18px 22px" }}>
              {" "}
              <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "17px", fontWeight: "900", minHeight: "32px", listStyle: "none" }}>
                {"איך מזמינים לשישי?"}
                <span aria-hidden="true" style={{ width: "30px", height: "30px", flexShrink: "0", borderRadius: "50%", background: "#FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  {"+"}
                </span>
              </summary>
              {" "}
              <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.75", color: "#5A544E" }}>
                {"רק בטלפון, מול נציג, עד יום רביעי בערב."}
              </p>
              {" "}
            </details>
          </div>
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}
