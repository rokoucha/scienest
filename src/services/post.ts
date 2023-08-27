import { ComponentData } from '../components/Article'
import { PostsDAO } from '../dao/posts'
import { Post } from '../models/post'
import { Scope } from '../models/scope'
import { parse, tokensToPlain } from '../parser/markdown'

export class PostService {
  readonly #postsDao: PostsDAO

  constructor(db: D1Database | undefined, postsDao?: PostsDAO | undefined) {
    this.#postsDao = postsDao ?? new PostsDAO(db!)
  }

  #accessableScopes(signedIn: boolean): Scope[] {
    return signedIn
      ? [Scope.Public, Scope.Protected, Scope.Private]
      : [Scope.Public]
  }

  async findOne(id: string, signedIn = false): Promise<Post | null> {
    return this.#postsDao.findOne(id, this.#accessableScopes(signedIn))
  }

  async findBySlug(slug: string, signedIn = false): Promise<Post | null> {
    return this.#postsDao.findBySlug(slug, this.#accessableScopes(signedIn))
  }

  async findMany(signedIn = false): Promise<Post[]> {
    return this.#postsDao.findMany(this.#accessableScopes(signedIn))
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

  async getComponentData(isSignedIn = false): Promise<ComponentData> {
    const posts = await this.findMany(isSignedIn)
    return {
      posts,
    }
  }
}
