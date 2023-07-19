import React from 'react'
import { auth } from '../../auth'
import { SignIn } from '../../components/SignIn'
import { SignOut } from '../../components/SignOut'

export const runtime = 'edge'

type Props = Readonly<{ params: { slug: [string] } }>

const Page: React.FC<Props> = async ({ params }) => {
  const session = await auth()

  return (
    <div>
      <h1>Hello, Next.js!!!!!!</h1>
      <p>{params.slug}</p>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        {session ? (
          <SignOut>Sign out</SignOut>
        ) : (
          <SignIn>Sign in with GitHub</SignIn>
        )}
      </div>
    </div>
  )
}
export default Page
