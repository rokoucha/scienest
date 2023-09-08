import { and, eq, inArray } from 'drizzle-orm'
import { Database } from '../connection'
import { articles, contents } from '../schema'

export class ArticleDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  findOneById(id: string, scopes: string[]) {
    return this.#db
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
      .where(and(eq(articles.id, id), inArray(articles.scope, scopes)))
      .get()
  }

  findOneByTitle(title: string, scopes: string[]) {
    return this.#db
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
      .where(and(eq(articles.title, title), inArray(articles.scope, scopes)))
      .get()
  }

  findMany(scopes: string[]) {
    return this.#db
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
      .where(inArray(articles.scope, scopes))
      .all()
  }

  insertOne(
    id: string,
    scope: string,
    title: string,
    description: string | null,
    latestContentId: string,
  ) {
    return this.#db
      .insert(articles)
      .values({
        id,
        scope,
        title,
        description,
        latestContentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .run()
  }

  updateOne(
    id: string,
    scope: string,
    title: string,
    description: string | null,
    latestContentId: string,
  ) {
    return this.#db
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

  deleteOne(id: string) {
    return this.#db.delete(contents).where(eq(contents.articleId, id)).run()
  }
}
