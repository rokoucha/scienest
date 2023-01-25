import { Link } from '@remix-run/react'
import React from 'react'
import { Post } from '../models/post'

export type PageListProps = Readonly<{
  posts: Post[]
}>

export const PageList: React.FC<PageListProps> = ({ posts }) => (
  <ul>
    {posts.map((p) => (
      <li key={p.id}>
        <Link to={`/${p.slug === 'index' ? '' : p.slug}`}>{p.title}</Link>
        <p>{p.description ?? ''}</p>
      </li>
    ))}
  </ul>
)
