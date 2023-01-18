import { z } from 'zod'
import { Scope } from './constants'

export const Post = z.object({
  id: z.string(),
  slug: z.string(),
  scope: z.nativeEnum(Scope),
  text: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type Post = z.infer<typeof Post>
