import type React from 'react'
import { Renderer } from './renderer'

export type ViewerProps = { content: string; slug: string }

export const Viewer: React.FC<ViewerProps> = ({ content, slug }) => (
  <main>
    <Renderer content={content} />
  </main>
)
