import React from 'react'
import { auth } from '../auth'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { body } from './global.css'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const session = await auth()

  return (
    <html lang={process.env.SITE_LANG}>
      <body className={body}>
        <Header isSignedIn={session !== undefined} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
export default RootLayout
