// ============================================================
//  תעודות ואישורים — בלוק האמון של עמוד המפעלים.
//
//  ⚠️ כלל ברזל: לא מציגים תעודה שלא אושרה. כל פריט נושא דגל
//  `confirmed`, והרכיב מרנדר אך ורק פריטים עם confirmed: true.
//  קוני מזון B2B מצפים ל-3-8 תעודות; כל אחת שתאושר מחזקת
//  משמעותית את העמוד — להדליק ברגע שהמידע מאומת מול בעל העסק.
// ============================================================

export const certifications = [
  {
    key: 'kosher',
    label: 'כשרות',
    value: 'רבנות ראשית קרית גת',
    note: 'תעודה בתוקף, זמינה לביקורת רכש',
    confirmed: true,
  },
  {
    key: 'heat',
    label: 'שרשרת חום',
    value: 'מבוקרת מהמטבח עד המפעל',
    note: 'מיכלים תרמיים ובקרת טמפרטורה לאורך ההובלה',
    confirmed: true,
  },
  {
    key: 'kitchen',
    label: 'המטבח',
    value: 'מטבח מרכזי בקרית גת',
    note: 'ייצור עצמי, בלי קבלני משנה',
    confirmed: true,
  },

  // --- ממתין לאישור בעל העסק. להפוך ל-true כשמאומת: ---
  {
    key: 'haccp',
    label: 'בטיחות מזון',
    value: 'HACCP',
    note: 'ניהול סיכונים בתהליך הייצור',
    confirmed: false, // TODO: לאמת אם קיים
  },
  {
    key: 'iso22000',
    label: 'תקן בינלאומי',
    value: 'ISO 22000',
    note: 'תקן ניהול בטיחות מזון',
    confirmed: false, // TODO: לאמת אם קיים
  },
  {
    key: 'insurance',
    label: 'ביטוח',
    value: 'אחריות מוצר וצד ג׳',
    note: 'אישור ביטוח לפי דרישת הרכש',
    confirmed: false, // TODO: לאמת אם קיים
  },
]

export const certificationsCopy = {
  eyebrow: 'מסמכים ואישורים',
  title: 'מה שצריך לצרף לתיק הספק',
  subtitle:
    'ביקורת רכש מבקשת מסמכים לפני שהיא מבקשת טעימה. אלה שלנו, וכולם זמינים לשליחה באותו יום.',
  footnote: 'צריכים מסמך נוסף לתיק הספק? בקשו, ונשלח.',
}

export const confirmedCertifications = certifications.filter((c) => c.confirmed)

export default certifications
