import React, { useMemo } from 'react'
import { Article as ArticleModel } from '../../../model/article'
import {
  parse,
  tokenToRaw,
  tokensToPlain,
  tokensToRaw,
} from '../../../parser/markdown'
import { ArticleContent, ComponentData } from '../ArticleContent/ArticleContent'
import { ArticleFooter } from '../ArticleFooter'
import { ArticleHeader } from '../ArticleHeader'

export type ArticleProps = Readonly<{
  article: ArticleModel
  componentData: ComponentData
}>

export const Article: React.FC<ArticleProps> = ({ article, componentData }) => {
  const { title, contents } = useMemo(
    () => parse(article.content),
    [article.content],
  )

  const path = useMemo(() => {
    const t = tokensToPlain([title])
    return `/${t === 'index' ? '' : t}`
  }, [title])

  const rawTitle = useMemo(() => tokenToRaw(title), [title])
  const rawContents = useMemo(() => tokensToRaw(contents), [contents])

  return (
    <div>
      <ArticleHeader
        createdAt={new Date(article.createdAt)}
        path={path}
        title={rawTitle}
      />
      <ArticleContent componentData={componentData} contents={rawContents} />
      <ArticleFooter />
    </div>
  )
}
