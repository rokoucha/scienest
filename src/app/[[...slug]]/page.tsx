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
  const isSignedIn = (await auth()) !== null

  const slug = params.slug?.at(0) ?? 'index'

  const componentData = await postService.getComponentData(isSignedIn)

  const post = await postService.findBySlug(slug, isSignedIn)
  if (!post) {
    notFound()
  }

  return (
    <>
      <Header isEditing={false} isSignedIn={isSignedIn} slug={slug} />
      <Main>
        <Article componentData={componentData} post={post} />
      </Main>
      <Footer />
    </>
  )
}
export default Page
