export function arrayChunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [[]]
  const result = []
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
