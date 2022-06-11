import {
  Prisma,
  type Content,
  type Post,
  type PrismaClient,
  type Tag,
} from '../../prisma/client/index.js'
import { Page, PageBase, Scope, ScopeLevel } from 'scienest-common'
import { toScope } from '../utils.mjs'
import { z } from 'zod'

export class PageService {
  #prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.#prisma = prisma
  }

  #postToPage(post: Post & { content: Content; tags: Tag[] }): Page {
    return {
      content: post.content.text,
      contentId: post.contentId,
      createdAt: post.createdAt,
      id: post.id,
      scope: toScope(post.scope),
      slug: post.slug,
      tags: post.tags.map((t) => t.name),
      updatedAt: post.updatedAt,
    }
  }

  public async count({
    scope,
    slug,
  }: {
    scope?: Scope | undefined
    slug?: string | undefined
  } = {}): Promise<number> {
    const count = await this.#prisma.post.count({
      where: {
        scope: scope ? { in: ScopeLevel[scope] } : undefined,
        slug,
      },
    })

    return count
  }

  public async findMany(
    params?:
      | {
          scope?: Scope | undefined
          slug?: string | undefined
          tag?: string | undefined
        }
      | undefined,
  ): Promise<Page[]> {
    const where = [
      params?.scope !== undefined
        ? Prisma.sql`Post.scope in (${Prisma.join(ScopeLevel[params.scope])})`
        : undefined,
      params?.slug !== undefined
        ? Prisma.sql`Post.slug LIKE ${`%${params.slug}%`}`
        : undefined,
      params?.tag !== undefined
        ? Prisma.sql`Tag.name = ${params.tag}`
        : undefined,
    ].filter((w): w is Prisma.Sql => w !== undefined)

    const posts = await this.#prisma.$queryRaw`
      SELECT
        Content.text AS content,
        Content.id AS contentId,
        Post.createdAt AS createdAt,
        Post.id AS id,
        Post.scope AS scope,
        Post.slug AS slug,
        TagList.Tags AS tags,
        Post.updatedAt AS updatedAt
      FROM
        Post
      INNER JOIN Content
        ON Post.contentId = Content.id
      LEFT OUTER JOIN _PostToTag
        ON Post.id = _PostToTag.A
      LEFT OUTER JOIN Tag
        ON _PostToTag.B = Tag.name
      INNER JOIN (
        SELECT
          Post.id AS id,
        GROUP_CONCAT(Tag.name, "	") AS tags
        FROM
          Post
        LEFT OUTER JOIN _PostToTag
          ON Post.id = _PostToTag.A
        LEFT OUTER JOIN Tag
          ON _PostToTag.B = Tag.name
        GROUP BY
          Post.id
      ) AS TagList
        ON TagList.id = Post.id
      ${
        where.length > 0
          ? Prisma.sql`
            WHERE
              ${where.reduce((p, c) => Prisma.sql`${p} AND ${c}`)}
          `
          : Prisma.empty
      }
      GROUP BY
        Post.id
    `

    const pages = z
      .array(
        z.object({
          content: z.string(),
          contentId: z.string(),
          createdAt: z.string().transform((v) => new Date(v)),
          id: z.string(),
          scope: z.nativeEnum(Scope),
          slug: z.string(),
          tags: z.string().transform((v) => v.split('\t')),
          updatedAt: z.string().transform((v) => new Date(v)),
        }),
      )
      .parse(posts)

    return pages
  }

  public async findBySlug({
    scope,
    slug,
  }: {
    scope?: Scope | undefined
    slug: string
  }): Promise<Page | undefined> {
    const post = await this.#prisma.post.findFirst({
      include: { content: { include: { parent: true } }, tags: true },
      where: { scope: scope ? { in: ScopeLevel[scope] } : undefined, slug },
    })

    return post ? this.#postToPage(post) : undefined
  }

  public async create({
    input,
  }: {
    input: PageBase
  }): Promise<string | undefined> {
    const count = await this.count({ slug: input.slug })
    if (count > 0) throw new Error(`Post already found: "${input.slug}"`)

    let post: Post | undefined
    try {
      post = await this.#prisma.post.create({
        data: {
          slug: input.slug,
          content: {
            create: {
              text: input.content,
              scope: input.scope,
            },
          },
          scope: input.scope,
        },
      })
    } catch (e) {
      console.error(e)
    }

    return post?.slug
  }

  public async update({
    input,
    parent,
    slug,
  }: {
    input: PageBase
    parent?: string | undefined
    slug: string
  }): Promise<string | undefined> {
    const currentPost = await this.findBySlug({ slug })
    if (!currentPost) throw new Error(`Post not found: "${slug}"`)

    let post: Post | undefined
    try {
      post = await this.#prisma.post.update({
        data: {
          slug: input.slug,
          content: {
            create: {
              parentId: parent ?? currentPost.contentId,
              scope: input.scope,
              text: input.content,
            },
          },
          scope: input.scope,
        },
        where: {
          slug,
        },
      })
    } catch (e) {
      console.error(e)
    }

    return post?.slug
  }

  public async delete(slug: string) {
    try {
      await this.#prisma.post.delete({ where: { slug } })
    } catch (e) {
      console.error(e)

      return false
    }

    return true
  }
}
