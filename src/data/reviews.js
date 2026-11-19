// ============================================================
//  ביקורות Google — מקור הנתונים לסקשן "מה כותבים עלינו בגוגל".
//
//  ⚠️ הסקשן מוצג רק כשיש כאן ביקורות אמיתיות מהפרופיל. אין
//  למלא כאן ביקורות שלא נכתבו ב-Google. ההמלצות שב-
//  src/data/testimonials.js מסומנות "להמחשה" ולכן לא משמשות כאן.
//
//  חיבור אמיתי: Google Places API (Place Details) עם Place ID של
//  העסק ומפתח API בצד השרת, כמשתנה סביבה ב-Vercel ולא בקוד.
//  גוגל מחזירה עד 5 ביקורות, דירוג ממוצע ומספר ביקורות, ודורשת
//  שיוך גלוי ל-Google. חלופה בלי קוד: וידג׳ט כמו Trustindex.
// ============================================================

export const googleReviews = {
  profileUrl: '', //     קישור לפרופיל העסק ב-Google
  writeReviewUrl: '', // הקישור "כתבו לנו ביקורת" מתוך הפרופיל
  rating: null, //       דירוג ממוצע, למשל 4.9
  count: null, //        מספר הביקורות בפרופיל
  items: [], //          { author, when, rating, text }
}

export const hasGoogleReviews = googleReviews.items.length > 0

export default googleReviews
