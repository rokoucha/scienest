import React from 'react'
import { MarkdownRenderer } from '../MarkdownRenderer'

export type ArticleContentProps = Readonly<{
  content: string
}>

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => (
  <section>
    <MarkdownRenderer contents={content} />
  </section>
)
