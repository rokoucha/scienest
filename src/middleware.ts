import { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'
import { auth } from './auth'

export const middleware = auth((req: NextAuthRequest): any => {
  if (!req.auth.user)
    return NextResponse.redirect(new URL('/auth/signin/github', req.url), 302)

  return
})

export const config = {
  matcher: ['/edit/:slug*'],
}
