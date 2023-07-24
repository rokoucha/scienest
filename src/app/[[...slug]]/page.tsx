import { notFound } from 'next/navigation'
import React from 'react'
import { postService } from '../../app'
import { Header } from '../../components/Header'
import { Renderer } from '../../components/Renderer'
import { parse } from '../../markdown'

export const runtime = 'edge'

type Props = Readonly<{ params: { slug: [string] | undefined } }>

const Page: React.FC<Props> = async ({ params }) => {
  const slug = params.slug?.at(0)

  const componentData = await postService.getComponentData()

  const post = await postService.findBySlug(slug ?? 'index')
  if (!post) {
    notFound()
  }

  const { title, description, contents } = parse(post.content)

  const content = [description?.raw ?? '', ...contents.map((t) => t.raw)].join(
    '',
  )

  return (
    <article>
      <Header slug={slug} title={title} />
      <Renderer componentData={componentData} content={content} />
    </article>
  )
}
export default Page
