import { $enum } from 'lizod'

export const Scope = {
  Private: 'Private',
  Protected: 'Protected',
  Public: 'Public',
} as const
export type Scope = (typeof Scope)[keyof typeof Scope]
export const ScopeValidator = $enum(Object.values(Scope))
