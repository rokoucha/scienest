import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user?: {
      name: string
      email: string
      picture: string
      sub: string
      iat: number
      exp: number
      jti: string
    }
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ account }) {
      return (
        account !== null &&
        account.providerAccountId === process.env.GITHUB_USER_ID
      )
    },
  },
  providers: [GitHub],
  useSecureCookies: process.env.APP_ENV === 'production',
})
