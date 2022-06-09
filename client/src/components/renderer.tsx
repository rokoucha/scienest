import Markdown from 'markdown-to-jsx'
import type React from 'react'

export type RendererProps = { content: string }
export const Renderer: React.FC<RendererProps> = ({ content }) => (
  <Markdown
    children={content}
    options={{ forceWrapper: true, wrapper: 'article' }}
  />
)
