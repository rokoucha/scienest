import { $object, $string, Infer } from 'lizod'

export const History = $object({
  id: $string,
  articleId: $string,
  createdAt: $string,
})
export type History = Infer<typeof History>
