import React from 'react'
import { Post } from '../../models/post'
import { Scope } from '../../models/scope'
import { textarea } from './Editor.css'

export type EditorProps = Readonly<{
  post: Post | null
  slug: string
}>

export const Editor: React.FC<EditorProps> = ({ post, slug }) => {
  return (
    <div>
      <input name="id" type="hidden" defaultValue={post?.id} />
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
        <textarea
          className={textarea}
          name="content"
          defaultValue={post?.content}
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </div>
  )
}
