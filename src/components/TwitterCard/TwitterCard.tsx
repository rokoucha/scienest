'use client'

import React, { useEffect, useRef } from 'react'
import { wrapper } from './TwitterCard.css'

function createTwitterCardStubHTML(tweetId: string): string {
  return `<blockquote class="twitter-tweet ${wrapper}"><a href="https://twitter.com/i/status/${tweetId}">https://twitter.com/i/status/${tweetId}</a></blockquote>`
}

export type TwitterCardProps = Readonly<{
  tweetId: string
}>

export function TwitterCard({ tweetId }: TwitterCardProps): React.ReactNode {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!tweetId) {
      return
    }

    // @ts-expect-error
    window.twttr?.widgets.load(ref.current)

    return () => {
      if (ref.current) {
        ref.current.innerHTML = createTwitterCardStubHTML(tweetId)
      }
    }
  }, [tweetId])

  if (!tweetId) {
    return null
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: createTwitterCardStubHTML(tweetId),
      }}
      ref={ref}
    />
  )
}
