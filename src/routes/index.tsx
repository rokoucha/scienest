import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'
import { PostsDAO } from '../dao/posts'
import { Post } from '../models'

export const loader = async ({ context }: LoaderArgs) => {
  const dao = new PostsDAO(context.DB)

  return json(await dao.findMany())
}

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
  const result = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <code>{JSON.stringify(result)}</code>
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
