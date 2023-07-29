import React from 'react'
import { SignIn } from './SignIn'
import { SignOut } from './SignOut'

export type HeaderProps = Readonly<{
  isSignedIn: boolean
}>

export const Header: React.FC<HeaderProps> = ({ isSignedIn }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <h1>{process.env.SITE_NAME}</h1>
          </li>
          {isSignedIn ? (
            <>
              <li>
                <SignOut>Sign out</SignOut>
              </li>
              <li>
                <a href="/new">New</a>
              </li>
            </>
          ) : (
            <li>
              <SignIn>Sign in with GitHub</SignIn>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
