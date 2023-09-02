import { $object, $string, Infer } from 'lizod'
import { ScopeValidator } from './scope'

export const Content = $object({
  id: $string,
  articleId: $string,
  scope: ScopeValidator,
  text: $string,
  createdAt: $string,
})
export type Content = Infer<typeof Content>
