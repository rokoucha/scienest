import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { $array } from 'lizod'
import { History } from '../../model/content'
import { Scope } from '../../model/scope'
import { Database } from '../connection'
import { contents } from '../schema'

export class ContentRepository {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  async findManyHistoriesByArticleId(
    articleId: string,
    scopes: Scope[],
  ): Promise<History[]> {
    const ctx = { errors: [] }
    const res = await this.#db
      .select({
        id: contents.id,
        articleId: contents.articleId,
        createdAt: contents.createdAt,
      })
      .from(contents)
      .where(
        and(eq(contents.articleId, articleId), inArray(contents.scope, scopes)),
      )
      .orderBy(desc(sql`datetime(${contents.createdAt})`))
      .all()

    if (!$array(History)(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res
  }
}
