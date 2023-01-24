import { json, LoaderArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { Post } from '../models/post'
import { PostService } from '../services/post'

export const loader = async ({ context, request }: LoaderArgs) => {
  const loggedIn =
    (await context.authenticator.isAuthenticated(request)) === true

  const service = new PostService(context.DB)

  const posts = await service.findMany()

  return json({ posts: posts, loggedIn })
}

export default function Index() {
  const { posts, loggedIn } = z
    .object({ posts: z.array(Post), loggedIn: z.boolean() })
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

      {loggedIn ? (
        <>
          <div>
            <Link to="/new">new</Link>
          </div>
          <div>
            <Link to="/auth/logout">Logout</Link>
          </div>
        </>
      ) : (
        <div>
          <Link to="/auth/login">Login</Link>
        </div>
      )}
    </div>
  )
}
