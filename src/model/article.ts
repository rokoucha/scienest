import { $nullable, $object, $string, Infer } from 'lizod'
import { ScopeValidator } from './scope'

export const Article = $object({
  id: $string,
  scope: ScopeValidator,
  title: $string,
  description: $nullable($string),
  content: $string,
  createdAt: $string,
  updatedAt: $string,
})
export type Article = Infer<typeof Article>
