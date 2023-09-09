import { $boolean, $object, $string, Infer } from 'lizod'

export const Link = $object({
  id: $string,
  title: $string,
  linked: $boolean,
})
export type Link = Infer<typeof Link>
