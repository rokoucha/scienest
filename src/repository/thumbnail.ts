import { Database, db } from '../db/connection'
import { ArticleDAO } from '../db/dao/article'
import { ThumbnailDAO } from '../db/dao/thumbnail'
import { Scope } from '../model/scope'

export class ThumnbnailRepository {
  #db: Database

  #artcileDAO: ArticleDAO
  #thumbnailDAO: ThumbnailDAO

  constructor(
    database?: Database,
    articleDAO?: ArticleDAO,
    thumbnailDAO?: ThumbnailDAO,
  ) {
    this.#db = database ?? db
    this.#artcileDAO = articleDAO ?? new ArticleDAO(this.#db)
    this.#thumbnailDAO = thumbnailDAO ?? new ThumbnailDAO(this.#db)
  }

  public async findOneByTitle({
    title,
    scopes,
  }: {
    title: string
    scopes: Scope[]
  }): Promise<string | null> {
    const a = await this.#artcileDAO.findOneByTitle(title, scopes)
    if (a === undefined) {
      return null
    }
    const thumbnail = await this.#thumbnailDAO.findOneByArticleId(a.id)

    return thumbnail?.url ?? null
  }
}
