import React from 'react'
import { body } from '../global.css'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  return (
    <html lang={process.env.SITE_LANG}>
      <body className={body}>{children}</body>
    </html>
  )
}
export default RootLayout
