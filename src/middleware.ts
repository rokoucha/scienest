import { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'
import { auth } from './auth'

export const middleware = auth((req: NextAuthRequest): any => {
  if (!req.auth?.user)
    if (req.method === 'GET') {
      return NextResponse.redirect(new URL('/auth/signin/github', req.url), 302)
    } else {
      return new NextResponse('authencation required', { status: 401 })
    }

  return
})

export const config = {
  matcher: ['/edit/:slug*'],
}
