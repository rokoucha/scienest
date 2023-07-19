/// <reference types="@cloudflare/workers-types" />

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        DB: D1Database
      }
    }
  }
}
