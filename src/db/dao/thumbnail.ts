import { eq, inArray } from 'drizzle-orm'
import { arrayChunk } from '../../array'
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

  async findManyByArticleIds(articleIds: string[]) {
    const chunks = arrayChunk(articleIds, 80) // max 100 parameters

    const t = await Promise.all(
      chunks.map((ids) =>
        this.#db
          .select({
            id: thumbnails.id,
            articleId: thumbnails.articleId,
            url: thumbnails.url,
            createdAt: thumbnails.createdAt,
            updatedAt: thumbnails.updatedAt,
          })
          .from(thumbnails)
          .where(inArray(thumbnails.articleId, ids))
          .all(),
      ),
    )

    return t.flat()
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
