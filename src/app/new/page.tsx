import React from 'react'
import { savePost } from '../../actions/savePost'
import { Editor } from '../../components/Editor'

export const runtime = 'edge'

const Page: React.FC = async () => {
  return <Editor post={null} handleSubmit={savePost} slug={''} />
}
export default Page
