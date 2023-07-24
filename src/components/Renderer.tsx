import Markdown from 'markdown-to-jsx'
import Link from 'next/link'
import React from 'react'
import { Post } from '../models/post'
import { Heading } from './Markdown/Heading'
import { PageList } from './Markdown/PageList'

export type ComponentData = { posts: Post[] }

export type RendererProps = Readonly<{
  componentData: ComponentData
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
        a: { component: Link },
        h1: {
          component: ({ children, id }) => (
            <Heading id={id} level={1}>
              {children}
            </Heading>
          ),
        },
        h2: {
          component: ({ children, id }) => (
            <Heading id={id} level={2}>
              {children}
            </Heading>
          ),
        },
        h3: {
          component: ({ children, id }) => (
            <Heading id={id} level={3}>
              {children}
            </Heading>
          ),
        },
        h4: {
          component: ({ children, id }) => (
            <Heading id={id} level={4}>
              {children}
            </Heading>
          ),
        },
        h5: {
          component: ({ children, id }) => (
            <Heading id={id} level={5}>
              {children}
            </Heading>
          ),
        },
        h6: {
          component: ({ children, id }) => (
            <Heading id={id} level={6}>
              {children}
            </Heading>
          ),
        },
        PageList: { component: () => <PageList posts={componentData.posts} /> },
      },
      slugify: (s) => s,
      wrapper: React.Fragment,
    }}
  />
)
