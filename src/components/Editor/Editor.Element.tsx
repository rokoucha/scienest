'use client'

import MonacoEditor from '@monaco-editor/react'
import React, { useState } from 'react'
import { Post } from '../../models/post'
import { Scope } from '../../models/scope'

export type EditorElementProps = Readonly<
  {
    post: Post | null
    slug: string
  } & Pick<React.ComponentPropsWithoutRef<'form'>, 'action' | 'method'>
>

export const EditorElement: React.FC<EditorElementProps> = ({
  action,
  method,
  post,
  slug,
}) => {
  const [content, setContent] = useState(post?.content ?? '')

  return (
    <div>
      <form action={action} method={method}>
        <input name="id" type="hidden" defaultValue={post?.id} />
        <input name="content" type="hidden" value={content} />
        <div>
          <label htmlFor="slug">slug</label>
          <input id="slug" name="slug" defaultValue={slug} />
        </div>
        <div>
          <label htmlFor="scope">公開範囲</label>
          <select id="scope" name="scope" defaultValue={post?.scope}>
            <option value={Scope.Public}>公開</option>
            <option value={Scope.Protected}>限定公開</option>
            <option value={Scope.Private}>非公開</option>
          </select>
        </div>
        <div>
          <MonacoEditor
            defaultLanguage="markdown"
            defaultValue={post?.content}
            height="50vh"
            onChange={(value, _e) => setContent(value ?? '')}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
