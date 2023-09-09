import { eq, inArray, sql } from 'drizzle-orm'
import { Database } from '../connection'
import { articleLinks, articles, links } from '../schema'

export class LinkDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  #linkedLinks() {
    return this.#db
      .select({
        id: links.id,
        linking: sql<boolean>`count(${articleLinks.articleId}) > 1`.as(
          'linking',
        ),
      })
      .from(links)
      .innerJoin(articleLinks, eq(links.id, articleLinks.linkId))
      .groupBy(links.id)
      .as('linked_links')
  }

  #existLinks() {
    return this.#db
      .select({
        id: links.id,
        exist: sql<boolean>`${articles.id} is not null`.as('exist'),
      })
      .from(links)
      .leftJoin(articles, eq(links.title, articles.title))
      .groupBy(links.id)
      .as('exist_links')
  }

  findManyByArticleId(articleId: string) {
    const linkedLinks = this.#linkedLinks()
    const existLinks = this.#existLinks()

    return this.#db
      .select({
        id: links.id,
        title: links.title,
        linked: sql`(${linkedLinks.linking} or ${existLinks.exist})`.mapWith(
          Boolean,
        ),
      })
      .from(links)
      .innerJoin(articleLinks, eq(links.id, articleLinks.linkId))
      .innerJoin(linkedLinks, eq(links.id, linkedLinks.id))
      .innerJoin(existLinks, eq(links.id, existLinks.id))
      .where(eq(articleLinks.articleId, articleId))
      .groupBy(links.id)
      .all()
  }

  findManyByArticleIds(articleIds: string[]) {
    const linkedLinks = this.#linkedLinks()
    const existLinks = this.#existLinks()

    return this.#db
      .select({
        id: links.id,
        articleId: articleLinks.articleId,
        title: links.title,
        linked: sql`(${linkedLinks.linking} or ${existLinks.exist})`.mapWith(
          Boolean,
        ),
      })
      .from(links)
      .innerJoin(articleLinks, eq(links.id, articleLinks.linkId))
      .innerJoin(linkedLinks, eq(links.id, linkedLinks.id))
      .innerJoin(existLinks, eq(links.id, existLinks.id))
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
    return this.#db
      .insert(links)
      .values(articleLinks)
      .onConflictDoNothing()
      .run()
  }
}
