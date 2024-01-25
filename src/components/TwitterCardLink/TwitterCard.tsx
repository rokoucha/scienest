'use client'

import React, { useEffect, useRef } from 'react'
import { stubLoadingText, stubWrapper } from './TwitterCard.css'

function createTwitterCardStubHTML(url: string): string {
  return `<blockquote class="twitter-tweet ${stubWrapper}"><p class="${stubLoadingText}">Loading...</p><a href="${url}"></a></blockquote>`
}

export type TwitterCardProps = Readonly<{
  url: string
}>

export function TwitterCard({ url }: TwitterCardProps): React.ReactNode {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // @ts-expect-error
    window.twttr?.widgets.load(ref.current)

    return () => {
      if (ref.current) {
        ref.current.innerHTML = createTwitterCardStubHTML(url)
      }
    }
  }, [url])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: createTwitterCardStubHTML(url),
      }}
      ref={ref}
    />
  )
}
