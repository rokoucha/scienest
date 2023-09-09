import { eq } from 'drizzle-orm'
import { Database } from '../connection'
import { articleLinks } from '../schema'

export class ArticleLinkDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  insertMany(links: { id: string; articleId: string; linkId: string }[]) {
    const now = new Date().toISOString()

    return this.#db
      .insert(articleLinks)
      .values(links.map((l) => ({ ...l, createdAt: now })))
      .onConflictDoNothing()
      .run()
  }

  deleteManyByArticleId(articleId: string) {
    return this.#db
      .delete(articleLinks)
      .where(eq(articleLinks.articleId, articleId))
      .run()
  }
}
