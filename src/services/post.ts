import { ComponentData } from '../components/Renderer'
import { PostsDAO } from '../dao/posts'
import { parse, tokensToPlain } from '../markdown'
import { Post } from '../models/post'
import { Scope } from '../models/scope'

export class PostService {
  readonly #postsDao: PostsDAO

  constructor(db: D1Database | undefined, postsDao?: PostsDAO | undefined) {
    this.#postsDao = postsDao ?? new PostsDAO(db!)
  }

  #accessableScopes(scope: Scope): Scope[] {
    return scope === Scope.Private
      ? [Scope.Public, Scope.Protected, Scope.Private]
      : scope === Scope.Protected
      ? [Scope.Public, Scope.Protected]
      : [Scope.Public]
  }

  async findOne(id: string): Promise<Post | null> {
    return this.#postsDao.findOne(id)
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return this.#postsDao.findBySlug(slug)
  }

  async findMany(scope?: Scope | undefined): Promise<Post[]> {
    return this.#postsDao.findMany(
      this.#accessableScopes(scope ?? Scope.Public),
    )
  }

  async createOrUpdate(
    id: string | undefined,
    data: Pick<Post, 'slug' | 'scope' | 'content'>,
  ): Promise<Post> {
    const parsed = parse(data.content)

    const title = parsed.title ? tokensToPlain([parsed.title]) : data.slug
    const description = parsed.description
      ? tokensToPlain([parsed.description])
      : ''

    if (id) {
      await this.#postsDao.update(
        id,
        data.slug,
        data.scope,
        title,
        description,
        data.content,
      )
    } else {
      id = await this.#postsDao.create(
        data.slug,
        data.scope,
        title,
        description,
        data.content,
      )
    }

    const post = await this.findOne(id)
    if (!post) {
      throw new Error('Failed to fetch created post')
    }

    return post
  }

  async delete(id: string): Promise<void> {
    await this.#postsDao.delete(id)
  }

  async getComponentData(): Promise<ComponentData> {
    const posts = await this.findMany()
    return {
      posts,
    }
  }
}
