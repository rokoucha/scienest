'use server'

import { $object, $string } from 'lizod'
import { redirect } from 'next/navigation'
import { articleService } from '../app'
import { $Scope } from '../model/scope'

export async function saveArticle(formData: FormData) {
  const entries = Object.fromEntries(formData.entries())
  const ctx = { errors: [] }
  if (
    !$object(
      {
        id: $string,
        raw: $string,
        scope: $Scope,
      },
      false,
    )(entries, ctx)
  ) {
    throw new Error(`Invalid form data: ${JSON.stringify(ctx.errors, null, 2)}`)
  }
  const { id, ...data } = entries

  const article = await articleService.createOrUpdateOne(
    id === '' ? null : id,
    data,
  )

  return redirect(
    `${process.env.BASE_URL}/${encodeURIComponent(
      article.title === 'index' ? '' : article.title,
    )}`,
  )
}
