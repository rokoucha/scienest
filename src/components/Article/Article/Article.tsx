import React from 'react'
import { Article as ArticleModel } from '../../../model/article'
import { parse, tokenToRaw, tokensToRaw } from '../../../parser/markdown'
import { ArticleContent } from '../ArticleContent'
import { ComponentData } from '../ArticleContent/ArticleContent'
import { ArticleFooter } from '../ArticleFooter'
import { ArticleHeader } from '../ArticleHeader'

export type ArticleProps = Readonly<{
  article: ArticleModel
  componentData: ComponentData
}>

export const Article: React.FC<ArticleProps> = ({ article, componentData }) => {
  const { title, contents } = parse(article.content)

  return (
    <div>
      <ArticleHeader
        createdAt={new Date(article.createdAt)}
        title={tokenToRaw(title)}
      />
      <ArticleContent
        componentData={componentData}
        contents={tokensToRaw(contents)}
      />
      <ArticleFooter />
    </div>
  )
}
