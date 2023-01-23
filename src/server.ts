import { createCookieSessionStorage } from '@remix-run/cloudflare'
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'
import type { Env } from './env'

const handleRequest = createPagesFunctionHandler<Env>({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    const sessionStorage = createCookieSessionStorage({
      cookie: {
        name: '_session',
        sameSite: 'strict',
        path: '/',
        httpOnly: true,
        secrets: [context.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
      },
    })

    return { ...context.env, sessionStorage }
  },
})

export const onRequest: PagesFunction<Env> = (context) => {
  return handleRequest(context)
}
