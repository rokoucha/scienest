import { Metadata } from 'next'
import React from 'react'
import { articleService } from '../../../app'
import { auth } from '../../../auth'
import { Editor } from '../../../components/Editor'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { Main } from '../../../components/Main'

export const runtime = 'edge'

type Props = Readonly<{ params: { title: [string] } }>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title.at(0)!)

  const article = await articleService.findOneByTitle({ title, signedIn })

  return {
    title: `Edit ${article?.title ?? title}`,
    robots: {
      follow: false,
      index: false,
    },
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title.at(0)!)

  const article = await articleService.findOneByTitle({ title, signedIn })

  return (
    <>
      <Header editing={true} signedIn={signedIn} title={title} />
      <Main>
        <Editor
          id={article?.id}
          raw={article?.raw}
          scope={article?.scope}
          title={title}
        />
      </Main>
      <Footer />
    </>
  )
}
export default Page
