// פס לוגואים של מפעלים לקוחות. לא מוצג כל עוד אין לוגואים ב-src/data/clients.js
import { clients } from '../../data/clients.js'

export default function ClientLogos() {
  if (!clients.length) return null
  return (
    <section aria-labelledby="clients-h" style={{ padding: '24px clamp(24px, 5vw, 80px) 72px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
        <h2 id="clients-h" style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#2E2A27', textAlign: 'center' }}>
          חלק מהמפעלים שאוכלים אצלנו כל יום
        </h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '24px 48px' }}>
          {clients.map((c) => (
            <li key={c.name} data-a="card">
              <img src={c.logo} alt={c.name} loading="lazy" style={{ display: 'block', height: 56, width: 'auto', maxWidth: 160, objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.8 }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
