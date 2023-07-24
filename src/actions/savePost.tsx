'use server'

import { $object, $string } from 'lizod'
import { redirect } from 'next/navigation'
import { postService } from '../app'
import { ScopeValidator } from '../models/scope'

export async function savePost(formData: FormData) {
  const entries = Object.fromEntries(formData.entries())
  const ctx = { errors: [] }
  if (
    !$object(
      {
        content: $string,
        id: $string,
        scope: ScopeValidator,
        slug: $string,
      },
      false,
    )(entries, ctx)
  ) {
    throw new Error(JSON.stringify(ctx.errors))
  }
  const { id, ...data } = entries

  const post = await postService.createOrUpdate(id, data)

  return redirect(
    `${process.env.BASE_URL}/${post.slug === 'index' ? '' : post.slug}`,
  )
}
