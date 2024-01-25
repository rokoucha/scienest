import React from 'react'
import { ExternalLink } from '../MarkdownLink'
import { TwitterCard } from './TwitterCard'

export type TwitterCardLinkProps = Readonly<{
  url: string
}>

export function TwitterCardLink({
  url,
}: TwitterCardLinkProps): React.ReactNode {
  return (
    <div>
      <ExternalLink href={url as any}>{url}</ExternalLink>
      <TwitterCard url={url} />
    </div>
  )
}
