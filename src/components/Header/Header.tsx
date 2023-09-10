import React from 'react'
import pkg from '../../../package.json' assert { type: 'json' }
import { SignIn } from '../SignIn'
import { SignOut } from '../SignOut'
import { HeaderElement } from './Header.element'

export type HeaderProps = Readonly<{
  editing: boolean
  signedIn: boolean
  title: string
}>

export const Header: React.FC<HeaderProps> = ({ editing, signedIn, title }) => {
  return (
    <HeaderElement
      editing={editing}
      signedIn={signedIn}
      signIn={<SignIn />}
      signOut={<SignOut />}
      siteName={process.env.SITE_NAME ?? pkg.name}
      title={title}
    />
  )
}
