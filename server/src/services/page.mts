import type { Content, Post, PrismaClient } from '../../prisma/client/index.js'
import type { Page, PageBase } from 'scienest-common'
import { toScope } from '../utils.mjs'

export class PageService {
  #prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.#prisma = prisma
  }

  #postToPage(post: Post & { content: Content }): Page {
    return {
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      slug: post.slug,
      scope: toScope(post.scope),
      contentId: post.contentId,
      content: post.content.text,
    }
  }

  public async count({
    slug,
  }: { slug?: string | undefined } = {}): Promise<number> {
    const count = await this.#prisma.post.count({
      where: { slug },
    })

    return count
  }

  public async findMany(): Promise<Page[]> {
    const posts = await this.#prisma.post.findMany({
      include: { content: true },
    })

    return posts.map(this.#postToPage)
  }

  public async findBySlug(slug: string): Promise<Page | undefined> {
    const post = await this.#prisma.post.findUnique({
      where: { slug },
      include: { content: { include: { parent: true } } },
    })

    return post ? this.#postToPage(post) : undefined
  }

  public async findById(id: string): Promise<Page | undefined> {
    const post = await this.#prisma.post.findUnique({
      where: { id },
      include: { content: { include: { parent: true } } },
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
    const currentPost = await this.findBySlug(slug)
    if (!currentPost) throw new Error(`Post not found: "${slug}"`)

    if (!parent) {
      parent = currentPost.contentId
    }

    let post: Post | undefined
    try {
      post = await this.#prisma.post.update({
        data: {
          slug: input.slug,
          content: {
            create: {
              parentId: parent,
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
