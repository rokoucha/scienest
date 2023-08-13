import React from 'react'
import { auth } from '../../auth'
import { Editor } from '../../components/Editor'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'

export const runtime = 'edge'

const Page: React.FC = async () => {
  const isSignedIn = (await auth()) !== null

  return (
    <>
      <Header isEditing={true} isSignedIn={isSignedIn} slug="" />
      <Main>
        <Editor post={null} slug="" />
      </Main>
      <Footer />
    </>
  )
}
export default Page
