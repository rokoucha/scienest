import { ActionArgs, redirect } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
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
          <input type="text" name="slug" />
          <select name="scope">
            <option value="Private">非公開</option>
            <option value="Protected">限定公開</option>
            <option value="Public">公開</option>
          </select>
          <textarea name="text" />
          <input type="password" name="password" />
          <button type="submit">Post</button>
        </Form>
      </div>
    </div>
  )
}
