import { z } from 'zod'
import { handler, requireUser } from '@/lib/session'
import { processDocument } from '@/lib/pipeline'

export const runtime = 'nodejs'
export const maxDuration = 120

const Body = z.object({ id: z.string().uuid() })

export const POST = handler(async (req) => {
  await requireUser()
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const outcome = await processDocument(parsed.data.id)
  return Response.json({ ok: true, ...outcome })
})
