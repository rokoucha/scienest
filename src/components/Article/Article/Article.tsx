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
  const parsed = useMemo(() => parse(article.content), [article.content])

  const path = useMemo(() => {
    const t = tokensToPlain([parsed.title])
    return `/${t === 'index' ? '' : t}`
  }, [parsed.title])
  const title = useMemo(() => tokenToRaw(parsed.title), [parsed.title])
  const contents = useMemo(
    () => tokensToRaw(parsed.contents),
    [parsed.contents],
  )

  return (
    <div>
      <ArticleHeader
        createdAt={new Date(article.createdAt)}
        path={path}
        scope={article.scope}
        title={title}
        toc={parsed.toc}
      />
      <ArticleContent componentData={componentData} contents={contents} />
      <ArticleFooter />
    </div>
  )
}
