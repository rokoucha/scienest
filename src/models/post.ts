import { $nullable, $object, $string, Infer } from 'lizod'
import { ScopeValidator } from './scope'

export const Post = $object({
  id: $string,
  slug: $string,
  scope: ScopeValidator,
  title: $string,
  description: $nullable($string),
  content: $string,
  created_at: $string,
  updated_at: $string,
})
export type Post = Infer<typeof Post>
