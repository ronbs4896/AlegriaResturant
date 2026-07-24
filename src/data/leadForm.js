// ============================================================
//  תוכן אשף הלידים (מודאל 3 שלבים).
// ============================================================

export const leadServiceOptions = [
  { key: 'factory', label: 'הסעדה למפעל', icon: 'Factory' },
  { key: 'friday', label: 'מכירת שישי', icon: 'CalendarHeart' },
  { key: 'event', label: 'קייטרינג לאירוע', icon: 'PartyPopper' },
  { key: 'subsidized', label: 'ארוחות מסובסדות', icon: 'HandCoins' },
  { key: 'other', label: 'עוד לא בטוח/ה', icon: 'HelpCircle' },
]

// טווחי כמות (רלוונטי בעיקר ל-B2B)
export const leadSizeOptions = [
  '10–30 מנות',
  '30–80 מנות',
  '80–150 מנות',
  '150–300 מנות',
  '300+ מנות',
]

export const leadCopy = {
  step1Title: 'מה מעניין אתכם?',
  step1Sub: 'בחרו את סוג השירות ונמשיך משם',
  step2Title: 'כמה פרטים על הבקשה',
  step2Sub: 'זה עוזר לנו להכין הצעה מדויקת (הכל רשות)',
  step3Title: 'לאן נחזור אליכם?',
  step3Sub: 'נשלח את הבקשה ישירות לוואטסאפ שלנו',
  sizeLabel: 'כמות משוערת',
  whenLabel: 'מתי צריך?',
  notesLabel: 'הערות (רשות)',
  nameLabel: 'שם מלא',
  phoneLabel: 'טלפון',
  cityLabel: 'עיר',
  submit: 'שליחה בוואטסאפ',
  successTitle: 'קיבלנו את הפרטים!',
  successText: 'תודה! הפרטים אצלנו, ונחזור אליכם בהקדם עם הצעה מותאמת. רוצים תשובה כבר עכשיו? שלחו לנו הודעה בוואטסאפ.',
}

export const leadWhenOptions = ['בהקדם', 'תוך שבוע', 'תוך חודש', 'רק בודק/ת מחירים']

export default leadServiceOptions
