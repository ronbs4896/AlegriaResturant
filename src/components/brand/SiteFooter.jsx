// Footer, generated from the approved canvas design.
// ds-normalized
// mobile-fixed
import { Link } from 'react-router-dom'
import WaButton from './WaButton.jsx'
import { openCookieSettings } from '../../lib/consent.js'
import { ShieldCheck as PhShieldCheck } from '@phosphor-icons/react'

export default function SiteFooter() {
  return (
    <>
      <footer style={{ background: "#FFF9F1", borderTop: "1px solid #FDEBD3", padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px) 0" }}>
      <div style={{ width: "100%" }}>
        {" "}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "48px" }}>
          <div style={{ flex: "1 1 340px", maxWidth: "460px", display: "flex", flexDirection: "column", gap: "22px" }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "#2E2A27", textDecoration: "none", alignSelf: "flex-start" }}>
              {" "}
              <img src="/images/site/mark.jpg" alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "1px solid #FDEBD3" }} />
              {" "}
              <span style={{ fontSize: "22px", fontWeight: "700" }}>
                {"קייטרינג אלגריה"}
              </span>
              {" "}
            </Link>
            <p style={{ margin: "0", fontSize: "var(--fs-body-sm)", lineHeight: "1.7", color: "#4A4540" }}>
              {"מטבח בשרי כשר בקרית גת שמבשל כל בוקר מעל 3,000 ארוחות חמות. הסעדה יומית למפעלים, אירועים ומכירת שישי בכל הדרום."}
            </p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "700", color: "#2E2A27" }}>
              {" "}
              <PhShieldCheck size={18} weight="regular" aria-hidden="true" />
              {" כשרות בהשגחת הרבנות הראשית קרית גת "}
            </span>
            <ul aria-label="הרשתות שלנו" style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", gap: "12px" }}>
              <li>
                <WaButton variant="icon" source="footer" />
              </li>
            </ul>
          </div>
          <div style={{ flex: "1 1 720px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "32px clamp(20px, 3vw, 48px)" }}>
            <nav aria-label="השירותים שלנו">
              <h3 style={{ margin: "0 0 16px", fontSize: "var(--fs-h5)", fontWeight: "700", color: "#2E2A27", lineHeight: "1.35" }}>
                {"השירותים שלנו"}
              </h3>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "16px" }}>
                <li>
                  <Link to="/factories" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"הסעדה יומית למפעלים"}
                  </Link>
                </li>
                <li>
                  <Link to="/services/subsidized-meals" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"ארוחות מסובסדות לעובדים"}
                  </Link>
                </li>
                <li>
                  <Link to="/services/corporate-events" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"אירועי חברה וימי גיבוש"}
                  </Link>
                </li>
                <li>
                  <Link to="/services/event-catering" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"אירועים פרטיים"}
                  </Link>
                </li>
                <li>
                  <Link to="/friday" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"מכירת שישי"}
                  </Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="קייטרינג אלגריה">
              <h3 style={{ margin: "0 0 16px", fontSize: "var(--fs-h5)", fontWeight: "700", color: "#2E2A27", lineHeight: "1.35" }}>
                {"קייטרינג אלגריה"}
              </h3>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "16px" }}>
                <li>
                  <Link to="/" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"דף הבית"}
                  </Link>
                </li>
                <li>
                  <Link to="/about" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"הסיפור שלנו"}
                  </Link>
                </li>
                <li>
                  <Link to="/kitchen" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"המטבח שלנו וכשרות"}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"בלוג"}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    {"צור קשר"}
                  </Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="דברו איתנו">
              <h3 style={{ margin: "0 0 16px", fontSize: "var(--fs-h5)", fontWeight: "700", color: "#2E2A27", lineHeight: "1.35" }}>
                {"דברו איתנו"}
              </h3>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "16px" }}>
                <li>
                  <a href="tel:+972545437526" dir="ltr" style={{ color: "#2E2A27", textDecoration: "none", fontSize: "20px", fontWeight: "700", minHeight: "36px", display: "inline-flex", alignItems: "center" }}>
                    {"054-543-7526"}
                  </a>
                </li>
                <li>
                  <WaButton variant="inline" label="וואטסאפ" source="footer" />
                </li>
                <li style={{ color: "#4A4540", lineHeight: "1.7" }}>
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
                <li style={{ color: "#4A4540" }}>
                  {"קרית גת וכל הדרום"}
                </li>
                <li>
                  <Link to="/contact" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>
                    <span style={{ color: "#2E2A27", fontWeight: "700" }}>
                      {"אני רוצה הצעת מחיר"}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="מדיניות">
              <h3 style={{ margin: "0 0 16px", fontSize: "var(--fs-h5)", fontWeight: "700", color: "#2E2A27", lineHeight: "1.35" }}>
                {"מדיניות"}
              </h3>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "16px" }}>
                <li><Link to="/terms" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>{"תקנון האתר"}</Link></li>
                <li><Link to="/privacy" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>{"מדיניות פרטיות"}</Link></li>
                <li><Link to="/cookies" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>{"מדיניות עוגיות"}</Link></li>
                <li><Link to="/accessibility" style={{ color: "#4A4540", textDecoration: "none", fontWeight: "300", minHeight: "32px", display: "inline-flex", alignItems: "center" }}>{"הצהרת נגישות"}</Link></li>
                <li><button type="button" onClick={openCookieSettings} style={{ border: "0", padding: "0", background: "none", font: "inherit", color: "#4A4540", fontWeight: "300", minHeight: "32px", cursor: "pointer" }}>{"הגדרות עוגיות"}</button></li>
              </ul>
            </nav>
          </div>
        </div>
        {" "}
        <div style={{ marginTop: "56px", padding: "28px 0 32px", borderTop: "1px solid #FDEBD3", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px 32px", fontSize: "14px", fontWeight: "700", color: "#2E2A27" }}>
          <p style={{ margin: "0" }}>
            {"© "}
            <span dir="ltr">
              {"2026"}
            </span>
            {" קייטרינג אלגריה. כל הזכויות שמורות."}
          </p>
          <p style={{ margin: "0", fontWeight: "300", color: "#4A4540" }}>
            {"קייטרינג אלגריה, הזית 118, קרית גת"}
          </p>
        </div>
        {" "}
      </div>
    </footer>
    </>
  )
}
