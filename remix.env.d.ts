/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

export {}

declare module '@remix-run/server-runtime' {
  interface AppLoadContext {
    DB: D1Database
  }
}
