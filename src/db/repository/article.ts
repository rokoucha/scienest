import { $array } from 'lizod'
import { Article } from '../../model/article'
import { Link } from '../../model/link'
import { Scope } from '../../model/scope'
import { nanoid } from '../../nanoid'
import { Database, db } from '../connection'
import { ArticleDAO } from '../dao/article'
import { ArticleLinkDAO } from '../dao/articleLink'
import { ContentDAO } from '../dao/content'
import { LinkDAO } from '../dao/link'

export class ArticleRepository {
  #db: Database

  #artcileDAO: ArticleDAO
  #articleLinkDAO: ArticleLinkDAO
  #contentDAO: ContentDAO
  #linkDAO: LinkDAO

  constructor(
    database?: Database,
    articleDAO?: ArticleDAO,
    articleLinkDAO?: ArticleLinkDAO,
    contentDAO?: ContentDAO,
    linkDAO?: LinkDAO,
  ) {
    this.#db = database ?? db
    this.#artcileDAO = articleDAO ?? new ArticleDAO(this.#db)
    this.#articleLinkDAO = articleLinkDAO ?? new ArticleLinkDAO(this.#db)
    this.#contentDAO = contentDAO ?? new ContentDAO(this.#db)
    this.#linkDAO = linkDAO ?? new LinkDAO(this.#db)
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
    const links = await this.#linkDAO.findManyByArticleId(a.id)

    console.log(JSON.stringify({ links }, null, 2))

    const article = {
      ...a,
      histories,
      links: links.filter((l) => l.id !== null),
    }

    const ctx = { errors: [] }
    if (!Article(article, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return article
  }

  public async findMany({
    link,
    scopes,
  }: {
    link?: string | undefined
    scopes: Scope[]
  }): Promise<Article[]> {
    const a = link
      ? await this.#artcileDAO.findManyByLinkTitle(link, scopes)
      : await this.#artcileDAO.findMany(scopes)
    if (a.length === 0) {
      return []
    }
    const links = await this.#linkDAO.findManyByArticleIds(a.map((x) => x.id))

    const linksMap = new Map<string, Link>(
      links.map(({ articleId, ...l }) => [articleId, l]),
    )

    const articles = a.map((a) => ({
      ...a,
      links: linksMap.get(a.id) ? [linksMap.get(a.id)!] : [],
    }))

    const ctx = { errors: [] }
    if (!$array(Article)(articles, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return articles
  }

  public async insertOne({
    description,
    links,
    scope,
    text,
    title,
  }: {
    description: string | null
    links: string[]
    scope: Scope
    text: string
    title: string
  }): Promise<string> {
    const articleId = nanoid()
    const contentId = nanoid()

    const existLinks =
      links.length > 0 ? await this.#linkDAO.findManyByTitles(links) : []
    const existLinksMap = new Map<string, string>(
      existLinks.map(({ id, title }) => [title, id]),
    )

    const linkIds = links.map((title) => ({
      id: existLinksMap.get(title) ?? nanoid(),
      title,
    }))

    console.log(JSON.stringify({ title, links, linkIds }, null, 2))

    await this.#artcileDAO.insertOne(
      articleId,
      scope,
      title,
      description,
      contentId,
    )
    await this.#contentDAO.insertOne(contentId, articleId, scope, text)
    if (linkIds.length > 0) {
      await this.#linkDAO.insertMany(linkIds)
      await this.#articleLinkDAO.insertMany(
        linkIds.map(({ id: linkId }) => ({ id: nanoid(), articleId, linkId })),
      )
    }

    return articleId
  }

  public async updateOne({
    description,
    id,
    links,
    scope,
    text,
    title,
  }: {
    description: string | null
    id: string
    links: string[]
    scope: Scope
    text: string
    title: string
  }): Promise<string> {
    const contentId = nanoid()

    const existLinks =
      links.length > 0 ? await this.#linkDAO.findManyByTitles(links) : []
    const existLinksMap = new Map<string, string>(
      existLinks.map(({ id, title }) => [title, id]),
    )

    const linkIds = links.map((title) => ({
      id: existLinksMap.get(title) ?? nanoid(),
      title,
    }))

    console.log(JSON.stringify({ title, links, linkIds }, null, 2))

    await this.#artcileDAO.updateOne(id, scope, title, description, contentId)
    await this.#contentDAO.insertOne(contentId, id, scope, text)
    await this.#articleLinkDAO.deleteManyByArticleId(id)
    if (linkIds.length > 0) {
      await this.#linkDAO.insertMany(linkIds)
      await this.#articleLinkDAO.insertMany(
        linkIds.map(({ id: linkId }) => ({
          articleId: id,
          id: nanoid(),
          linkId,
        })),
      )
    }

    return id
  }

  public async deleteOne({ id }: { id: string }): Promise<void> {
    await this.#contentDAO.deleteManyByArticleId(id)
    await this.#articleLinkDAO.deleteManyByArticleId(id)
    await this.#artcileDAO.deleteOne(id)
  }
}
