'use client'

import MonacoEditor from '@monaco-editor/react'
import React, { useState } from 'react'
import { Article } from '../../model/article'
import { Scope } from '../../model/scope'

export type EditorElementProps = Readonly<
  {
    article: Article | null
    title: string
  } & Pick<React.ComponentPropsWithoutRef<'form'>, 'action' | 'method'>
>

export const EditorElement: React.FC<EditorElementProps> = ({
  action,
  article,
  method,
  title,
}) => {
  const [content, setContent] = useState(article?.content ?? '')

  return (
    <div>
      <form action={action} method={method}>
        <input name="id" type="hidden" defaultValue={article?.id} />
        <input name="content" type="hidden" value={content} />
        <div>
          <label htmlFor="scope">公開範囲</label>
          <select
            id="scope"
            name="scope"
            defaultValue={article?.scope ?? Scope.Private}
          >
            <option value={Scope.Public}>公開</option>
            <option value={Scope.Protected}>限定公開</option>
            <option value={Scope.Private}>非公開</option>
          </select>
        </div>
        <div>
          <MonacoEditor
            defaultLanguage="markdown"
            defaultValue={article?.content ?? `# ${title}`}
            height="75vh"
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
