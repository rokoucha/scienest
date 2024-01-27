import { eq, inArray } from 'drizzle-orm'
import { Database } from '../connection'
import { thumbnails } from '../schema'

export class ThumbnailDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  findOneByArticleId(articleId: string) {
    return this.#db
      .select({
        id: thumbnails.id,
        articleId: thumbnails.articleId,
        url: thumbnails.url,
        createdAt: thumbnails.createdAt,
        updatedAt: thumbnails.updatedAt,
      })
      .from(thumbnails)
      .where(eq(thumbnails.articleId, articleId))
      .get()
  }

  findManyByArticleIds(articleIds: string[]) {
    return this.#db
      .select({
        id: thumbnails.id,
        articleId: thumbnails.articleId,
        url: thumbnails.url,
        createdAt: thumbnails.createdAt,
        updatedAt: thumbnails.updatedAt,
      })
      .from(thumbnails)
      .where(inArray(thumbnails.articleId, articleIds))
      .all()
  }

  upsertOne(id: string, articleId: string, url: string | null) {
    return this.#db
      .insert(thumbnails)
      .values({
        id,
        articleId,
        url,
      })
      .onConflictDoUpdate({
        target: thumbnails.articleId,
        set: {
          articleId,
          url,
          updatedAt: new Date().toISOString(),
        },
      })
      .run()
  }

  deleteOneByArticleId(articleId: string) {
    return this.#db
      .delete(thumbnails)
      .where(eq(thumbnails.articleId, articleId))
      .run()
  }
}
