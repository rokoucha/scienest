import { eq, inArray, sql } from 'drizzle-orm'
import { Database } from '../connection'
import { articleLinks, links } from '../schema'

export class LinkDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  findManyByArticleId(articleId: string) {
    return this.#db
      .select({
        id: links.id,
        title: links.title,
        count: sql<number>`count(${articleLinks.id})`,
      })
      .from(links)
      .innerJoin(articleLinks, eq(links.id, articleLinks.linkId))
      .where(eq(articleLinks.articleId, articleId))
      .groupBy(links.id, articleLinks.articleId)
      .all()
  }

  findManyByArticleIds(articleIds: string[]) {
    return this.#db
      .select({
        id: links.id,
        articleId: articleLinks.articleId,
        title: links.title,
        count: sql<number>`count(${articleLinks.id})`,
      })
      .from(links)
      .innerJoin(articleLinks, eq(links.id, articleLinks.linkId))
      .where(inArray(articleLinks.articleId, articleIds))
      .groupBy(links.id, articleLinks.articleId)
      .all()
  }

  findManyByTitles(titles: string[]) {
    return this.#db
      .select({
        id: links.id,
        title: links.title,
      })
      .from(links)
      .where(inArray(links.title, titles))
      .all()
  }

  insertMany(articleLinks: { id: string; title: string }[]) {
    const now = new Date().toISOString()

    return this.#db
      .insert(links)
      .values(articleLinks.map((l) => ({ ...l, createdAt: now })))
      .onConflictDoNothing()
      .run()
  }
}
