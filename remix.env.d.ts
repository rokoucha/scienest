/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import { SessionStorage } from '@remix-run/cloudflare'
import { Authenticator } from 'remix-auth'
import { Env } from './src/env'

declare module '@remix-run/server-runtime' {
  interface AppLoadContext extends Env {
    authenticator: Authenticator
    sessionStorage: SessionStorage
  }
}
