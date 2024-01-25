import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import React from 'react'
import { MarkdownHeading, MarkdownHeadingProps } from '../MarkdownHeading'
import { MarkdownLink } from '../MarkdownLink'
import { blockquote, code, img, ol, pre, ul } from './Markdown.css'

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
          component: MarkdownLink,
        },
        h1: {
          component: MarkdownHeading,
          props: {
            level: 1,
          } satisfies MarkdownHeadingProps,
        },
        h2: {
          component: MarkdownHeading,
          props: {
            level: 2,
          } satisfies MarkdownHeadingProps,
        },
        h3: {
          component: MarkdownHeading,
          props: {
            level: 3,
          } satisfies MarkdownHeadingProps,
        },
        h4: {
          component: MarkdownHeading,
          props: {
            level: 4,
          } satisfies MarkdownHeadingProps,
        },
        h5: {
          component: MarkdownHeading,
          props: {
            level: 5,
          } satisfies MarkdownHeadingProps,
        },
        h6: {
          component: MarkdownHeading,
          props: {
            level: 6,
          } satisfies MarkdownHeadingProps,
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
        pre: {
          component: 'pre',
          props: {
            className: pre,
          },
        },
        ol: {
          component: 'ol',
          props: {
            className: ol,
          },
        },
        img: {
          component: 'img',
          props: {
            className: img,
            loading: 'lazy',
          },
        },
        ...options?.overrides,
      },
    }}
  />
)
