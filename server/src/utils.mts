import { Scope } from 'scienest-common'
import { API_PREFIX } from './constants.js'

export function toScope(scope: string): Scope {
  switch (scope) {
    case Scope.public: {
      return scope
    }

    case Scope.protected: {
      return scope
    }

    case Scope.private: {
      return scope
    }

    default: {
      throw new Error(`"${scope}" is not valid scope`)
    }
  }
}

export function getPath(path: string) {
  return [API_PREFIX, path].join('/')
}
