import { $any, $array, $object, $string, Validator } from 'lizod'

type Heading = { id: string; title: string; children: Heading[] }
export type Toc = Heading[]

function isHeading(input: any): input is Heading {
  if (
    !$object({ id: $string, title: $string, children: $array($any) })(input)
  ) {
    return false
  }
  return input.children.every((c) => isHeading(c))
}

export const $Toc: Validator<Toc> = (input: any): input is Toc => {
  if (!$array($any)(input)) {
    return false
  }
  return input.every((i) => isHeading(i))
}
