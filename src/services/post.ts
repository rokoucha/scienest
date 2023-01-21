import { Scope } from '../constants'
import { PostsDAO } from '../dao/posts'
import { Post } from '../models/post'

export class PostService {
  readonly #posts: PostsDAO

  constructor(db: D1Database | undefined, posts?: PostsDAO | undefined) {
    this.#posts = posts ?? new PostsDAO(db!)
  }

  #accessableScopes(scope: Scope): Scope[] {
    return scope === Scope.Private
      ? [Scope.Public, Scope.Protected, Scope.Private]
      : scope === Scope.Protected
      ? [Scope.Public, Scope.Protected]
      : [Scope.Public]
  }

  async findOne(id: string): Promise<Post | null> {
    return this.#posts.findOne(id)
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return this.#posts.findOne(slug)
  }

  async findMany(scope?: Scope | undefined): Promise<Post[]> {
    return this.#posts.findMany(this.#accessableScopes(scope ?? Scope.Public))
  }

  async create(data: Pick<Post, 'slug' | 'scope' | 'text'>): Promise<Post> {
    const postId = await this.#posts.create(data.slug, data.scope, data.text)

    const post = await this.findOne(postId)
    if (!post) {
      throw new Error('Failed to fetch created post')
    }

    return post
  }

  async update(
    id: string,
    data: Pick<Post, 'slug' | 'scope' | 'text'>,
  ): Promise<Post> {
    await this.#posts.update(id, data.slug, data.scope, data.text)

    const post = await this.findOne(id)
    if (!post) {
      throw new Error('Failed to fetch created post')
    }

    return post
  }
}
