import type React from 'react'
import { Post } from '../models/post'
import { Renderer } from './Renderer'

export type ViewerProps = Readonly<{
  componentData: { posts: Post[] }
  post: Post
}>

export const Viewer: React.FC<ViewerProps> = ({ componentData, post }) => {
  const contentLines = post.text.split('\n')

  const content =
    contentLines.length > 2
      ? contentLines.slice(2).join('\n')
      : contentLines.join('\n')

  return (
    <main>
      <header>
        <h1>{post.title}</h1>
        <ul>
          <li>
            <code>{`/${post.slug === 'index' ? '' : post.slug}`}</code>
          </li>
          <li>
            <code>{post.id}</code>
          </li>
          <li>
            <code>{post.created_at.toISOString()}</code>
          </li>
          <li>
            <code>{post.updated_at.toISOString()}</code>
          </li>
          <li>
            <code>{post.scope}</code>
          </li>
        </ul>
      </header>
      <Renderer content={content} componentData={componentData} />
    </main>
  )
}
