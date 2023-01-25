import Markdown from 'markdown-to-jsx'
import type React from 'react'
import { Post } from '../models/post'
import { ALink } from './ALink'
import { PageList } from './PageList'

export type RendererProps = Readonly<{
  componentData: { posts: Post[] }
  content: string
}>

export const Renderer: React.FC<RendererProps> = ({
  componentData,
  content,
}) => (
  <Markdown
    children={content}
    options={{
      forceBlock: true,
      overrides: {
        a: { component: ALink },
        PageList: { component: () => <PageList posts={componentData.posts} /> },
      },
      slugify: (s) => s,
    }}
  />
)
