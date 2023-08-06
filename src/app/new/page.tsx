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
        <Editor post={null} handleSubmit={savePost} slug="" />
      </Main>
      <Footer />
    </>
  )
}
export default Page
