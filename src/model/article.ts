import { $array, $nullable, $object, $opt, $string, Infer } from 'lizod'
import { History } from './history'
import { $Scope } from './scope'

export const Article = $object({
  id: $string,
  scope: $Scope,
  title: $string,
  description: $nullable($string),
  content: $string,
  histories: $opt($array(History)),
  createdAt: $string,
  updatedAt: $string,
})
export type Article = Infer<typeof Article>
