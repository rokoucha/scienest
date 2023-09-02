import React from 'react'
import { Article } from '../../../model/article'
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer'
import { PageList, PageListProps } from '../Markdown/PageList'

export type ComponentData = { articles: Article[] }

export type ArticleContentProps = Readonly<{
  componentData: ComponentData
  contents: string
}>

export const ArticleContent: React.FC<ArticleContentProps> = ({
  componentData,
  contents,
}) => (
  <MarkdownRenderer
    contents={contents}
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
