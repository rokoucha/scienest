import Markdown from 'markdown-to-jsx'
import { marked } from 'marked'
import React from 'react'
import { Heading } from './Markdown/Heading'

export type ArticleHeaderProps = Readonly<{
  slug: string | undefined
  title: marked.Token | undefined
}>

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  slug,
  title,
}) => {
  return (
    <header>
      {title ? (
        <Markdown
          children={title.raw}
          options={{
            forceBlock: true,
            overrides: {
              h1: {
                component: ({ children, id }) => (
                  <Heading id={id} level={1}>
                    {children}
                  </Heading>
                ),
              },
            },
          }}
        />
      ) : (
        <h1>{slug ?? 'index'}</h1>
      )}
      <a href={`/edit/${slug ?? 'index'}`}>edit</a>
      <pre>{`/${slug ?? ''}`}</pre>
    </header>
  )
}
