'use client'

import React from 'react'
import { Post } from '../models/post'
import { Scope } from '../models/scope'

export type EditorProps = Readonly<{
  post: Post | null
  handleSubmit: (formData: FormData) => Promise<unknown> | unknown
  slug: string
}>

export const Editor: React.FC<EditorProps> = async ({
  post,
  handleSubmit,
  slug,
}) => {
  return (
    <article>
      <form
        action={async (formData) => {
          await handleSubmit(formData)

          window.alert('なんかうまくいかんかった')
        }}
      >
        <input name="id" type="hidden" defaultValue={post?.id} />
        <input name="slug" defaultValue={slug} />
        <div>
          <select name="scope" defaultValue={post?.scope}>
            <option value={Scope.Public}>公開</option>
            <option value={Scope.Protected}>限定公開</option>
            <option value={Scope.Private}>非公開</option>
          </select>
        </div>
        <div>
          <textarea name="content" defaultValue={post?.content} />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </article>
  )
}
