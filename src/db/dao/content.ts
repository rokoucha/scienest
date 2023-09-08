import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { Scope } from '../../model/scope'
import { Database } from '../connection'
import { contents } from '../schema'

export class ContentDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  findManyHistoriesByArticleId(articleId: string, scopes: Scope[]) {
    return this.#db
      .select({
        id: contents.id,
        articleId: contents.articleId,
        scope: contents.scope,
        createdAt: contents.createdAt,
      })
      .from(contents)
      .where(
        and(eq(contents.articleId, articleId), inArray(contents.scope, scopes)),
      )
      .orderBy(desc(sql`datetime(${contents.createdAt})`))
      .all()
  }

  insertOne(id: string, articleId: string, scope: Scope, text: string) {
    return this.#db
      .insert(contents)
      .values({
        id,
        articleId,
        scope,
        text,
        createdAt: new Date().toISOString(),
      })
      .run()
  }

  deleteManyByArticleId(id: string) {
    return this.#db
      .delete(contents)
      .where(eq(contents.articleId, sql.placeholder('articleId')))
      .run({ articleId: id })
  }
}
