// ============================================================
//  תנועה באתר: GSAP + ScrollTrigger, לפי טוקני התנועה של ספר המותג.
//  כל עמוד מקבל ref אחד (usePageMotion) וכל האנימציות נבנות בתוך
//  gsap.context, כך שבמעבר עמוד הכל מתנקה. מי שביקש פחות תנועה
//  רואה את התוכן מיד (matchMedia על prefers-reduced-motion).
// ============================================================
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const has = (root, sel) => !!root.querySelector(sel)

function pageMotion(root) {
  const g = gsap
  const ST = ScrollTrigger
  const q = (sel) => g.utils.toArray(sel, root)

  const intro = g.timeline({ defaults: { ease: 'power3.out' } })
  if (has(root, '[data-a="hero-img"]')) intro.from(q('[data-a="hero-img"]'), { scale: 1.18, duration: 1.8, ease: 'power2.out' }, 0)
  if (has(root, '[data-a="hero-line"]')) intro.from(q('[data-a="hero-line"]'), { yPercent: 110, duration: 0.9, stagger: 0.12 }, 0.25)
  if (has(root, '[data-a="hero-fade"]')) intro.from(q('[data-a="hero-fade"]'), { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.6)
  if (has(root, '[data-a="hero"]') && has(root, '[data-a="hero-img"]')) {
    g.to(q('[data-a="hero-img"]'), { yPercent: 14, ease: 'none', scrollTrigger: { trigger: q('[data-a="hero"]')[0], start: 'top top', end: 'bottom top', scrub: 1 } })
  }

  const batch = (sel, vars, start = 'top 88%') => {
    const els = q(sel)
    if (els.length) ST.batch(els, { start, onEnter: (b) => g.from(b, { ...vars, overwrite: true }) })
  }
  batch('[data-a="title"]', { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 })
  q('[data-a="orn"]').forEach((el) => {
    const tl = g.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } })
    tl.from(el.querySelectorAll('span span'), { scaleX: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06 }, 0)
    if (el.children[1]) tl.from(el.children[1], { scale: 0, rotate: -120, duration: 0.7, ease: 'back.out(2)' }, 0)
  })

  if (has(root, '[data-a="col2"]')) {
    const col = g.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: q('[data-a="col2"]')[0], start: 'top 80%', toggleActions: 'play none none none' } })
    col.from(q('[data-a="col2"]'), { y: 70, opacity: 0, duration: 0.9 })
    if (has(root, '[data-a="col1"]')) col.from(q('[data-a="col1"]'), { x: 60, y: -30, opacity: 0, rotate: 6, duration: 0.9 }, 0.15)
    if (has(root, '[data-a="badge"]')) col.from(q('[data-a="badge"]'), { scale: 0, rotate: -180, duration: 0.8, ease: 'back.out(1.8)' }, 0.5)
    if (has(root, '[data-a="fade"]')) col.from(q('[data-a="fade"] > *'), { y: 24, opacity: 0, duration: 0.6, stagger: 0.12 }, 0.3)
    if (has(root, '[data-a="badge"]')) g.to(q('[data-a="badge"]'), { y: -8, rotate: 6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4 })
  }

  batch('[data-a="card"]', { y: 70, opacity: 0, rotate: 2, duration: 0.8, ease: 'power3.out', stagger: 0.12 })
  q('[data-a="spin"]').forEach((el) => g.to(el, { rotate: 200, y: 40, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } }))

  q('[data-a="steps"]').forEach((list) => {
    const st = g.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: list, start: 'top 75%', toggleActions: 'play none none none' } })
    Array.from(list.children).forEach((li, i) => {
      if (li.getAttribute('data-a') === 'conn') st.from(li, { clipPath: 'inset(0 0 100% 0)', duration: 0.45, ease: 'none' }, '>-0.1')
      else st.from(li, { x: i % 4 === 0 ? 50 : -50, opacity: 0, duration: 0.6 }, '>-0.05')
    })
  })
  q('[data-a="reveal"]').forEach((el) => g.from(el, { clipPath: 'inset(0 0 100% 0)', scale: 1.08, duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' } }))
  q('[data-a="arch"]').forEach((el) => {
    const k = g.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' } })
    k.from(el, { clipPath: 'inset(100% 0 0 0 round 210px 210px 22px 22px)', duration: 1.1, ease: 'power3.inOut' })
    const bg = el.parentElement && el.parentElement.querySelector('[data-a="archbg"]')
    if (bg) k.from(bg, { scale: 0.6, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.3)
  })
  batch('[data-a="point"]', { x: -30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 'top 90%')
  batch('[data-a="faq"]', { y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 'top 92%')
  batch('[data-a="gal"]', { y: 50, scale: 0.92, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 'top 90%')
  batch('[data-a="menu"]', { y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, 'top 90%')
  batch('[data-a="avatar"]', { scale: 0.6, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.1 })
  q('[data-a="ring"]').forEach((r, i) => g.to(r, { rotate: i % 2 ? -360 : 360, duration: 40 + i * 6, ease: 'none', repeat: -1 }))

  q('[data-a="marquee"]').forEach((el) => {
    const tw = g.to(el, { xPercent: 50, duration: 36, ease: 'none', repeat: -1 })
    el.addEventListener('mouseenter', () => tw.timeScale(0.25))
    el.addEventListener('mouseleave', () => tw.timeScale(1))
    ST.create({ trigger: el, start: 'top bottom', end: 'bottom top', onEnter: () => tw.play(), onLeave: () => tw.pause(), onEnterBack: () => tw.play(), onLeaveBack: () => tw.pause() })
  })
  q('[data-a="mq-group"]').forEach((gr) => batchEls(Array.from(gr.children)))
  function batchEls(els) {
    if (els.length) ST.batch(els, { start: 'top 95%', onEnter: (b) => g.from(b, { y: 30, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', overwrite: true }) })
  }

  q('[data-count]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count'))
    if (!target) return
    const suf = el.getAttribute('data-suf') || ''
    const o = { v: 0 }
    g.to(o, {
      v: target, duration: 1.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-US') + suf },
    })
  })
  q('[data-a="panel"]').forEach((el) => g.from(el, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }))

  // ---- extras: מילה אחר מילה, אייקונים, מפת החלוקה
  q('[data-a="words"]').forEach((h) => {
    g.from(h.querySelectorAll('[data-w]'), { yPercent: 115, rotate: 4, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: h, start: 'top 85%', toggleActions: 'play none none none' } })
  })
  batch('[data-a="stat-ic"]', { scale: 0, rotate: -90, duration: 0.7, ease: 'back.out(2)', stagger: 0.12 }, 'top 92%')
  batch('[data-a="perk"]', { x: 24, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, 'top 92%')
  batch('[data-a="city-chip"]', { y: 14, opacity: 0, duration: 0.4, ease: 'power3.out', stagger: 0.05 }, 'top 95%')

  const map = root.querySelector('[data-a="map"]')
  if (map) {
    const routes = q('[data-a="route"]')
    routes.forEach((r) => { const L = r.getTotalLength(); g.set(r, { strokeDasharray: L, strokeDashoffset: L }) })
    const tl = g.timeline({ scrollTrigger: { trigger: map, start: 'top 75%', toggleActions: 'play none none none' } })
    tl.from(map, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from(q('[data-a="sea"]'), { opacity: 0, duration: 0.8 }, 0.2)
      .from(q('[data-a="hub"]'), { scale: 0, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2.2)' }, 0.35)
      .to(routes, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.12 }, 0.55)
      .from(q('[data-a="city"]'), { scale: 0, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.out(2.4)', stagger: 0.12 }, 1.2)
      .from(q('[data-a="city-label"]'), { opacity: 0, duration: 0.4, stagger: 0.08 }, 1.3)
      .add(() => startTrucks(routes))
    g.fromTo(q('[data-a="hub-ring"]'), { attr: { r: 18 }, opacity: 0.9 }, { attr: { r: 40 }, opacity: 0, duration: 1.8, ease: 'power1.out', repeat: -1 })
  }

  function startTrucks(routes) {
    q('[data-a="truck"]').forEach((t, i) => {
      const r = routes[i]
      if (!r) return
      const L = r.getTotalLength()
      const o = { p: 0 }
      g.to(t, { opacity: 1, duration: 0.3, delay: i * 0.4 })
      g.to(o, {
        p: 1, duration: 2.4 + L / 140, ease: 'sine.inOut', repeat: -1, repeatDelay: 0.8, delay: i * 0.4,
        onUpdate: () => { const pt = r.getPointAtLength(o.p * L); t.setAttribute('cx', pt.x); t.setAttribute('cy', pt.y) },
      })
    })
  }
}

// מפעיל את התנועה של עמוד שלם. מחזיר ref לשים על שורש העמוד.
export function usePageMotion() {
  const root = useRef(null)
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return undefined
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => pageMotion(el))
    }, el)
    // תמונות שנטענות מאוחר משנות גבהים: מחשבים מחדש את נקודות הגלילה
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    window.addEventListener('load', ScrollTrigger.refresh)
    return () => { clearTimeout(t); window.removeEventListener('load', ScrollTrigger.refresh); ctx.revert() }
  }, [])
  return root
}

// אנימציית התודה אחרי שליחת טופס
export function playThanks(el) {
  if (!el) return
  const r = el.getBoundingClientRect()
  if (r.top < 0 || r.bottom > window.innerHeight) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  ScrollTrigger.refresh()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const ring = el.querySelector('[data-a="tk-ring"]')
  const chk = el.querySelector('[data-a="tk-check"]')
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from(el, { y: 24, opacity: 0, scale: 0.97, duration: 0.5 })
  const badge = el.querySelector('[data-a="tk-badge"]')
  if (badge) tl.from(badge, { scale: 0.5, duration: 0.7, ease: 'back.out(2)' }, 0.05)
  if (ring && chk) {
    const rl = ring.getTotalLength(); const cl = chk.getTotalLength()
    gsap.set(ring, { strokeDasharray: rl, strokeDashoffset: rl })
    gsap.set(chk, { strokeDasharray: cl, strokeDashoffset: cl })
    tl.to(ring, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.1).to(chk, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, 0.6)
  }
  const txt = el.querySelectorAll('[data-a="tk-txt"] > *')
  if (txt.length) tl.from(txt, { y: 16, opacity: 0, stagger: 0.08, duration: 0.5 }, 0.75)
}
