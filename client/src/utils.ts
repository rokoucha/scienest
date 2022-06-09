export function queryToSlug(rawSlug: string | string[] | undefined): string[] {
  return (
    rawSlug === undefined ? [] : Array.isArray(rawSlug) ? rawSlug : [rawSlug]
  ).filter((s) => s !== '')
}
