import { $number, $object, $string, Infer } from 'lizod'

export const Link = $object({
  id: $string,
  title: $string,
  count: $number,
})
export type Link = Infer<typeof Link>
