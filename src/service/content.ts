import { db } from '../db/connection'
import { ContentRepository } from '../db/repository/content'
import { History } from '../model/content'
import { Scope } from '../model/scope'

export class ContentService {
  readonly #repository: ContentRepository

  constructor(repository?: ContentRepository) {
    this.#repository = repository ?? new ContentRepository(db)
  }

  #accessableScopes(signedIn: boolean): Scope[] {
    return signedIn
      ? [Scope.Public, Scope.Protected, Scope.Private]
      : [Scope.Public, Scope.Protected]
  }

  async findManyHistoriesByArticleId(
    articleId: string,
    signedIn = false,
  ): Promise<History[]> {
    return this.#repository.findManyHistoriesByArticleId(
      articleId,
      this.#accessableScopes(signedIn),
    )
  }
}
