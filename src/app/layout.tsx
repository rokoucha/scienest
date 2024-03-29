import { Metadata } from 'next'
import React from 'react'
import pkg from '../../package.json' assert { type: 'json' }
import { body } from '../global.css'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export const metadata = {
  title: {
    default: process.env.SITE_NAME,
    template: `%s - ${process.env.SITE_NAME}`,
  },
  robots: {
    follow: false,
    index: false,
  },
  applicationName: pkg.name,
  generator: pkg.name,
  openGraph: {
    title: {
      default: process.env.SITE_NAME,
      template: `%s - ${process.env.SITE_NAME}`,
    },
    siteName: process.env.SITE_NAME,
    locale: process.env.SITE_LANG,
  },
  icons: undefined,
  twitter: {
    card: 'summary',
    title: {
      default: process.env.SITE_NAME,
      template: `%s - ${process.env.SITE_NAME}`,
    },
    images: undefined,
  },
  metadataBase: new URL(process.env.BASE_URL),
} satisfies Metadata

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  return (
    <html lang={process.env.SITE_LANG}>
      <body className={body}>{children}</body>
    </html>
  )
}
export default RootLayout
