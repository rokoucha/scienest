import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { ArticleListItem } from '../../model/article'
import {
  container,
  dateText,
  descriptionText,
  link,
  linkList,
  linkedLink,
  thumbnail,
  thumbnailAlt,
  titleText,
  unlinkedLink,
  wrapper,
} from './ArticleCard.css'

export type ArticleCardProps = Readonly<{
  article: ArticleListItem
  className?: string | undefined
}>

export const ArticleCard: React.FC<ArticleCardProps> = ({
  className,
  article,
}) => {
  return (
    <article className={clsx(wrapper, className)}>
      <Link href={`/${encodeURIComponent(article.title)}`}>
        {article.thumbnailUrl ? (
          <img
            alt={article.title}
            className={thumbnail}
            src={article.thumbnailUrl}
          />
        ) : (
          <span className={thumbnailAlt}>📄</span>
        )}
      </Link>
      <div className={container}>
        <header>
          <Link href={`/${encodeURIComponent(article.title)}`}>
            <h1 className={titleText}>{article.title}</h1>
          </Link>
          <time className={dateText}>{article.createdAt}</time>
        </header>
        <section>
          <p className={descriptionText}>{article.description}</p>
        </section>
        <footer>
          <ul className={linkList}>
            {article.links?.map(({ title, linked }) => (
              <li key={title}>
                <Link
                  className={clsx(link, linked ? linkedLink : unlinkedLink)}
                  href={`/${encodeURIComponent(title)}`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </article>
  )
}
