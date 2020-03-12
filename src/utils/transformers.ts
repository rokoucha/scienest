import { error, ok, Transformer, ValidationError } from 'transform-ts'

export class DoesNotMatchPatternError extends Error {
  constructor(readonly pattern: RegExp, readonly text: string) {
    super(
      `string "${text}" does not match the pattern "${pattern.toString()}".`,
    )
    this.name = 'DoesNotMatchPatternError'
  }
}

export class DoesNotNumericStringError extends Error {
  constructor(readonly text: string) {
    super(`string "${text}" does not numeric string.`)
    this.name = 'DoesNotNumericStringError'
  }
}

export class InvalidUnixtimeError extends Error {
  constructor(readonly time: number) {
    super(`"${time}" is invalid unixtime.`)
    this.name = 'InvalidUnixtimeError'
  }
}

export const $unixtime = Transformer.from<number, Date>(time => {
  const date = new Date(time * 1000)
  return isNaN(date.getTime())
    ? error(ValidationError.from(new InvalidUnixtimeError(time)))
    : ok(date)
})

export function $regexp(regexp: RegExp): Transformer<string, string> {
  return Transformer.from<string, string>(text =>
    regexp.test(text)
      ? ok(text)
      : error(ValidationError.from(new DoesNotMatchPatternError(regexp, text))),
  )
}

export const $numericString = Transformer.from<string, string>(text =>
  Number.isNaN(Number(text))
    ? error(ValidationError.from(new DoesNotNumericStringError(text)))
    : ok(text),
)

export const $booleanString = Transformer.from<'true' | 'false', boolean>(
  text => ok(text === 'true'),
)
