import { Metadata } from 'next'
import React from 'react'
import { articleService } from '../../../app'
import { auth } from '../../../auth'
import { Editor } from '../../../components/Editor'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { Main } from '../../../components/Main'

export const runtime = 'edge'

type Props = Readonly<{ params: { title: [string] | undefined } }>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isSignedIn = await auth().then((s) => s !== null)

  const title = params.title?.at(0) ?? 'index'

  const article = await articleService.findOneByTitle(title, isSignedIn)

  return {
    title: `Edit ${article?.title}`,
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const isSignedIn = (await auth()) !== null

  const title = params.title?.at(0) ?? ''

  const article = await articleService
    .findOneByTitle(title, isSignedIn)
    .catch(() => null)

  return (
    <>
      <Header isEditing={true} isSignedIn={isSignedIn} title={title} />
      <Main>
        <Editor article={article} title={title} />
      </Main>
      <Footer />
    </>
  )
}
export default Page
