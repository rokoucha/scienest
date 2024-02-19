import { Scope } from './model/scope'

export function accessableScopes(signedIn: boolean): Scope[] {
  return signedIn
    ? [Scope.Public, Scope.Protected, Scope.Private]
    : [Scope.Public, Scope.Protected]
}

export function listableScopes(signedIn: boolean): Scope[] {
  return signedIn
    ? [Scope.Public, Scope.Protected, Scope.Private]
    : [Scope.Public]
}
