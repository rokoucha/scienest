import type React from 'react'
import Markdown from 'markdown-to-jsx'

export type ViewerProps = { content: string }

export const Renderer: React.FC<ViewerProps> = ({ content }) => (
  <Markdown children={content} options={{ forceBlock: true }} />
)
