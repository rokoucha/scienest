import { json, LoaderArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Renderer } from '../components/renderer'
import { Post } from '../models/post'
import { PostService } from '../services/post'
import { toJSONCompatible } from '../utils/json'

export const loader = async ({ context, params }: LoaderArgs) => {
  const service = new PostService(context.DB)

  const post = await service.findBySlug(params['*'] ?? '')

  if (!post) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  return json(toJSONCompatible(post))
}

export default function Index() {
  const post = Post.parse(useLoaderData<typeof loader>())

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>{post.slug}</h1>
      <ul>
        <li>
          <code>{post.id}</code>
        </li>
        <li>
          <code>{post.created_at.toISOString()}</code>
        </li>
        <li>
          <code>{post.updated_at.toISOString()}</code>
        </li>
        <li>
          <code>{post.scope}</code>
        </li>
      </ul>
      <Renderer content={post.text} />
    </div>
  )
}
