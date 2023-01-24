import { createCookieSessionStorage } from '@remix-run/cloudflare'
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'
import { Authenticator } from 'remix-auth'
import { GitHubStrategy } from 'remix-auth-github'
import type { Env } from './env'

const handleRequest = createPagesFunctionHandler<Env>({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    const sessionStorage = createCookieSessionStorage({
      cookie: {
        name: '_session',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secrets: [context.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
      },
    })

    const authenticator = new Authenticator(sessionStorage)

    authenticator.use(
      new GitHubStrategy(
        {
          clientID: context.env.GITHUB_CLIENT_ID,
          clientSecret: context.env.GITHUB_CLIENT_SECRET,
          callbackURL: context.env.GITHUB_CALLBACK_URL,
        },
        async ({ profile }) => profile.id === context.env.GITHUB_USER_ID,
      ),
    )

    return {
      ...context.env,
      authenticator,
      sessionStorage,
    }
  },
})

export const onRequest: PagesFunction<Env> = (context) => {
  return handleRequest(context)
}
