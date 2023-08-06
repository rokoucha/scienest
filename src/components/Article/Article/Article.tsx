import React from 'react'
import { parse, tokenToRaw, tokensToRaw } from '../../../markdown'
import { Post } from '../../../models/post'
import { ArticleContent } from '../ArticleContent'
import { ComponentData } from '../ArticleContent/ArticleContent'
import { ArticleFooter } from '../ArticleFooter'
import { ArticleHeader } from '../ArticleHeader'

export type ArticleProps = Readonly<{
  componentData: ComponentData
  post: Post
}>

export const Article: React.FC<ArticleProps> = ({ componentData, post }) => {
  const { title, description, contents } = parse(post.content)

  return (
    <div>
      <ArticleHeader
        createdAt={new Date(post.created_at)}
        description={tokenToRaw(description)}
        slug={post.slug}
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
