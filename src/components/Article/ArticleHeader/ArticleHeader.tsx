import React from 'react'
import { Heading } from '../Markdown/Heading'
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer'
import {
  dateText,
  heading,
  headingContainer,
  infoContainer,
  pathText,
  wrapper,
} from './ArticleHeader.css'

export type ArticleHeaderProps = Readonly<{
  createdAt: Date
  path: string
  title: string
}>

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  createdAt,
  path,
  title,
}) => {
  return (
    <header className={wrapper}>
      <div className={headingContainer}>
        <MarkdownRenderer
          contents={title}
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
          <time>
            {createdAt.getFullYear()}-
            {String(createdAt.getMonth() + 1).padStart(2, '0')}-
            {String(createdAt.getDate()).padStart(2, '0')}
          </time>
        </p>
        <pre className={pathText}>{path}</pre>
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
