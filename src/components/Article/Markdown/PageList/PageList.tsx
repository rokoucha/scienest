import Link from 'next/link'
import React from 'react'
import { Article } from '../../../../model/article'

export type PageListProps = Readonly<{
  articles: Article[]
}>

export const PageList: React.FC<PageListProps> = ({ articles }) => (
  <ul>
    {articles.map((p) => (
      <li key={p.id}>
        <Link href={`/${p.title === 'index' ? '' : p.title}`}>{p.title}</Link>
        <p>{p.description ?? ''}</p>
      </li>
    ))}
  </ul>
)
