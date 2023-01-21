import { json, LoaderArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { PostService } from '../services/post'
import { toJSONCompatible } from '../utils/json'

export const loader = async ({ context }: LoaderArgs) => {
  const service = new PostService(context.DB)

  const posts = await service.findMany()

  return json(toJSONCompatible(posts))
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
