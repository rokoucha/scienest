import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { articleService } from '../../app'
import { auth } from '../../auth'
import { Article } from '../../components/Article'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'

export const runtime = 'edge'

type Props = Readonly<{ params: { title: [string] | undefined } }>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isSignedIn = await auth().then((s) => s !== null)

  const title = params.title?.at(0) ?? 'index'

  const article = await articleService.findOneByTitle(title, isSignedIn)

  return {
    title: article?.title,
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const isSignedIn = (await auth()) !== null

  const title = params.title?.at(0) ?? 'index'

  const componentData = await articleService.getComponentData(isSignedIn)

  const article = await articleService.findOneByTitle(title, isSignedIn)
  if (!article) {
    if (title === 'index') {
      redirect(isSignedIn ? '/edit/index' : '/auth/signin')
    }

    notFound()
  }

  return (
    <>
      <Header isEditing={false} isSignedIn={isSignedIn} title={title} />
      <Main>
        <Article componentData={componentData} article={article} />
      </Main>
      <Footer />
    </>
  )
}
export default Page
