import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/cloudflare'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { Viewer } from '../components/Viewer'
import { Post } from '../models/post'
import { PostService } from '../services/post'

export const loader = async ({ context, params, request }: LoaderArgs) => {
  const slug = params['*'] ?? 'index'

  const loggedIn =
    (await context.authenticator.isAuthenticated(request)) === true

  const url = new URL(request.url)
  const isEditMode = url.searchParams.get('edit') !== null

  if (!loggedIn && isEditMode) {
    return redirect('/auth/login')
  }

  const service = new PostService(context.DB)

  const post = await service.findBySlug(slug)

  if (!post) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const posts = await service.findMany()

  return json({ isEditMode, loggedIn, post, posts })
}

export const action = async ({ context, request }: ActionArgs) => {
  if (!(await context.authenticator.isAuthenticated(request))) {
    throw new Response('Authroization Required', {
      status: 401,
    })
  }

  const body = await request.formData()
  const { id } = z
    .object({ id: z.string() })
    .parse(Object.fromEntries(body.entries()))

  const service = new PostService(context.DB)

  switch (request.method) {
    case 'PUT': {
      const input = Post.pick({
        slug: true,
        scope: true,
        text: true,
      }).parse(Object.fromEntries(body.entries()))

      await service.update(id, input)

      return redirect(`/${input.slug === 'index' ? '' : input.slug}`)
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
  const { isEditMode, loggedIn, post, posts } = z
    .object({
      isEditMode: z.boolean(),
      loggedIn: z.boolean(),
      post: Post,
      posts: z.array(Post),
    })
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
            <button type="submit">Post</button>
          </div>
        </Form>
      </div>
      <br />
      <div>
        <Form method="delete" action={`/${post.slug}`}>
          <input type="hidden" name="id" value={post.id} />
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
      <Viewer componentData={{ posts }} post={post} />
      <div>
        <p>
          <Link to="/">Top</Link>{' '}
          {loggedIn ? (
            <>
              <Link to="/new">New</Link> <Link to="?edit">Edit</Link>{' '}
              <Link to="/auth/logout">Logout</Link>
            </>
          ) : (
            <Link to="/auth/login">Login</Link>
          )}
        </p>
      </div>
    </div>
  )
}
