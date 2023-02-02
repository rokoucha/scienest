import { json, LoaderArgs, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

export const loader = async ({ context }: LoaderArgs) => {
  return json({ siteName: context.SITE_NAME })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => ({
  charset: 'utf-8',
  title: data.siteName,
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
