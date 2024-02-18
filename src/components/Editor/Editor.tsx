'use client'

import MonacoEditor, { useMonaco } from '@monaco-editor/react'
import React, { useState } from 'react'
import { ArticleList } from '../../model/article'

function useMonacoMarkdownExtension() {
  const [registered, setRegistered] = useState(false)
  const monaco = useMonaco()

  if (registered || !monaco) return

  monaco.languages.registerCompletionItemProvider('markdown', {
    triggerCharacters: ['(', '\\', '/', '[', '#'],
    async provideCompletionItems(model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: model.getLineLength(position.lineNumber),
      })
      const match = textUntilPosition.match(/\[[^\]]*\]\($/)
      if (!match) {
        return { suggestions: [] }
      }

      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }

      const res = await fetch(`/api/search?q=${word.word}`)
      if (!res.ok) {
        return { suggestions: [] }
      }

      const articles = await res.json<ArticleList>().catch(() => null)
      if (!articles) {
        return { suggestions: [] }
      }

      return {
        suggestions: articles.map((a) => ({
          documentation: a.description ?? undefined,
          insertText: a.title,
          kind: monaco.languages.CompletionItemKind.Reference,
          label: a.title,
          range,
        })),
      }
    },
  })

  setRegistered(true)
}

export type EditorProps = Readonly<{
  raw: string
}>

export const Editor: React.FC<EditorProps> = ({ raw: currentRaw }) => {
  useMonacoMarkdownExtension()
  const [raw, setRaw] = useState(currentRaw ?? '')

  return (
    <>
      <input name="raw" type="hidden" value={raw} />
      <MonacoEditor
        defaultLanguage="markdown"
        defaultValue={currentRaw}
        height="75vh"
        onChange={(value, _e) => setRaw(value ?? '')}
      />
    </>
  )
}
