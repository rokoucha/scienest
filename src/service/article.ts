import { ComponentData } from '../components/Article'
import { ArticleRepository } from '../db/repository/article'
import { Article } from '../model/article'
import { Scope } from '../model/scope'
import { parse, tokenToPlain } from '../parser/markdown'

const reserverdTitles = ['new', 'edit', 'auth']

export class ArticleService {
  readonly #repository: ArticleRepository

  constructor(repository?: ArticleRepository) {
    this.#repository = repository ?? new ArticleRepository()
  }

  #accessableScopes(signedIn: boolean): Scope[] {
    return signedIn
      ? [Scope.Public, Scope.Protected, Scope.Private]
      : [Scope.Public, Scope.Protected]
  }

  #listableScopes(signedIn: boolean): Scope[] {
    return signedIn
      ? [Scope.Public, Scope.Protected, Scope.Private]
      : [Scope.Public]
  }

  async findOneByTitle(
    title: string,
    isSignedIn = false,
  ): Promise<Article | null> {
    return this.#repository.findOneByTitle({
      scopes: this.#accessableScopes(isSignedIn),
      title,
    })
  }

  async findMany(signedIn = false): Promise<Article[]> {
    return this.#repository.findMany({ scopes: this.#listableScopes(signedIn) })
  }

  async createOrUpdateOne(
    id: string | null,
    data: Pick<Article, 'scope' | 'content'>,
  ): Promise<Article> {
    const parsed = parse(data.content)

    const title = parsed.title ? tokenToPlain(parsed.title) : 'undefined'
    const description = parsed.description
      ? tokenToPlain(parsed.description)
      : ''

    if (reserverdTitles.some((r) => title.startsWith(r))) {
      throw new Error('Reserved title')
    }

    if (id) {
      await this.#repository.updateOne({
        description,
        id,
        links: parsed.links,
        scope: data.scope,
        text: data.content,
        title,
      })
    } else {
      id = await this.#repository.insertOne({
        description,
        links: parsed.links,
        scope: data.scope,
        text: data.content,
        title,
      })
    }

    const article = await this.findOneByTitle(title, true)

    if (!article) {
      throw new Error('Article not found')
    }

    return article
  }

  async deleteOne(id: string): Promise<void> {
    await this.#repository.deleteOne({ id })
  }

  async getComponentData(isSignedIn = false): Promise<ComponentData> {
    const articles = await this.findMany(isSignedIn)
    return {
      articles,
    }
  }
}
