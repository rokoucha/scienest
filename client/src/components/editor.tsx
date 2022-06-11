import type { PageBase } from 'scienest-common'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { create, update } from '../api'
import { Renderer } from './renderer'

export type EditorProps = { content?: string; slug: string; isExists: boolean }

export const Editor: React.FC<EditorProps> = ({
  content: currentContent = '',
  isExists,
  slug: currentSlug,
}) => {
  const router = useRouter()

  const [slug, setSlug] = useState(currentSlug)
  const [content, setContent] = useState(currentContent)

  const onSlugChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value),
    [],
  )

  const onTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    [],
  )

  const onSubmit = useCallback(async () => {
    const page: PageBase = { slug, content, scope: 'private', tags: [] }

    const res = isExists ? await update(currentSlug, page) : await create(page)

    if (!res) return window.alert('Failed to save')

    return await router.push(`/${slug}`)
  }, [slug, content, isExists])

  return (
    <>
      <div>
        <input type="text" value={slug} onChange={onSlugChange} />
      </div>
      <div>
        <button onClick={onSubmit}>save</button>
      </div>
      <div>
        <div>
          <textarea value={content} onChange={onTextChange} />
        </div>
        <div>
          <Renderer content={content} />
        </div>
      </div>
    </>
  )
}
