import React from 'react'
import { ArticleList } from '../../../model/article'
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer'
import { PageList, PageListProps } from '../Markdown/PageList'

export type ComponentData = { articles: ArticleList }

export type ArticleContentProps = Readonly<{
  componentData: ComponentData
  content: string
}>

export const ArticleContent: React.FC<ArticleContentProps> = ({
  componentData,
  content,
}) => (
  <MarkdownRenderer
    contents={content}
    options={{
      overrides: {
        PageList: {
          component: PageList,
          props: {
            articles: componentData.articles,
          } satisfies PageListProps,
        },
      },
    }}
  />
)
