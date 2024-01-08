import React from 'react'
import { ArticleList, Article as ArticleModel } from '../../../model/article'
import { ArticleContent, ComponentData } from '../ArticleContent/ArticleContent'
import { ArticleFooter } from '../ArticleFooter'
import { ArticleHeader } from '../ArticleHeader'
import { container } from './Article.css'

export type ArticleProps = Readonly<{
  article: ArticleModel
  componentData: ComponentData
  links: ArticleList
}>

export const Article: React.FC<ArticleProps> = ({
  article,
  componentData,
  links,
}) => {
  const path = `/${article.title === 'index' ? '' : article.title}`

  return (
    <div className={container}>
      <ArticleHeader
        createdAt={new Date(article.createdAt)}
        heading={article.heading ?? `# ${article.title}`}
        histories={article.histories ?? []}
        links={article.links ?? []}
        path={path}
        scope={article.scope}
        toc={article.toc ?? []}
      />
      {article.content && (
        <ArticleContent
          componentData={componentData}
          content={article.content}
        />
      )}
      <ArticleFooter articles={links} existContent={article.content !== null} />
    </div>
  )
}
