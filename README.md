# מסעדת אלגריה — אתר תדמית

אתר תדמית פרימיום למסעדת/קייטרינג **אלגריה** — הסעדה יומית למפעלים, מכירת שישי וקייטרינג לאירועים.
מעל 25 שנות ניסיון · אוכל ביתי טעים, טרי ואיכותי.

## סטאק

React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · React Router · react-helmet-async.
RTL מלא (עברית), ארכיטקטורת **Content-in-Data**, מנוע לידים לוואטסאפ, ו-SPA-SEO עם הזרקה סטטית.

## הרצה

```bash
npm install
npm run dev      # שרת פיתוח
npm run build    # בנייה + הזרקת SEO + sitemap
npm run preview  # תצוגה מקדימה של ה-build
```

## עריכת תוכן (בלי קוד)

כל התוכן יושב ב-`src/data/`:

| קובץ | תוכן |
|---|---|
| `site.js` | **מקור אמת יחיד** — טלפון, וואטסאפ, מייל, שעות, אזור, רשתות, מזהי אנליטיקס |
| `services.js` | 4 שירותי הדגל |
| `friday.js` | תפריט מכירת שישי |
| `factories.js` | תוכן עמוד הסעדת מפעלים (B2B) |
| `gallery.js` | תמונות הגלריה |
| `testimonials.js` | המלצות |
| `faq.js` | שאלות נפוצות |
| `seoRoutes.js` | מטא-דאטה לכל עמוד (SEO) |

> ⚠️ שדות המסומנים `TODO` ב-`site.js` הם placeholder — יש להחליף בפרטים אמיתיים (טלפון/וואטסאפ/שעות/דומיין).

## נכסים

- **פונט:** `public/fonts/` — Birzia (Light/Medium/Bold/Black).
- **לוגו:** `public/images/logo/logo.jpg`.
- **תמונות:** `public/images/{hero,dishes,catering,ambience,gallery}/` — ראו `public/images/README.md`.

## פריסה

אתר סטטי, מוכן ל-**Vercel** (`vercel.json` כלול). פקודת הבנייה: `npm run build`.
