export const Scope = {
  Private: 'Private',
  Protected: 'Protected',
  Public: 'Public',
} as const
export type Scope = keyof typeof Scope
