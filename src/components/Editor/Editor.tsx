'use client'

import React from 'react'
import { savePost } from '../../actions/savePost'
import { Post } from '../../models/post'
import { EditorElement } from './Editor.Element'

export type EditorProps = Readonly<{
  post: Post | null
  slug: string
}>

export const Editor: React.FC<EditorProps> = ({ post, slug }) => {
  return <EditorElement action={savePost} post={post} slug={slug} />
}
