import { eq } from 'drizzle-orm'
import { Database } from '../connection'
import { articleLinks } from '../schema'

export class ArticleLinkDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  insertMany(links: { articleId: string; linkId: string }[]) {
    return this.#db
      .insert(articleLinks)
      .values(links)
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
