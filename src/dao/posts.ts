import { $array, $null, $union } from 'lizod'
import { Post } from '../models/post'
import { Scope } from '../models/scope'
import { nanoid } from '../nanoid'

export class PostsDAO {
  readonly #db: D1Database

  constructor(db: D1Database) {
    this.#db = db
  }

  public async findOne(id: string, scopes: Scope[]): Promise<Post | null> {
    const stmt = this.#db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
          posts.title AS title,
          posts.description AS description,
          contents.text AS content,
          posts.created_at AS created_at,
          posts.updated_at AS updated_at
        FROM
          posts
        INNER JOIN
          contents
        ON
          posts.id = contents.post_id
          AND posts.latest_content_id = contents.id
        WHERE
          posts.id = ?
          AND posts.scope IN (
            ${Array(scopes.length).fill('?').join(', ')}
          )
        `,
      )
      .bind(id, ...scopes)

    const ctx = { errors: [] }
    const res = await stmt.first()

    if (!$union([$null, Post])(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res
  }

  public async findBySlug(slug: string, scopes: Scope[]): Promise<Post | null> {
    const stmt = this.#db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
          posts.title AS title,
          posts.description AS description,
          contents.text AS content,
          posts.created_at AS created_at,
          posts.updated_at AS updated_at
        FROM
          posts
        INNER JOIN
          contents
        ON
          posts.id = contents.post_id
          AND posts.latest_content_id = contents.id
        WHERE
          posts.slug = ?
          AND posts.scope IN (
            ${Array(scopes.length).fill('?').join(', ')}
          )
        `,
      )
      .bind(slug, ...scopes)

    const ctx = { errors: [] }
    const res = await stmt.first()

    if (!$union([$null, Post])(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res
  }

  public async findMany(scopes: Scope[]): Promise<Post[]> {
    const stmt = this.#db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
          posts.title AS title,
          posts.description AS description,
          contents.text AS content,
          posts.created_at AS created_at,
          posts.updated_at AS updated_at
        FROM
          posts
        INNER JOIN
          contents
        ON
          posts.id = contents.post_id
          AND posts.latest_content_id = contents.id
        WHERE
          posts.scope IN (
            ${Array(scopes.length).fill('?').join(',\n')}
          )
        `,
      )
      .bind(...scopes)

    const ctx = { errors: [] }
    const res = (await stmt.all()).results

    if (!$array(Post)(res, ctx)) {
      throw new Error(JSON.stringify(ctx.errors))
    }

    return res
  }

  public async create(
    slug: string,
    scope: Scope,
    title: string,
    description: string | null,
    content: string,
  ): Promise<string> {
    const postId = nanoid()
    const contentId = nanoid()

    const res = await this.#db.batch([
      this.#db
        .prepare(
          `
          INSERT
          INTO posts (
            id,
            slug,
            scope,
            title,
            description,
            latest_content_id,
            updated_at
          )
          VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            CURRENT_TIMESTAMP
          )
        `,
        )
        .bind(postId, slug, scope, title, description, contentId),
      this.#db
        .prepare(
          `
          INSERT
          INTO contents (
            id,
            post_id,
            scope,
            text
          )
          VALUES (
            ?,
            ?,
            ?,
            ?
          )
        `,
        )
        .bind(contentId, postId, scope, content),
    ])

    if (res.some((r) => !r.success)) {
      throw new Error('Failed to create new post')
    }

    return postId
  }

  public async update(
    id: string,
    slug: string,
    scope: Scope,
    title: string,
    description: string | null,
    content: string,
  ): Promise<void> {
    const contentId = nanoid()

    const res = await this.#db.batch([
      this.#db
        .prepare(
          `
          UPDATE
            posts
          SET
            slug = ?,
            scope = ?,
            title = ?,
            description = ?,
            latest_content_id = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE
            id = ?
        `,
        )
        .bind(slug, scope, title, description, contentId, id),
      this.#db
        .prepare(
          `
          INSERT
          INTO contents (
            id,
            post_id,
            scope,
            text
          )
          VALUES (
            ?,
            ?,
            ?,
            ?
          )
        `,
        )
        .bind(contentId, id, scope, content),
    ])

    if (res.some((r) => !r.success)) {
      throw new Error('Failed to create new post')
    }
  }

  public async delete(id: string): Promise<void> {
    const res = await this.#db.batch([
      this.#db
        .prepare(
          `
          DELETE
          FROM
            contents
          WHERE
            post_id = ?
          `,
        )
        .bind(id),
      this.#db
        .prepare(
          `
          DELETE
          FROM
            posts
          WHERE
            id = ?
          `,
        )
        .bind(id),
    ])

    if (res.some((r) => !r.success)) {
      throw new Error('Failed to delete post')
    }
  }
}
