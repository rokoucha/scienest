import { Scope } from '../constants'
import { PostsDAO } from '../dao/posts'
import { Post } from '../models/post'

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

  async #parseMarkdown(
    text: string,
  ): Promise<{ slug: string; description: string | undefined }> {
    const plain = text.split('\n')

    return { slug: plain.at(0)!, description: plain.at(2) }
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

  async create(data: Pick<Post, 'scope' | 'content'>): Promise<Post> {
    const { slug, description } = await this.#parseMarkdown(data.content)

    const postId = await this.#postsDao.create(
      slug,
      data.scope,
      description ?? null,
      data.content,
    )

    const post = await this.findOne(postId)
    if (!post) {
      throw new Error('Failed to fetch created post')
    }

    return post
  }

  async update(
    id: string,
    data: Pick<Post, 'scope' | 'content'>,
  ): Promise<Post> {
    const { slug, description } = await this.#parseMarkdown(data.content)

    await this.#postsDao.update(
      id,
      slug,
      data.scope,
      description ?? null,
      data.content,
    )

    const post = await this.findOne(id)
    if (!post) {
      throw new Error('Failed to fetch created post')
    }

    return post
  }

  async delete(id: string): Promise<void> {
    await this.#postsDao.delete(id)
  }
}
