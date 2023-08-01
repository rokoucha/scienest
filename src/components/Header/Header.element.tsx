import React from 'react'
import { ButtonLink } from '../ButtonLink'
import {
  brand,
  brandLink,
  brandName,
  container,
  navigation,
  navigationWrapper,
  wrapper,
} from './Header.css'

export type HeaderElementProps = Readonly<{
  isSignedIn: boolean
  signIn: React.ReactNode
  signOut: React.ReactNode
  siteName: string
}>

export const HeaderElement: React.FC<HeaderElementProps> = ({
  isSignedIn,
  signIn,
  signOut,
  siteName,
}) => {
  return (
    <header className={wrapper}>
      <div className={container}>
        <div className={brand}>
          <a className={brandLink} href="/">
            <h1 className={brandName}>{siteName}</h1>
          </a>
        </div>
        <nav className={navigationWrapper}>
          <ul className={navigation}>
            {isSignedIn ? (
              <>
                <li>
                  <ButtonLink href="/new">New</ButtonLink>
                </li>
                <li>{signOut}</li>
              </>
            ) : (
              <li>{signIn}</li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
