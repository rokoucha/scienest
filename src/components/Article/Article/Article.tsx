import React from 'react'
import { Article as ArticleModel } from '../../../model/article'
import { ArticleContent, ComponentData } from '../ArticleContent/ArticleContent'
import { ArticleHeader } from '../ArticleHeader'

export type ArticleProps = Readonly<{
  article: ArticleModel
  componentData: ComponentData
}>

export const Article: React.FC<ArticleProps> = ({ article, componentData }) => {
  const path = `/${article.title === 'index' ? '' : article.title}`

  return (
    <div>
      <ArticleHeader
        createdAt={new Date(article.createdAt)}
        heading={article.heading}
        histories={article.histories ?? []}
        links={article.links ?? []}
        path={path}
        scope={article.scope}
        toc={article.toc}
      />
      <ArticleContent componentData={componentData} content={article.content} />
    </div>
  )
}
