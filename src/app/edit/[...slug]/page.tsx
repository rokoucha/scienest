import React from 'react'
import { savePost } from '../../../actions/savePost'
import { postService } from '../../../app'
import { Editor } from '../../../components/Editor'

export const runtime = 'edge'

type Props = Readonly<{ params: { slug: [string] | undefined } }>

const Page: React.FC<Props> = async ({ params }) => {
  const slug = params.slug?.at(0)
  if (!slug) {
    throw new Error('slug is required')
  }

  const post = await postService.findBySlug(slug)

  return <Editor post={post} handleSubmit={savePost} slug={slug} />
}
export default Page
