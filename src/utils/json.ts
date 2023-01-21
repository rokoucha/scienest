export const toJSONCompatible = <T>(data: T): JSONCompatible<T> =>
  JSON.parse(JSON.stringify(data))

/**
 * JSON.stringify()してJSON.parse()したあとの型を求める
 *
 * @link ttps://scrapbox.io/hata6502/JSON.stringify()%E3%81%97%E3%81%A6JSON.parse()%E3%81%97%E3%81%9F%E3%81%82%E3%81%A8%E3%81%AE%E5%9E%8B%E3%82%92%E6%B1%82%E3%82%81%E3%82%8B
 * @license CC0-1.0
 */
export type JSONCompatible<Target> = Target extends {
  toJSON: (...args: any) => any
}
  ? JSONCompatible<ReturnType<Target['toJSON']>>
  : // Infinity and NaN are not supported.
  Target extends boolean | null | number | string
  ? Target
  : Target extends ((...args: any) => any) | symbol | undefined
  ? never
  : Target extends Record<string, any>
  ? { [Key in keyof Target]: JSONCompatible<Target[Key]> }
  : unknown
