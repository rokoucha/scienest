import { ComponentData } from '../components/Article'
import { db } from '../db/connection'
import { ArticleRepository } from '../db/repository/article'
import { Article } from '../model/article'
import { Scope } from '../model/scope'
import { parse, tokensToPlain } from '../parser/markdown'

export class ArticleService {
  readonly #repository: ArticleRepository

  constructor(repository?: ArticleRepository) {
    this.#repository = repository ?? new ArticleRepository(db)
  }

  #accessableScopes(signedIn: boolean): Scope[] {
    return signedIn
      ? [Scope.Public, Scope.Protected, Scope.Private]
      : [Scope.Public]
  }

  async findOneById(id: string, signedIn = false): Promise<Article | null> {
    return this.#repository.findOneById(id, this.#accessableScopes(signedIn))
  }

  async findOneByTitle(
    title: string,
    isSignedIn = false,
  ): Promise<Article | null> {
    return this.#repository.findOneByTitle(
      title,
      this.#accessableScopes(isSignedIn),
    )
  }

  async findMany(signedIn = false): Promise<Article[]> {
    return this.#repository.findMany(this.#accessableScopes(signedIn))
  }

  async createOrUpdateOne(
    id: string | undefined,
    data: Pick<Article, 'scope' | 'content'>,
  ): Promise<Article> {
    const parsed = parse(data.content)

    const title = parsed.title ? tokensToPlain([parsed.title]) : 'undefined'
    const description = parsed.description
      ? tokensToPlain([parsed.description])
      : ''

    if (id) {
      await this.#repository.updateOne({
        id,
        scope: data.scope,
        title,
        description,
        text: data.content,
      })
    } else {
      id = await this.#repository.insertOne({
        scope: data.scope,
        title,
        description,
        text: data.content,
      })
    }

    const article = await this.findOneById(id)

    if (!article) {
      throw new Error('Article not found')
    }

    return article
  }

  async deleteOne(id: string): Promise<void> {
    await this.#repository.deleteOne(id)
  }

  async getComponentData(isSignedIn = false): Promise<ComponentData> {
    const articles = await this.findMany(isSignedIn)
    return {
      articles,
    }
  }
}
