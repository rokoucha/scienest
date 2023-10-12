import React from 'react'
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer'

export type ComponentData = {}

export type ArticleContentProps = Readonly<{
  componentData: ComponentData
  content: string
}>

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => (
  <section>
    <MarkdownRenderer contents={content} />
  </section>
)
