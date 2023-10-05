import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { articleService } from '../../app'
import { auth } from '../../auth'
import { Article } from '../../components/Article'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { Scope } from '../../model/scope'

export const runtime = 'edge'

type Props = Readonly<{ params: { title: [string] | undefined } }>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title?.at(0) ?? 'index')

  const article = await articleService.findOneByTitle({ title, signedIn })

  return {
    title: article?.title,
    description: article?.description,
    robots: {
      follow: article?.scope === Scope.Public,
      index: article?.scope === Scope.Public,
    },
    alternates: {
      types: {
        'application/feed+json': [
          {
            title: process.env.SITE_NAME,
            url: `/api/feed/${encodeURIComponent(title)}`,
          },
        ],
      },
    },
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title?.at(0) ?? 'index')

  const article = await articleService.findOneByTitle({ title, signedIn })
  if (!article) {
    if (signedIn) {
      redirect(`/edit/${title}`)
    }

    if (title === 'index') {
      redirect('/auth/signin')
    }

    notFound()
  }

  const componentData = await articleService.getComponentData(signedIn)

  return (
    <>
      <Header editing={false} signedIn={signedIn} title={title} />
      <Main>
        <Article article={article} componentData={componentData} />
      </Main>
      <Footer />
    </>
  )
}
export default Page
