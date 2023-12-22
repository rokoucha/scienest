import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import React from 'react'
import { Heading, HeadingProps } from '../Heading'
import { Link } from '../Link'
import { blockquote, code, ul } from './Markdown.css'

export type MarkdownRendererProps = Readonly<{
  contents: string
  options?: MarkdownToJSX.Options | undefined
}>

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  contents,
  options,
}) => (
  <Markdown
    children={contents}
    options={{
      forceBlock: true,
      slugify: (s) => s.replaceAll(' ', '-').toLowerCase(),
      wrapper: React.Fragment,
      ...options,
      overrides: {
        a: {
          component: Link,
        },
        h1: {
          component: Heading,
          props: {
            level: 1,
          } satisfies HeadingProps,
        },
        h2: {
          component: Heading,
          props: {
            level: 2,
          } satisfies HeadingProps,
        },
        h3: {
          component: Heading,
          props: {
            level: 3,
          } satisfies HeadingProps,
        },
        h4: {
          component: Heading,
          props: {
            level: 4,
          } satisfies HeadingProps,
        },
        h5: {
          component: Heading,
          props: {
            level: 5,
          } satisfies HeadingProps,
        },
        h6: {
          component: Heading,
          props: {
            level: 6,
          } satisfies HeadingProps,
        },
        ul: {
          component: 'ul',
          props: {
            className: ul,
          },
        },
        blockquote: {
          component: 'blockquote',
          props: {
            className: blockquote,
          },
        },
        code: {
          component: 'code',
          props: {
            className: code,
          },
        },
        ...options?.overrides,
      },
    }}
  />
)
