// Footer, generated from the approved canvas design.
import { Link } from 'react-router-dom'
import WaButton from './WaButton.jsx'

export default function SiteFooter() {
  return (
    <>
      <footer style={{ background: "#FFF9F1", borderTop: "1px solid #FDEBD3", padding: "96px clamp(24px, 5vw, 80px) 0" }}>
      <div style={{ width: "100%" }}>
        {" "}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "48px" }}>
          <div style={{ flex: "1 1 340px", maxWidth: "460px", display: "flex", flexDirection: "column", gap: "22px" }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "#2E2A27", textDecoration: "none", alignSelf: "flex-start" }}>
              {" "}
              <img src="/images/site/mark.jpg" alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "1px solid #FDEBD3" }} />
              {" "}
              <span style={{ fontSize: "22px", fontWeight: "900" }}>
                {"קייטרינג אלגריה"}
              </span>
              {" "}
            </Link>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.8", color: "#5A544E" }}>
              {"מטבח בשרי כשר בקרית גת שמבשל כל בוקר מעל 3,000 ארוחות חמות. הסעדה יומית למפעלים, אירועים ומכירת שישי בכל הדרום."}
            </p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "700", color: "#2E2A27" }}>
              {" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
                <path d="M8.5 12l2.5 2.5 4.5-5" />
              </svg>
              {" כשרות בהשגחת הרבנות הראשית קרית גת "}
            </span>
            <ul aria-label="הרשתות שלנו" style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", gap: "12px" }}>
              <li>
                <WaButton variant="icon" source="footer" />
              </li>
            </ul>
          </div>
          <div style={{ flex: "1 1 560px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px clamp(24px, 4vw, 72px)" }}>
            <nav aria-label="השירותים שלנו">
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "900", color: "#2E2A27" }}>
                {"השירותים שלנו"}
              </h3>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "15px" }}>
                <li>
                  <Link to="/factories" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"הסעדה יומית למפעלים"}
                  </Link>
                </li>
                <li>
                  <Link to="/services/subsidized-meals" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"ארוחות מסובסדות לעובדים"}
                  </Link>
                </li>
                <li>
                  <Link to="/services/corporate-events" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"אירועי חברה וימי גיבוש"}
                  </Link>
                </li>
                <li>
                  <Link to="/services/event-catering" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"אירועים פרטיים"}
                  </Link>
                </li>
                <li>
                  <Link to="/friday" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"מכירת שישי"}
                  </Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="קייטרינג אלגריה">
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "900", color: "#2E2A27" }}>
                {"קייטרינג אלגריה"}
              </h3>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "15px" }}>
                <li>
                  <Link to="/" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"דף הבית"}
                  </Link>
                </li>
                <li>
                  <Link to="/about" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"הסיפור שלנו"}
                  </Link>
                </li>
                <li>
                  <Link to="/kitchen" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"המטבח שלנו וכשרות"}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"בלוג"}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"צור קשר"}
                  </Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="דברו איתנו">
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "900", color: "#2E2A27" }}>
                {"דברו איתנו"}
              </h3>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "15px" }}>
                <li>
                  <a href="tel:+972545437526" dir="ltr" style={{ color: "#2E2A27", textDecoration: "none", fontSize: "20px", fontWeight: "900", minHeight: "36px", display: "inline-flex", alignItems: "center" }}>
                    {"054-543-7526"}
                  </a>
                </li>
                <li>
                  <WaButton variant="inline" label="וואטסאפ לעמית" source="footer" />
                </li>
                <li style={{ color: "#5A544E", lineHeight: "1.7" }}>
                  {"ראשון עד חמישי "}
                  <span dir="ltr">
                    {"08:00–16:00"}
                  </span>
                  <br />
                  {"שישי "}
                  <span dir="ltr">
                    {"07:00–14:00"}
                  </span>
                </li>
                <li style={{ color: "#5A544E" }}>
                  {"קרית גת וכל הדרום"}
                </li>
                <li>
                  <Link to="/contact" style={{ color: "#5A544E", textDecoration: "none", fontWeight: "600", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    <span style={{ color: "#2E2A27", fontWeight: "800" }}>
                      {"אני רוצה הצעת מחיר"}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {" "}
        <div style={{ marginTop: "56px", padding: "28px 0 32px", borderTop: "1px solid #FDEBD3", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px 32px", fontSize: "13px", fontWeight: "600", color: "#2E2A27" }}>
          <p style={{ margin: "0" }}>
            {"© "}
            <span dir="ltr">
              {"2026"}
            </span>
            {" קייטרינג אלגריה. כל הזכויות שמורות."}
          </p>
          <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "4px 24px" }}>
            <li>
              <Link to="/privacy" style={{ color: "#5A544E", textDecoration: "none", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                {"מדיניות פרטיות"}
              </Link>
            </li>
            <li>
              <Link to="/accessibility" style={{ color: "#5A544E", textDecoration: "none", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                {"הצהרת נגישות"}
              </Link>
            </li>
          </ul>
        </div>
        {" "}
      </div>
    </footer>
    </>
  )
}
