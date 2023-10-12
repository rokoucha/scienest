/// <reference types="@cloudflare/workers-types" />

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        DB: D1Database

        APP_ENV: string
        AUTH_GITHUB_ID: string
        AUTH_GITHUB_SECRET: string
        AUTH_SECRET: string
        AUTH_TRUST_HOST: string
        BASE_URL: string
        GITHUB_USER_ID: string
        SITE_LANG: string
        SITE_NAME: string
      }
    }
  }
}
