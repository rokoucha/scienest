import { and, eq, inArray, isNotNull, ne, or } from 'drizzle-orm'
import { Scope } from '../../model/scope'
import { Database } from '../connection'
import { articleLinks, articles, contents } from '../schema'

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

  findMany(scopes: Scope[], containsIndex: boolean) {
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
      .where(
        and(
          inArray(articles.scope, scopes),
          containsIndex ? undefined : ne(articles.title, 'index'),
        ),
      )
      .orderBy(articles.updatedAt)
      .all()
  }

  findManyByLink(linkTitle: string, scopes: Scope[], containsRoot: boolean) {
    const linkToId = this.#db
      .select({ linkId: articles.id })
      .from(articles)
      .where(eq(articles.title, linkTitle))
      .as('link_to_id')

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
      .leftJoin(articleLinks, and(eq(articles.id, articleLinks.from)))
      .leftJoin(linkToId, eq(articleLinks.to, linkToId.linkId))
      .where(
        and(
          inArray(articles.scope, scopes),
          or(
            isNotNull(linkToId.linkId),
            containsRoot ? eq(articles.title, linkTitle) : undefined,
          ),
        ),
      )
      .groupBy(articles.id)
      .orderBy(articles.updatedAt)
      .all()
  }

  findManyIdsByTitles(titles: string[]) {
    return this.#db
      .select({
        id: articles.id,
        title: articles.title,
      })
      .from(articles)
      .where(inArray(articles.title, titles))
      .all()
  }

  insertManyPseudo(titles: string[]) {
    return this.#db
      .insert(articles)
      .values(
        titles.map((title) => ({
          scope: Scope.Public,
          title,
        })),
      )
      .returning({ id: articles.id, title: articles.title })
      .all()
  }

  upsertOne(
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
      .onConflictDoUpdate({
        target: articles.id,
        set: {
          scope,
          title,
          description,
          latestContentId,
          updatedAt: new Date().toISOString(),
        },
        where: eq(articles.id, id),
      })
      .run()
  }

  deleteOne(id: string) {
    return this.#db.delete(contents).where(eq(contents.articleId, id)).run()
  }
}
