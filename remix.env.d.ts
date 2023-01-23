/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import { Env } from './src/env'

export {}

declare module '@remix-run/server-runtime' {
  interface AppLoadContext extends Env {}
}
