import { notFound } from 'next/navigation'
import React from 'react'
import { postService } from '../../app'
import { auth } from '../../auth'
import { Article } from '../../components/Article'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'

export const runtime = 'edge'

type Props = Readonly<{ params: { slug: [string] | undefined } }>

const Page: React.FC<Props> = async ({ params }) => {
  const session = await auth()

  const slug = params.slug?.at(0) ?? 'index'

  const componentData = await postService.getComponentData()

  const post = await postService.findBySlug(slug)
  if (!post) {
    notFound()
  }

  return (
    <>
      <Header isEditing={false} isSignedIn={session !== null} slug={slug} />
      <Main>
        <Article componentData={componentData} post={post} />
      </Main>
      <Footer />
    </>
  )
}
export default Page
