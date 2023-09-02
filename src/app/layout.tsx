import { Metadata } from 'next'
import React from 'react'
import pkg from '../../package.json' assert { type: 'json' }
import { body } from '../global.css'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export const metadata = {
  title: {
    absolute: process.env.SITE_NAME,
    template: `%s - ${process.env.SITE_NAME}`,
  },
  description: process.env.SITE_DESCRIPTION,
  applicationName: pkg.name,
  generator: pkg.name,
} satisfies Metadata

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  return (
    <html lang={process.env.SITE_LANG}>
      <body className={body}>{children}</body>
    </html>
  )
}
export default RootLayout
