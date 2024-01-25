import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { articleService } from '../../app'
import { auth } from '../../auth'
import { Article } from '../../components/Article'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { TwitterCardLoader } from '../../components/TwitterCardLink'
import { Scope } from '../../model/scope'

export const runtime = 'edge'

type Props = Readonly<{ params: { title: [string] | undefined } }>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title?.at(0) ?? 'index').replaceAll(
    '_',
    ' ',
  )

  const article = await articleService.findOneByTitle({ title, signedIn })
  if (!article) {
    return {
      title: title,
      openGraph: {
        title: title !== 'index' ? title : { absolute: process.env.SITE_NAME },
        type: 'article',
        url: `${process.env.BASE_URL}/${encodeURIComponent(
          title === 'index' ? '' : title,
        )}`,
      },
      twitter: {
        title: title !== 'index' ? title : { absolute: process.env.SITE_NAME },
      },
    }
  }

  return {
    ...(article.title !== 'index' && { title: article.title }),
    description: article.description,
    robots: {
      follow: article.scope === Scope.Public,
      index: article.scope === Scope.Public,
    },
    alternates: {
      types: {
        'application/feed+json': [
          {
            title: process.env.SITE_NAME,
            url: `/api/feed/${encodeURIComponent(
              article.title === 'index' ? '' : title,
            )}`,
          },
        ],
      },
    },
    openGraph: {
      title:
        article.title !== 'index'
          ? article.title
          : { absolute: process.env.SITE_NAME },
      description: article.description ?? undefined,
      type: 'article',
      url: `${process.env.BASE_URL}/${encodeURIComponent(
        article.title === 'index' ? '' : title,
      )}`,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      tags: article.links?.map((l) => l.title),
    },
    twitter: {
      title:
        article.title !== 'index'
          ? article.title
          : { absolute: process.env.SITE_NAME },
      description: article.description ?? undefined,
    },
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title?.at(0) ?? 'index').replaceAll(
    '_',
    ' ',
  )

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

  const links = await articleService.findMany({
    containsRoot: false,
    link: title === 'index' ? undefined : title,
  })

  return (
    <>
      <Header editing={false} signedIn={signedIn} title={title} />
      <Main>
        <Article article={article} links={links} />
      </Main>
      <Footer />
      <TwitterCardLoader />
    </>
  )
}
export default Page
