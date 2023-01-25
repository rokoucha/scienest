import Markdown from 'markdown-to-jsx'
import type React from 'react'
import { ALink } from './alink'

export type RendererProps = Readonly<{ content: string }>

export const Renderer: React.FC<RendererProps> = ({ content }) => (
  <Markdown
    children={content}
    options={{
      forceBlock: true,
      overrides: {
        a: { component: ALink },
      },
      slugify: (s) => s,
    }}
  />
)
