import { eq, inArray, isNull, sql } from 'drizzle-orm'
import { Database } from '../connection'
import { articleLinks, articles } from '../schema'

export class ArticleLinkDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  findManyByArticleId(articleId: string) {
    return this.#db
      .select({
        title: sql<string>`coalesce(${articles.title}, ${articleLinks.title})`,
        linked: sql`${articleLinks.to} is not null`.mapWith(Boolean),
      })
      .from(articleLinks)
      .leftJoin(articles, eq(articleLinks.to, articles.id))
      .where(eq(articleLinks.from, articleId))
      .orderBy(articles.title)
      .all()
  }

  findManyByArticleIds(articleIds: string[]) {
    return this.#db
      .select({
        title: sql<string>`coalesce(${articles.title}, ${articleLinks.title})`,
        linked: sql`${articleLinks.to} is not null`.mapWith(Boolean),
        articleId: articleLinks.from,
      })
      .from(articleLinks)
      .leftJoin(articles, eq(articleLinks.to, articles.id))
      .where(inArray(articleLinks.from, articleIds))
      .orderBy(articles.title)
      .all()
  }

  findManyPseudoLinks() {
    return this.#db
      .select({
        title: articleLinks.title,
      })
      .from(articleLinks)
      .where(isNull(articleLinks.to))
      .groupBy(articleLinks.title)
      .having(sql<number>`count(${articleLinks.from}) > 1`)
      .orderBy(articleLinks.title)
      .all()
  }

  linkMany(title: string, to: string) {
    return this.#db
      .update(articleLinks)
      .set({
        createdAt: new Date().toISOString(),
        to,
      })
      .where(eq(articleLinks.title, title))
      .run()
  }

  insertMany(links: { from: string; to: string | null; title: string }[]) {
    return this.#db
      .insert(articleLinks)
      .values(links)
      .onConflictDoNothing()
      .run()
  }

  deleteManyByArticleId(articleId: string) {
    return this.#db
      .delete(articleLinks)
      .where(eq(articleLinks.from, articleId))
      .run()
  }
}
