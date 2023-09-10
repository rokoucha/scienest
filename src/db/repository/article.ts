import { $array } from 'lizod'
import { Article, ArticleList, ArticleListItem } from '../../model/article'
import { Scope } from '../../model/scope'
import { Toc } from '../../model/toc'
import { nanoid } from '../../nanoid'
import { Database, db } from '../connection'
import { ArticleDAO } from '../dao/article'
import { ArticleLinkDAO } from '../dao/articleLink'
import { ContentDAO } from '../dao/content'

export class ArticleRepository {
  #db: Database

  #artcileDAO: ArticleDAO
  #articleLinkDAO: ArticleLinkDAO
  #contentDAO: ContentDAO

  constructor(
    database?: Database,
    articleDAO?: ArticleDAO,
    articleLinkDAO?: ArticleLinkDAO,
    contentDAO?: ContentDAO,
  ) {
    this.#db = database ?? db
    this.#artcileDAO = articleDAO ?? new ArticleDAO(this.#db)
    this.#articleLinkDAO = articleLinkDAO ?? new ArticleLinkDAO(this.#db)
    this.#contentDAO = contentDAO ?? new ContentDAO(this.#db)
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
    const links = await this.#articleLinkDAO.findManyByArticleId(a.id)

    const article = {
      id: a.id,
      scope: a.scope,
      title: a.title,
      description: a.description,
      toc: a.toc,
      heading: a.heading,
      content: a.content,
      raw: a.raw,
      histories,
      links,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }

    const ctx = { errors: [] }
    if (!Article(article, ctx)) {
      throw new Error(`Invalid article: ${JSON.stringify(ctx.errors, null, 2)}`)
    }

    return article
  }

  public async findMany({
    link,
    scopes,
  }: {
    link?: string | undefined
    scopes: Scope[]
  }): Promise<ArticleList> {
    const a = link
      ? await this.#artcileDAO.findManyByLink(link, scopes)
      : await this.#artcileDAO.findMany(scopes)
    if (a.length === 0) {
      return []
    }
    const links = await this.#articleLinkDAO.findManyByArticleIds(
      a.map((x) => x.id),
    )

    const articles = a.map((a) => ({
      id: a.id,
      scope: a.scope,
      title: a.title,
      description: a.description,
      links: links
        .filter((l) => l.articleId === a.id)
        .map(({ articleId, ...l }) => l),
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }))

    const ctx = { errors: [] }
    if (!$array(ArticleListItem)(articles, ctx)) {
      throw new Error(
        `Invalid article list: ${JSON.stringify(ctx.errors, null, 2)}`,
      )
    }

    return articles
  }

  public async upsertOne(
    id: string | null,
    {
      content,
      description,
      heading,
      links,
      raw,
      scope,
      title,
      toc,
    }: {
      content: string
      description: string | null
      heading: string
      links: string[]
      raw: string
      scope: Scope
      title: string
      toc: Toc
    },
  ): Promise<Article> {
    const articleId = id ?? nanoid()
    const contentId = nanoid()

    await this.#artcileDAO.upsertOne(
      articleId,
      scope,
      title,
      description,
      contentId,
    )
    await this.#contentDAO.insertOne(
      contentId,
      articleId,
      scope,
      toc,
      heading,
      content,
      raw,
    )

    await this.#articleLinkDAO.deleteManyByArticleId(articleId)

    if (links.length > 0) {
      const existLinks =
        links.length > 0
          ? await this.#artcileDAO.findManyIdsByTitles(links)
          : []
      const existLinksMap = new Map<string, string>(
        existLinks.map(({ id, title }) => [title, id]),
      )

      await this.#articleLinkDAO.insertMany(
        links.map((title) => ({
          title,
          from: articleId,
          to: existLinksMap.get(title) ?? null,
        })),
      )
    }

    const pseudoArticleTitles = await this.#articleLinkDAO.findManyPseudoLinks()
    if (pseudoArticleTitles.length > 0) {
      const pseudoArticleIds = await this.#artcileDAO.insertManyPseudo(
        pseudoArticleTitles.map(({ title }) => title),
      )
      await Promise.all(
        pseudoArticleIds.map(({ id: to, title }) =>
          this.#articleLinkDAO.linkMany(title, to),
        ),
      )
    }

    const article = await this.findOneByTitle({ title, scopes: [scope] })
    if (article === null) {
      throw new Error(`Article not found: ${title}`)
    }

    return article
  }

  public async deleteOne(id: string): Promise<void> {
    await this.#artcileDAO.deleteOne(id)
  }
}
