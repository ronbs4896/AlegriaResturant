import { PGlite } from '@electric-sql/pglite'
const db = new PGlite('./.pglite')
await db.exec(await (await import('node:fs/promises')).readFile('drizzle/local-schema.sql','utf8'))
await db.exec(`INSERT INTO users (email, role) VALUES ('ron@alegriacatering.co.il','admin') ON CONFLICT (email) DO UPDATE SET role='admin';`)
await db.exec(`INSERT INTO users (email, role) VALUES ('oshrit@alegriacatering.co.il','uploader') ON CONFLICT (email) DO NOTHING;`)
await db.exec(`INSERT INTO business_profile (legal_name, trade_names, tax_id, emails)
  SELECT 'קייטרינג אלגריה בע״מ', '["אלגריה","מסעדת אלגריה"]'::jsonb, '514999994', '["office@alegriacatering.co.il"]'::jsonb
  WHERE NOT EXISTS (SELECT 1 FROM business_profile);`)
const u = await db.query(`SELECT id, email, role FROM users WHERE email='ron@alegriacatering.co.il'`)
// לקוחות לדוגמה עם מסמכי הכנסה, כדי לראות מיון וסינון אמיתיים
const names = [['הגליל תעשיות ר.ס בע״מ','511531352',856254,23],['דשן גת בע״מ','511042913',419964,23],['ברוול בע״מ','515504892',336457,18],['קמח רוט','550222830',174032,18],['אוריין מערכות','514818806',115478,17],['בן שושן שיר','318874781',0,0]]
for (const [name, tax, total, count] of names) {
  const c = await db.query(`INSERT INTO customers (name, tax_id) VALUES ($1,$2) ON CONFLICT (tax_id) DO UPDATE SET name=EXCLUDED.name RETURNING id`, [name, tax])
  const cid = c.rows[0].id
  if (count > 0) {
    await db.query(`INSERT INTO documents (sha256, blob_path, mime, size_bytes, source, status, direction, doc_kind, doc_type, customer_id, supplier_name, supplier_tax_id, recipient_name, recipient_tax_id, doc_number, doc_date, net_amount, vat_amount, total_amount, currency, confidence)
      VALUES ($1,'raw/2026-07/x.pdf','application/pdf',90000,'email','approved','income','tax_invoice','tax_invoice',$2,'קייטרינג אלגריה','514999994',$3,$4,'1001','2026-07-20',$5,$6,$7,'ILS',0.95)
      ON CONFLICT (sha256) DO NOTHING`, [`seed-${tax}`, cid, name, tax, (total/1.18).toFixed(2), (total-total/1.18).toFixed(2), total.toFixed(2)])
  }
}
console.log(JSON.stringify(u.rows[0]))
await db.close()
