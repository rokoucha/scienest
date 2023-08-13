import React from 'react'
import { savePost } from '../../actions/savePost'
import { auth } from '../../auth'
import { Editor } from '../../components/Editor'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'

export const runtime = 'edge'

const Page: React.FC = async () => {
  const session = await auth()

  return (
    <>
      <Header isEditing={true} isSignedIn={session !== null} slug="" />
      <Main>
        <form
          action={async (formData) => {
            await savePost(formData)

            window.alert('なんかうまくいかんかった')
          }}
        >
          <Editor post={null} slug="" />
        </form>
      </Main>
      <Footer />
    </>
  )
}
export default Page
