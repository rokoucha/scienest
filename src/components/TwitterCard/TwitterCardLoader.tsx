import Script from 'next/script'

export function TwitterCardLoader() {
  return (
    <Script
      src="https://platform.twitter.com/widgets.js"
      strategy="lazyOnload"
    />
  )
}
