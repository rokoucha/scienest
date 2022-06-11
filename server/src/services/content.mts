import { type Content, type Scope, ScopeLevel, ZContent } from 'scienest-common'
import { z } from 'zod'
import { Prisma, type PrismaClient } from '../../prisma/client/index.js'

export class ContentService {
  #prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.#prisma = prisma
  }

  public async findContentTree({
    id,
    scope,
  }: {
    id: string
    scope?: Scope | undefined
  }): Promise<Content[]> {
    const rawContentTree = await this.#prisma.$queryRaw`
        WITH RECURSIVE ContentTree AS (
          SELECT
            Content.*
          FROM
            Content
          WHERE
            Content.id = ${id}
          UNION ALL
          SELECT
            Content.*
          FROM
            Content,
          ContentTree
          WHERE
            Content.Id = ContentTree.parentId
        )
        SELECT
          id,
          createdAt,
          text,
          parentId,
          scope
        ${
          scope
            ? Prisma.sql`
              WHERE
                scope in (${Prisma.join(ScopeLevel[scope])})
            `
            : Prisma.empty
        }
        FROM
          ContentTree
      `

    const contentTree = z.array(ZContent).parse(rawContentTree)

    return contentTree
  }
}
