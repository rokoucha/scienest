import { $array, $nullable, $object, $opt, $string, Infer } from 'lizod'
import { History } from './history'
import { Link } from './link'
import { $Scope } from './scope'

export const Article = $object({
  id: $string,
  scope: $Scope,
  title: $string,
  description: $nullable($string),
  content: $string,
  histories: $opt($array(History)),
  links: $opt($array(Link)),
  createdAt: $string,
  updatedAt: $string,
})
export type Article = Infer<typeof Article>
