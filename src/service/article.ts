import { ComponentData } from '../components/Article'
import { ArticleRepository } from '../db/repository/article'
import { Article, ArticleList } from '../model/article'
import { Scope } from '../model/scope'
import { parse } from '../parser/markdown'

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

  async findOneByTitle({
    signedIn = false,
    title,
  }: {
    signedIn?: boolean | undefined
    title: string
  }): Promise<Article | null> {
    return this.#repository.findOneByTitle({
      scopes: this.#accessableScopes(signedIn),
      title,
    })
  }

  async findMany({
    link,
    signedIn = false,
  }: {
    link?: string | undefined
    signedIn?: boolean | undefined
  } = {}): Promise<ArticleList> {
    return this.#repository.findMany({
      link,
      scopes: this.#listableScopes(signedIn),
    })
  }

  async createOrUpdateOne(
    id: string | null,
    { scope, raw }: Pick<Article, 'scope' | 'raw'>,
  ): Promise<Article> {
    const parsed = parse(raw)

    if (
      parsed.title === '' ||
      reserverdTitles.some((r) => parsed.title.startsWith(r))
    ) {
      throw new Error(`Reserved title: ${parsed.title}`)
    }

    if (id) {
      await this.#repository.updateOne(id, {
        ...parsed,
        raw,
        scope,
      })
    } else {
      id = await this.#repository.insertOne({
        ...parsed,
        raw,
        scope,
      })
    }

    const article = await this.findOneByTitle({
      signedIn: true,
      title: parsed.title,
    })

    if (!article) {
      throw new Error('Article not found')
    }

    return article
  }

  async deleteOne(id: string): Promise<void> {
    await this.#repository.deleteOne(id)
  }

  async getComponentData(signedIn = false): Promise<ComponentData> {
    return {
      articles: await this.findMany({ signedIn }),
    }
  }
}
