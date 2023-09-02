'use client'

import React from 'react'
import { saveArticle } from '../../actions/article'
import { Article } from '../../model/article'
import { EditorElement } from './Editor.Element'

export type EditorProps = Readonly<{
  article: Article | null
  title: string
}>

export const Editor: React.FC<EditorProps> = ({ article, title }) => {
  return <EditorElement action={saveArticle} article={article} title={title} />
}
