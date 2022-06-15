import type React from 'react'
import Markdown from 'markdown-to-jsx'

export type ViewerProps = { content: string; slug: string }

export const Viewer: React.FC<ViewerProps> = ({ content, slug }) => (
  <main>
    <Markdown children={content} options={{ forceBlock: true }} />
  </main>
)
