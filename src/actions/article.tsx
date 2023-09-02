'use server'

import { $object, $string } from 'lizod'
import { redirect } from 'next/navigation'
import { articleService } from '../app'
import { ScopeValidator } from '../model/scope'

export async function saveArticle(formData: FormData) {
  const entries = Object.fromEntries(formData.entries())
  const ctx = { errors: [] }
  if (
    !$object(
      {
        content: $string,
        id: $string,
        scope: ScopeValidator,
      },
      false,
    )(entries, ctx)
  ) {
    throw new Error(JSON.stringify(ctx.errors))
  }
  const { id, ...data } = entries

  const article = await articleService.createOrUpdateOne(id, data)

  return redirect(
    `${process.env.BASE_URL}/${article.title === 'index' ? '' : article.title}`,
  )
}
