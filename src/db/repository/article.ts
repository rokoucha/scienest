import { and, eq, inArray, sql } from 'drizzle-orm'
import { $array, $undefined, $union } from 'lizod'
import { Article } from '../../model/article'
import { Scope } from '../../model/scope'
import { nanoid } from '../../nanoid'
import { Database } from '../connection'
import { articles, contents } from '../schema'

export class ArticleRepository {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  public async findOneById(
    id: string,
    scopes: string[],
  ): Promise<Article | null> {
    const ctx = { errors: [] }
    const res = await this.#db
      .select({
        id: articles.id,
        scope: articles.scope,
        title: articles.title,
        description: articles.description,
        content: contents.text,
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
      .where(and(eq(articles.id, id), inArray(articles.scope, scopes)))
      .get()

    if (!$union([$undefined, Article])(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res ?? null
  }

  public async findOneByTitle(
    title: string,
    scopes: string[],
  ): Promise<Article | null> {
    const ctx = { errors: [] }
    const res = await this.#db
      .select({
        id: articles.id,
        scope: articles.scope,
        title: articles.title,
        description: articles.description,
        content: contents.text,
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

    if (!$union([$undefined, Article])(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res ?? null
  }

  public async findMany(scopes: string[]): Promise<Article[]> {
    const ctx = { errors: [] }
    const res = await this.#db
      .select({
        id: articles.id,
        scope: articles.scope,
        title: articles.title,
        description: articles.description,
        content: contents.text,
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
      .where(inArray(articles.scope, scopes))
      .all()

    if (!$array(Article)(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res
  }

  public async insertOne({
    scope,
    title,
    description,
    text,
  }: {
    scope: Scope
    title: string
    description: string | null
    text: string
  }): Promise<string> {
    const articleId = nanoid()
    const contentId = nanoid()

    const res = await this.#db.insert(articles).values({
      id: articleId,
      scope,
      title,
      description,
      latestContentId: contentId,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })

    await this.#db.insert(contents).values({
      id: contentId,
      articleId,
      scope,
      text,
    })

    return articleId
  }

  public async updateOne({
    id,
    scope,
    title,
    description,
    text,
  }: {
    id: string
    scope: Scope
    title: string
    description: string | null
    text: string
  }): Promise<string> {
    const contentId = nanoid()

    await this.#db
      .update(articles)
      .set({
        scope,
        title,
        description,
        latestContentId: contentId,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(articles.id, id))

    await this.#db.insert(contents).values({
      id: contentId,
      articleId: id,
      scope,
      text,
    })

    return id
  }

  public async deleteOne(id: string): Promise<void> {
    await this.#db.delete(contents).where(eq(contents.articleId, id))
    await this.#db.delete(articles).where(eq(articles.id, id))
  }
}
