import { json, LoaderArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { Post } from '../models/post'
import { PostService } from '../services/post'

export const loader = async ({ context, request }: LoaderArgs) => {
  const session = await context.sessionStorage.getSession(
    request.headers.get('Cookie'),
  )

  let headers = {}

  if (!session.has('userId')) {
    console.log('session not found!')
    session.set('userId', `user:${Math.random()}`)
    headers = {
      'Set-Cookie': await context.sessionStorage.commitSession(session),
    }
  } else {
    console.log(session.get('userId'))
  }

  const service = new PostService(context.DB)

  const posts = await service.findMany()

  return json({ posts: posts }, { headers })
}

export default function Index() {
  const { posts } = z
    .object({ posts: z.array(Post) })
    .parse(useLoaderData<typeof loader>())

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Scienest</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/${p.slug}`}>{p.title}</Link>
            <p>{p.description ?? ''}</p>
          </li>
        ))}
      </ul>
      <div>
        <Link to="/new">new</Link>
      </div>
    </div>
  )
}
