import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/cloudflare'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Viewer } from 'src/components/viewer'
import { z } from 'zod'
import { Post } from '../models/post'
import { PostService } from '../services/post'
import { toJSONCompatible } from '../utils/json'

export const loader = async ({ context, params, request }: LoaderArgs) => {
  const url = new URL(request.url)
  const isEditMode = url.searchParams.get('edit') !== null

  const slug = params['*'] ?? ''

  const service = new PostService(context.DB)

  const post = await service.findBySlug(slug)

  if (!post) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  return json(toJSONCompatible({ isEditMode, post }))
}

export const action = async ({ context, request }: ActionArgs) => {
  const body = await request.formData()
  const { id, password } = z
    .object({ id: z.string(), password: z.string() })
    .parse(Object.fromEntries(body.entries()))

  if (context.EDIT_PASSWORD !== password) {
    throw new Response('Authroization Required', {
      status: 401,
    })
  }

  const service = new PostService(context.DB)

  switch (request.method) {
    case 'PUT': {
      const input = Post.pick({
        slug: true,
        scope: true,
        text: true,
      }).parse(Object.fromEntries(body.entries()))

      await service.update(id, input)

      return redirect(`/${input.slug}`)
    }

    case 'DELETE': {
      await service.delete(id)

      return redirect('/')
    }

    default: {
      throw new Response('Method Not Allowed', { status: 405 })
    }
  }
}

export default function Index() {
  const { isEditMode, post } = z
    .object({ isEditMode: z.boolean(), post: Post })
    .parse(useLoaderData<typeof loader>())

  return isEditMode ? (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Edit Post</h1>
      <div>
        <Form method="put" action={`/${post.slug}`}>
          <input type="hidden" name="id" defaultValue={post.id} />
          <div>
            <label htmlFor="slug">slug</label>
            <input type="text" name="slug" defaultValue={post.slug} id="slug" />
          </div>
          <div>
            <label htmlFor="scope">scope</label>
            <select name="scope" defaultValue={post.scope} id="scope">
              <option value="Private">非公開</option>
              <option value="Protected">限定公開</option>
              <option value="Public">公開</option>
            </select>
          </div>
          <div>
            <label htmlFor="text">text</label>
            <textarea name="text" defaultValue={post.text} id="text" />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <button type="submit">Post</button>
          </div>
        </Form>
      </div>
      <br />
      <div>
        <Form method="delete" action={`/${post.slug}`}>
          <input type="hidden" name="id" value={post.id} />
          <div>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <button type="submit">delete</button>
          </div>
        </Form>
      </div>
      <div>
        <Link to={`/${post.slug}`}>cancel</Link>
      </div>
    </div>
  ) : (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
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
      <Viewer slug={post.slug} text={post.text} title={post.title} />
      <div>
        <Link to="/">top</Link>
      </div>
      <div>
        <Link to="?edit">edit</Link>
      </div>
    </div>
  )
}
