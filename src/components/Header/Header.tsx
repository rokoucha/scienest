import React from 'react'
import pkg from '../../../package.json' assert { type: 'json' }
import { SignIn } from '../SignIn'
import { SignOut } from '../SignOut'
import { HeaderElement } from './Header.element'

export type HeaderProps = Readonly<{
  isEditing: boolean
  isSignedIn: boolean
  slug: string
}>

export const Header: React.FC<HeaderProps> = ({
  isEditing,
  isSignedIn,
  slug,
}) => {
  return (
    <HeaderElement
      isEditing={isEditing}
      isSignedIn={isSignedIn}
      signIn={<SignIn />}
      signOut={<SignOut />}
      siteName={process.env.SITE_NAME ?? pkg.name}
      slug={slug}
    />
  )
}
