import { $object, $opt, $string, Infer } from 'lizod'
import { $Scope } from './scope'

export const History = $object({
  id: $string,
  articleId: $opt($string),
  scope: $Scope,
  createdAt: $string,
})
export type History = Infer<typeof History>
