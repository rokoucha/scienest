import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { Scope } from '../../model/scope'
import { db } from '../connection'
import { contents } from '../schema'

export class ContentDAO {
  readonly _findManyHistoriesByArticleId = db
    .select({
      id: contents.id,
      articleId: contents.articleId,
      scope: contents.scope,
      createdAt: contents.createdAt,
    })
    .from(contents)
    .where(
      and(
        eq(contents.articleId, sql.placeholder('articleId')),
        inArray(contents.scope, sql.placeholder('scopes')),
      ),
    )
    .orderBy(desc(sql`datetime(${contents.createdAt})`))
    .prepare()

  async findManyHistoriesByArticleId(articleId: string, scopes: Scope[]) {
    return this._findManyHistoriesByArticleId.all({ articleId, scopes })
  }

  readonly _insertOne = db
    .insert(contents)
    .values({
      id: sql.placeholder('id'),
      articleId: sql.placeholder('articleId'),
      scope: sql.placeholder('scope'),
      text: sql.placeholder('text'),
      createdAt: sql.placeholder('createdAt'),
    })
    .prepare()

  public async insertOne(
    id: string,
    articleId: string,
    scope: Scope,
    text: string,
  ) {
    return this._insertOne.run({
      id,
      articleId,
      scope,
      text,
      createdAt: Date.now().toString(),
    })
  }

  readonly _deleteManyByArticleId = db
    .delete(contents)
    .where(eq(contents.articleId, sql.placeholder('articleId')))
    .prepare()

  public async deleteManyByArticleId(id: string) {
    return this._deleteManyByArticleId.run({ articleId: id })
  }
}
