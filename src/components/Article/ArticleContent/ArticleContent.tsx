import React from 'react'
import { Post } from '../../../models/post'
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer'
import { PageList, PageListProps } from '../Markdown/PageList'

export type ComponentData = { posts: Post[] }

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
            posts: componentData.posts,
          } satisfies PageListProps,
        },
      },
    }}
  />
)
