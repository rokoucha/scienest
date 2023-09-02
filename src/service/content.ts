import { db } from '../db/connection'
import { ContentRepository } from '../db/repository/content'
import { Content } from '../model/content'
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

  async findManyByArticleId(
    articleId: string,
    signedIn = false,
  ): Promise<Content[]> {
    return this.#repository.findManyByArticleId(
      articleId,
      this.#accessableScopes(signedIn),
    )
  }
}
