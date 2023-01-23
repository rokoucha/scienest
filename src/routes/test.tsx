import { json, LoaderArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

export const loader = async ({ context, request }: LoaderArgs) => {
  const session = await context.sessionStorage.getSession(
    request.headers.get('Cookie'),
  )

  let headers = {}

  if (!session.has('data')) {
    session.set('data', `data:${Math.floor(Math.random() * 100)}`)
    headers = {
      'Set-Cookie': await context.sessionStorage.commitSession(session),
    }
  }

  return json(
    { session: { id: session.id, data: session.get('data') } },
    { headers },
  )
}

export default function Index() {
  const { session } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Scienest</h1>
      <div>
        <code>{JSON.stringify(session)}</code>
      </div>
      <div>
        <Link to="/">top</Link>
      </div>
    </div>
  )
}
