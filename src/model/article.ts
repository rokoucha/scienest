import { $array, $nullable, $object, $opt, $string, Infer } from 'lizod'
import { History } from './history'
import { Link } from './link'
import { $Scope } from './scope'
import { $Toc } from './toc'

export const Article = $object({
  id: $string,
  scope: $Scope,
  title: $string,
  description: $nullable($string),
  thumbnailUrl: $nullable($string),
  toc: $nullable($Toc),
  heading: $nullable($string),
  content: $nullable($string),
  raw: $nullable($string),
  histories: $opt($array(History)),
  links: $opt($array(Link)),
  createdAt: $string,
  updatedAt: $string,
})
export type Article = Infer<typeof Article>

export const ArticleListItem = $object({
  id: $string,
  scope: $Scope,
  title: $string,
  description: $nullable($string),
  thumbnailUrl: $nullable($string),
  links: $opt($array(Link)),
  createdAt: $string,
  updatedAt: $string,
})
export type ArticleListItem = Infer<typeof ArticleListItem>
export type ArticleList = ArticleListItem[]
