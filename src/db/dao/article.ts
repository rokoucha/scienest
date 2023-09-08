import { and, eq, inArray, sql } from 'drizzle-orm'
import { db } from '../connection'
import { articles, contents } from '../schema'

export class ArticleDAO {
  private readonly _findOneById = db
    .select({
      id: articles.id,
      scope: articles.scope,
      title: articles.title,
      description: articles.description,
      content: contents.text,
      createdAt: articles.createdAt,
      updatedAt: articles.updatedAt,
    })
    .from(articles)
    .innerJoin(
      contents,
      and(
        eq(articles.id, contents.articleId),
        eq(articles.latestContentId, contents.id),
      ),
    )
    .where(
      and(
        eq(articles.id, sql.placeholder('id')),
        inArray(articles.scope, sql.placeholder('scopes')),
      ),
    )
    .limit(1)
    .prepare()

  public async findOneById(id: string, scopes: string[]) {
    return this._findOneById.get({ id, scopes })
  }

  private readonly _findOneByTitle = db
    .select({
      id: articles.id,
      scope: articles.scope,
      title: articles.title,
      description: articles.description,
      content: contents.text,
      createdAt: articles.createdAt,
      updatedAt: articles.updatedAt,
    })
    .from(articles)
    .innerJoin(
      contents,
      and(
        eq(articles.id, contents.articleId),
        eq(articles.latestContentId, contents.id),
      ),
    )
    .where(
      and(
        eq(articles.title, sql.placeholder('title')),
        inArray(articles.scope, sql.placeholder('scopes')),
      ),
    )
    .limit(1)
    .prepare()

  public async findOneByTitle(title: string, scopes: string[]) {
    return this._findOneByTitle.get({ title, scopes })
  }

  private readonly _findMany = db
    .select({
      id: articles.id,
      scope: articles.scope,
      title: articles.title,
      description: articles.description,
      content: contents.text,
      createdAt: articles.createdAt,
      updatedAt: articles.updatedAt,
    })
    .from(articles)
    .innerJoin(
      contents,
      and(
        eq(articles.id, contents.articleId),
        eq(articles.latestContentId, contents.id),
      ),
    )
    .where(inArray(articles.scope, sql.placeholder('scopes')))
    .prepare()

  public async findMany(scopes: string[]) {
    return this._findMany.all({ scopes })
  }

  private readonly _insertOne = db
    .insert(articles)
    .values({
      id: sql.placeholder('id'),
      scope: sql.placeholder('scope'),
      title: sql.placeholder('title'),
      description: sql.placeholder('description'),
      latestContentId: sql.placeholder('latestContentId'),
      createdAt: sql.placeholder('createdAt'),
      updatedAt: sql.placeholder('updatedAt'),
    })
    .prepare()

  public async insertOne(
    id: string,
    scope: string,
    title: string,
    description: string | null,
    latestContentId: string,
  ) {
    return this._insertOne.run({
      id,
      scope,
      title,
      description,
      latestContentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  public async updateOne(
    id: string,
    scope: string,
    title: string,
    description: string | null,
    latestContentId: string,
  ) {
    return db
      .update(articles)
      .set({
        scope,
        title,
        description,
        latestContentId,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(articles.id, id))
      .run()
  }

  private readonly _deleteOne = db
    .delete(contents)
    .where(eq(contents.articleId, sql.placeholder('id')))
    .prepare()

  public async deleteOne(id: string) {
    return this._deleteOne.run({ id })
  }
}
