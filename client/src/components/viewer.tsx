import type React from 'react'
import { Renderer } from './renderer'

export type ViewerProps = { content: string; slug: string; title: string }

export const Viewer: React.FC<ViewerProps> = ({
  content: rawContent,
  slug,
  title,
}) => {
  const contentLines = rawContent.split('\n')

  const content =
    contentLines.length > 2
      ? contentLines.slice(2).join('\n')
      : contentLines.join('\n')

  return (
    <main>
      <header>
        <h1>{title}</h1>
        <pre>{slug}</pre>
      </header>
      <Renderer content={content} />
    </main>
  )
}
