import React from 'react'
import pkg from '../../package.json' assert { type: 'json' }
import { auth } from '../auth'
import { SignIn } from '../components/SignIn'
import { SignOut } from '../components/SignOut'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const session = await auth()

  return (
    <html lang={process.env.SITE_LANG}>
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <h1>{process.env.SITE_NAME}</h1>
              </li>
              {session ? (
                <>
                  <li>
                    <SignOut>Sign out</SignOut>
                  </li>
                  <li>
                    <a href="/new">New</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <SignIn>Sign in with GitHub</SignIn>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <pre>
            {pkg.name}/{pkg.version}
          </pre>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
