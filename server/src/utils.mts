import { Scope } from 'scienest-common'

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
