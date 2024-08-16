import { eq, inArray, isNull, sql } from 'drizzle-orm'
import { arrayChunk } from '../../array'
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

  async findManyByArticleIds(articleIds: string[]) {
    const chunks = arrayChunk(articleIds, 80) // max 100 parameters

    const a = await Promise.all(
      chunks.map((ids) =>
        this.#db
          .select({
            title: sql<string>`coalesce(${articles.title}, ${articleLinks.title})`,
            linked: sql`${articleLinks.to} is not null`.mapWith(Boolean),
            articleId: articleLinks.from,
          })
          .from(articleLinks)
          .leftJoin(articles, eq(articleLinks.to, articles.id))
          .where(inArray(articleLinks.from, ids))
          .orderBy(articles.title)
          .all(),
      ),
    )

    return a.flat().toSorted((a, b) => a.title.localeCompare(b.title))
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
