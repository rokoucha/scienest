import { accessableScopes } from '../permission'
import { ThumnbnailRepository } from '../repository/thumbnail'

export class ThumbnailService {
  readonly #repository: ThumnbnailRepository

  constructor(repository?: ThumnbnailRepository) {
    this.#repository = repository ?? new ThumnbnailRepository()
  }

  public async findOneByTitle({
    title,
    isSignedIn = false,
  }: {
    title: string
    isSignedIn?: boolean | undefined
  }): Promise<string | null> {
    return this.#repository.findOneByTitle({
      scopes: accessableScopes(isSignedIn),
      title,
    })
  }
}
