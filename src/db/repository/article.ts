import { $array } from 'lizod'
import { Article } from '../../model/article'
import { Scope } from '../../model/scope'
import { nanoid } from '../../nanoid'
import { ArticleDAO } from '../dao/article'
import { ContentDAO } from '../dao/content'

export class ArticleRepository {
  #artcileDAO: ArticleDAO
  #contentDAO: ContentDAO

  constructor(articleDAO?: ArticleDAO, contentDAO?: ContentDAO) {
    this.#artcileDAO = articleDAO ?? new ArticleDAO()
    this.#contentDAO = contentDAO ?? new ContentDAO()
  }

  public async findOneById({
    id,
    scopes,
  }: {
    id: string
    scopes: Scope[]
  }): Promise<Article | null> {
    const a = await this.#artcileDAO.findOneById(id, scopes)
    if (a === undefined) {
      return null
    }
    const histories = await this.#contentDAO.findManyHistoriesByArticleId(
      a.id,
      scopes,
    )

    const article = {
      ...a,
      histories,
    }

    const ctx = { errors: [] }
    if (!Article(article, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return article
  }

  public async findOneByTitle({
    title,
    scopes,
  }: {
    title: string
    scopes: Scope[]
  }): Promise<Article | null> {
    const a = await this.#artcileDAO.findOneByTitle(title, scopes)
    if (a === undefined) {
      return null
    }
    const histories = await this.#contentDAO.findManyHistoriesByArticleId(
      a.id,
      scopes,
    )

    const article = {
      ...a,
      histories,
    }

    const ctx = { errors: [] }
    if (!Article(article, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return article
  }

  public async findMany({ scopes }: { scopes: Scope[] }): Promise<Article[]> {
    const res = await this.#artcileDAO.findMany(scopes)

    const ctx = { errors: [] }
    if (!$array(Article)(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res
  }

  public async insertOne({
    description,
    scope,
    text,
    title,
  }: {
    description: string | null
    scope: Scope
    text: string
    title: string
  }): Promise<string> {
    const articleId = nanoid()
    const contentId = nanoid()

    await this.#artcileDAO.insertOne(
      articleId,
      scope,
      title,
      description,
      contentId,
    )
    await this.#contentDAO.insertOne(contentId, articleId, scope, text)

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

    await this.#artcileDAO.updateOne(id, scope, title, description, contentId)
    await this.#contentDAO.insertOne(contentId, id, scope, text)

    return id
  }

  public async deleteOne({ id }: { id: string }): Promise<void> {
    await this.#artcileDAO.deleteOne(id)
    await this.#contentDAO.deleteManyByArticleId(id)
  }
}
