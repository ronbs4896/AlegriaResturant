// Turns an inline CSS string (as written in the canvas design) into a React style object.
const camel = (s) => s.replace(/-([a-z])/g, (m, c) => c.toUpperCase())

export function sx(css = '') {
  const out = {}
  for (const decl of String(css).split(/;(?![^(]*\))/)) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const k = decl.slice(0, i).trim()
    const v = decl.slice(i + 1).trim()
    if (!k || !v) continue
    if (k.startsWith('--')) { out[k] = v; continue }
    if (k.startsWith('-webkit-')) { out['Webkit' + camel(k.slice(8)).replace(/^./, (c) => c.toUpperCase())] = v; continue }
    out[camel(k)] = v
  }
  return out
}
