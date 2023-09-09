'use client'

import MonacoEditor from '@monaco-editor/react'
import React, { useState } from 'react'
import { saveArticle } from '../../actions/article'
import { Scope } from '../../model/scope'

export type EditorProps = Readonly<{
  id?: string | undefined
  raw?: string | undefined
  scope?: Scope | undefined
  title: string
}>

export const Editor: React.FC<EditorProps> = ({
  id,
  raw: currentRaw,
  scope,
  title,
}) => {
  const [raw, setRaw] = useState(currentRaw ?? '')

  return (
    <div>
      <form action={saveArticle}>
        <input name="id" type="hidden" defaultValue={id ?? ''} />
        <input name="raw" type="hidden" value={raw} />
        <div>
          <label htmlFor="scope">公開範囲</label>
          <select id="scope" name="scope" defaultValue={scope ?? Scope.Private}>
            <option value={Scope.Public}>公開</option>
            <option value={Scope.Protected}>限定公開</option>
            <option value={Scope.Private}>非公開</option>
          </select>
        </div>
        <div>
          <MonacoEditor
            defaultLanguage="markdown"
            defaultValue={currentRaw ?? `# ${title}`}
            height="75vh"
            onChange={(value, _e) => setRaw(value ?? '')}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
