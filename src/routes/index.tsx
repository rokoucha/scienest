import { json, LoaderArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { Post } from '../models/post'
import { PostService } from '../services/post'
import { toJSONCompatible } from '../utils/json'

export const loader = async ({ context }: LoaderArgs) => {
  const service = new PostService(context.DB)

  const posts = await service.findMany()

  return json(toJSONCompatible(posts))
}

export default function Index() {
  const result = z.array(Post).parse(useLoaderData<typeof loader>())

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Scienest</h1>
      <ul>
        {result.map((r) => (
          <li key={r.id}>
            <Link to={`/${r.slug}`}>{r.title}</Link>
            <p>{r.description ?? ''}</p>
          </li>
        ))}
      </ul>
      <Link to='/new'>new</Link>
    </div>
  )
}
