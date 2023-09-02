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
  isEditing: boolean
  isSignedIn: boolean
  signIn: React.ReactNode
  signOut: React.ReactNode
  siteName: string
  title: string
}>

export const HeaderElement: React.FC<HeaderElementProps> = ({
  isEditing,
  isSignedIn,
  signIn,
  signOut,
  siteName,
  title,
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
                {!isEditing && (
                  <>
                    <li>
                      <ButtonLink href="/edit/new">New</ButtonLink>
                    </li>
                    <li>
                      <ButtonLink href={`/edit/${title}`}>📝</ButtonLink>
                    </li>
                  </>
                )}
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
