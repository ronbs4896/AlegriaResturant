// ============================================================
//  פרסר frontmatter מינימלי (פורמט בשליטתנו) — עובד גם בדפדפן (Vite)
//  וגם ב-node (postbuild). ללא תלויות.
//  תומך: key: value, מחרוזות, בוליאני, ומערכים בסגנון [a, b, c].
// ============================================================

function parseValue(raw) {
  const v = raw.trim()
  if (v === 'true') return true
  if (v === 'false') return false
  // מחרוזת עטופה במרכאות כפולות — JSON.parse קודם, כדי שערכים כמו
  // jsonLd: "{\"@context\":...}" ישוחזרו עם escape נכון של מרכאות פנימיות
  if (v.startsWith('"') && v.endsWith('"')) {
    try {
      return JSON.parse(v)
    } catch {
      return v.slice(1, -1)
    }
  }
  // מחרוזת עטופה במרכאות בודדות
  if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1)
  // מערך: [a, b, c]
  if (v.startsWith('[') && v.endsWith(']')) {
    return v
      .slice(1, -1)
      .split(',')
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }
  return v
}

export function parseFrontmatter(raw) {
  const text = String(raw).replace(/\r\n/g, '\n')
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: text.trim() }

  const data = {}
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    data[key] = parseValue(line.slice(idx + 1))
  }
  return { data, body: match[2].trim() }
}

export default parseFrontmatter
