import { json, LoaderArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { PostsDAO } from '../dao/posts'

export const loader = async ({ context }: LoaderArgs) => {
  const dao = new PostsDAO(context.DB)

  return json(await dao.findMany())
}

export default function Index() {
  const result = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <code>{JSON.stringify(result)}</code>
    </div>
  )
}
