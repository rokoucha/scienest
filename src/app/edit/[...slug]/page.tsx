import React from 'react'
import { postService } from '../../../app'
import { Scope } from '../../../constants'

export const runtime = 'edge'

type Props = Readonly<{ params: { slug: [string] } }>

const Page: React.FC<Props> = async ({ params }) => {
  const slug = params.slug[0]

  async function save(data: FormData) {
    'use server'

    console.log(...data.entries())
  }

  const post = await postService.findBySlug(slug)

  return (
    <div>
      <form action={save}>
        <div>
          <select name="scope" defaultValue={post?.scope}>
            <option value={Scope.Public}>Public</option>
            <option value={Scope.Protected}>Protected</option>
            <option value={Scope.Private}>Private</option>
          </select>
        </div>
        <div>
          <textarea name="content" defaultValue={post?.content} />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
export default Page
