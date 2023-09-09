import { and, eq, inArray } from 'drizzle-orm'
import { Scope } from '../../model/scope'
import { Database } from '../connection'
import { articleLinks, articles, contents, links } from '../schema'

export class ArticleDAO {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  findOneByTitle(title: string, scopes: Scope[]) {
    return this.#db
      .select({
        id: articles.id,
        scope: articles.scope,
        title: articles.title,
        description: articles.description,
        toc: contents.toc,
        heading: contents.heading,
        content: contents.content,
        raw: contents.raw,
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

  findMany(scopes: Scope[]) {
    return this.#db
      .select({
        id: articles.id,
        scope: articles.scope,
        title: articles.title,
        description: articles.description,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
      })
      .from(articles)
      .where(inArray(articles.scope, scopes))
      .all()
  }

  findManyByLink(linkTitle: string, scopes: Scope[]) {
    return this.#db
      .select({
        id: articles.id,
        scope: articles.scope,
        title: articles.title,
        description: articles.description,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
      })
      .from(articles)
      .leftJoin(articleLinks, and(eq(articles.id, articleLinks.articleId)))
      .innerJoin(links, eq(articleLinks.linkId, links.id))
      .where(and(eq(links.title, linkTitle), inArray(articles.scope, scopes)))
      .groupBy(articles.id)
      .all()
  }

  insertOne(
    id: string,
    scope: Scope,
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
      })
      .run()
  }

  updateOne(
    id: string,
    scope: Scope,
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
