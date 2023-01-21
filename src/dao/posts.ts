import { z } from 'zod'
import { Scope } from '../constants'
import { Post } from '../models/post'
import { nanoid } from '../nanoid'

const PostFromPostsAndContents = z.object({
  id: z.string(),
  slug: z.string(),
  scope: z.nativeEnum(Scope),
  text: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export class PostsDAO {
  constructor(private readonly db: D1Database) {}

  public async findOne(id: string): Promise<Post | null> {
    const stmt = this.db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
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

    return z
      .union([z.undefined().transform(() => null), PostFromPostsAndContents])
      .parse(await stmt.first())
  }

  public async findBySlug(slug: string): Promise<Post | null> {
    const stmt = this.db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
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

    return z
      .union([z.undefined().transform(() => null), PostFromPostsAndContents])
      .parse(await stmt.first())
  }

  public async findMany(scope?: Scope | undefined): Promise<Post[]> {
    const scopes: Scope[] =
      scope === 'Private'
        ? ['Public', 'Protected', 'Private']
        : scope === 'Protected'
        ? ['Public', 'Protected']
        : ['Public']

    const stmt = this.db
      .prepare(
        `
        SELECT
          posts.id AS id,
          posts.slug AS slug,
          posts.scope AS scope,
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

    return z.array(PostFromPostsAndContents).parse((await stmt.all()).results)
  }

  public async create(
    data: Pick<Post, 'slug' | 'scope' | 'text'>,
  ): Promise<Post> {
    const postId = nanoid()
    const contentId = nanoid()

    await this.db.batch([
      this.db
        .prepare(
          `
          INSERT
          INTO posts (
            id,
            slug,
            scope,
            latest_content_id,
            updated_at
          )
          VALUES (
            ?,
            ?,
            ?,
            ?,
            CURRENT_TIMESTAMP
          )
        `,
        )
        .bind(postId, data.slug, data.scope, contentId),
      this.db
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
        .bind(contentId, postId, data.scope, data.text),
    ])

    const post = await this.findOne(postId)
    if (!post) throw new Error('Failed to fetch inserted post')

    return post
  }

  public async update(
    id: string,
    input: Pick<Post, 'slug' | 'scope' | 'text'>,
  ): Promise<Post> {
    const contentId = nanoid()

    await this.db.batch([
      this.db
        .prepare(
          `
          UPDATE
            posts
          SET
            slug = ?,
            scope = ?,
            latest_content_id = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE
            id = ?
        `,
        )
        .bind(input.slug, input.scope, contentId, id),
      this.db
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
        .bind(contentId, id, input.scope, input.text),
    ])

    const post = await this.findOne(id)
    if (!post) throw new Error('Failed to fetch inserted post')

    return post
  }
}
