import { Article, ArticleList } from '../model/article'
import { Scope } from '../model/scope'
import { parse } from '../parser/markdown'
import { ArticleRepository } from '../repository/article'

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
    containsRoot,
    link,
    signedIn = false,
  }: {
    containsRoot?: boolean | undefined
    link?: string | undefined
    signedIn?: boolean | undefined
  } = {}): Promise<ArticleList> {
    return this.#repository.findMany({
      containsRoot,
      link,
      scopes: this.#listableScopes(signedIn),
    })
  }

  async createOrUpdateOne(
    id: string | null,
    { scope, raw }: Pick<Article, 'scope' | 'raw'>,
  ): Promise<Article> {
    const parsed = parse(raw ?? '')

    if (
      parsed.title === '' ||
      reserverdTitles.some((r) => parsed.title.startsWith(r))
    ) {
      throw new Error(`Reserved title: ${parsed.title}`)
    }

    const article = await this.#repository.upsertOne(id, {
      ...parsed,
      raw: raw ?? '',
      scope,
    })

    return article
  }

  async deleteOne(id: string): Promise<void> {
    await this.#repository.deleteOne(id)
  }
}
