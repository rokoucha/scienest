import { z } from 'zod'
import { Scope } from '../constants'
import { Post } from '../models/post'
import { nanoid } from '../nanoid'

export class PostsDAO {
  readonly #db: D1Database

  constructor(db: D1Database) {
    this.#db = db
  }

  public async findOne(id: string): Promise<Post | null> {
    const stmt = this.#db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
          posts.title AS title,
          posts.description AS description,
          contents.text AS text,
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
        `,
      )
      .bind(id)

    return z.union([z.null(), Post]).parse(await stmt.first())
  }

  public async findBySlug(slug: string): Promise<Post | null> {
    const stmt = this.#db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
          posts.title AS title,
          posts.description AS description,
          contents.text AS text,
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
        `,
      )
      .bind(slug)

    return z.union([z.null(), Post]).parse(await stmt.first())
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
          contents.text AS text,
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

    return z.array(Post).parse((await stmt.all()).results)
  }

  public async create(
    slug: string,
    scope: Scope,
    title: string,
    description: string | null,
    text: string,
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
        .bind(contentId, postId, scope, text),
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
    text: string,
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
        .bind(contentId, id, scope, text),
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
