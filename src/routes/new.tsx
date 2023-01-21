import { ActionArgs, redirect } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
import { PostsDAO } from '../dao/posts'
import { Post } from '../models/post'

export const action = async ({ request, context }: ActionArgs) => {
  const body = await request.formData()
  const input = Post.pick({
    slug: true,
    scope: true,
    text: true,
  }).parse(Object.fromEntries(body.entries()))

  const dao = new PostsDAO(context.DB)
  await dao.create(input)

  return redirect('/')
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
          <button type="submit">Post</button>
        </Form>
      </div>
    </div>
  )
}
