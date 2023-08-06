import React from 'react'
import { Heading } from '../Markdown/Heading'
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer'
import {
  dateText,
  heading,
  headingContainer,
  infoContainer,
  slugText,
  wrapper,
} from './ArticleHeader.css'

export type ArticleHeaderProps = Readonly<{
  createdAt: Date
  description: string | undefined
  slug: string
  title: string | undefined
}>

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  createdAt,
  description,
  slug,
  title,
}) => {
  return (
    <header className={wrapper}>
      <div className={headingContainer}>
        <MarkdownRenderer
          contents={title ?? `# ${slug}`}
          options={{
            overrides: {
              h1: {
                component: Heading,
                props: {
                  className: heading,
                  level: 1,
                },
              },
            },
          }}
        />
      </div>
      <div className={infoContainer}>
        <p className={dateText}>
          <time>{createdAt.toLocaleDateString()}</time>
        </p>
        <pre className={slugText}>{`/${slug === 'index' ? '' : slug}`}</pre>
      </div>
      <div>
        {description !== undefined && (
          <MarkdownRenderer contents={description} />
        )}
      </div>
      <div>
        <pre>tags: []</pre>
      </div>
      <div>
        <pre>toc: []</pre>
      </div>
    </header>
  )
}
