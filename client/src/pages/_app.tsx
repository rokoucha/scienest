import { MantineProvider } from '@mantine/core'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import type React from 'react'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Scienest</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <MantineProvider
      theme={{ fontFamily: 'sans-serif' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </MantineProvider>
  </>
)

export default App
