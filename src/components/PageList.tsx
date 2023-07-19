import Link from 'next/link'
import React from 'react'
import { Post } from '../models/post'

export type PageListProps = Readonly<{
  posts: Post[]
}>

export const PageList: React.FC<PageListProps> = ({ posts }) => (
  <ul>
    {posts.map((p) => (
      <li key={p.id}>
        <Link href={`/${p.slug === 'index' ? '' : p.slug}`}>{p.slug}</Link>
        <p>{p.description ?? ''}</p>
      </li>
    ))}
  </ul>
)
