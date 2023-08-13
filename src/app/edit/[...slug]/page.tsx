import React from 'react'
import { savePost } from '../../../actions/savePost'
import { postService } from '../../../app'
import { auth } from '../../../auth'
import { Editor } from '../../../components/Editor'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { Main } from '../../../components/Main'

export const runtime = 'edge'

type Props = Readonly<{ params: { slug: [string] | undefined } }>

const Page: React.FC<Props> = async ({ params }) => {
  const session = await auth()

  const slug = params.slug?.at(0)
  if (!slug) {
    throw new Error('slug is required')
  }

  const post = await postService.findBySlug(slug)

  return (
    <>
      <Header isEditing={true} isSignedIn={session !== null} slug={slug} />
      <Main>
        <form
          action={async (formData) => {
            await savePost(formData)

            window.alert('なんかうまくいかんかった')
          }}
        >
          <Editor post={post} slug={slug} />
        </form>
      </Main>
      <Footer />
    </>
  )
}
export default Page
