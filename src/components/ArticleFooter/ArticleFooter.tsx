import clsx from 'clsx'
import React from 'react'
import { ArticleList } from '../../model/article'
import { ArticleCard } from '../ArticleCard'
import {
  articleItem,
  articleList,
  hr,
  titleText,
  wrapper,
} from './ArticleFooter.css'

export type ArticleFooterProps = Readonly<{
  articles: ArticleList
  existContent?: boolean | undefined
}>

export const ArticleFooter: React.FC<ArticleFooterProps> = ({
  articles,
  existContent,
}) => {
  return (
    <footer className={clsx({ [wrapper]: true, [hr]: existContent ?? true })}>
      {existContent && (
        <header>
          <h2 className={titleText}>Related article</h2>
        </header>
      )}
      <section>
        {articles.length > 0 ? (
          <section className={articleList}>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                className={articleItem}
                article={article}
              />
            ))}
          </section>
        ) : (
          <p>No related article.</p>
        )}
      </section>
    </footer>
  )
}
