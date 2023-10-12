import React from 'react'
import { ArticleList } from '../../../model/article'
import { ArticleCard } from '../ArticleCard'
import { articleItem, articleList, wrapper } from './ArticleFooter.css'

export type ArticleFooterProps = Readonly<{
  articles: ArticleList
}>

export const ArticleFooter: React.FC<ArticleFooterProps> = ({ articles }) => {
  return (
    <footer className={wrapper}>
      <section>
        <header>
          <h1>Related article</h1>
        </header>
        <section className={articleList}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              className={articleItem}
              article={article}
            />
          ))}
        </section>
      </section>
    </footer>
  )
}
