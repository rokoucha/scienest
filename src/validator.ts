import { Validator } from 'lizod'

export const $instanceOf =
  <T extends Function>(type: T): Validator<T> =>
  (input: any): input is T =>
    input instanceof type
