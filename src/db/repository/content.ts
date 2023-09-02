import { and, eq, inArray } from 'drizzle-orm'
import { $array } from 'lizod'
import { Content } from '../../model/content'
import { Scope } from '../../model/scope'
import { Database } from '../connection'
import { contents } from '../schema'

export class ContentRepository {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  async findManyByArticleId(
    articleId: string,
    scopes: Scope[],
  ): Promise<Content[]> {
    const ctx = { errors: [] }
    const res = await this.#db
      .select({
        id: contents.id,
        articleId: contents.articleId,
        scope: contents.scope,
        text: contents.text,
        createdAt: contents.createdAt,
      })
      .from(contents)
      .where(
        and(eq(contents.articleId, articleId), inArray(contents.scope, scopes)),
      )
      .all()

    if (!$array(Content)(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res
  }
}
