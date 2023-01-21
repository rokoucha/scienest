import { ActionArgs, redirect } from '@remix-run/cloudflare'
import { Form, Link } from '@remix-run/react'
import { Post } from '../models/post'
import { PostService } from '../services/post'

export const action = async ({ request, context }: ActionArgs) => {
  const body = await request.formData()
  const input = Post.pick({
    slug: true,
    scope: true,
    text: true,
  }).parse(Object.fromEntries(body.entries()))

  if (context.EDIT_PASSWORD !== body.get('password')) {
    throw new Response('Authroization Required', {
      status: 401,
    })
  }

  const service = new PostService(context.DB)

  const { slug } = await service.create(input)

  return redirect(`/${slug}`)
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Add new Post</h1>
      <div>
        <Form method="post">
          <input type="hidden" name="id" />
          <div>
            <label htmlFor="slug">slug</label>
            <input type="text" name="slug" id="slug" />
          </div>
          <div>
            <label htmlFor="scope">scope</label>
            <select name="scope" id="scope">
              <option value="Private">非公開</option>
              <option value="Protected">限定公開</option>
              <option value="Public">公開</option>
            </select>
          </div>
          <div>
            <label htmlFor="text">text</label>
            <textarea name="text" id="text" />
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
      <div>
        <Link to="/">cancel</Link>
      </div>
    </div>
  )
}
