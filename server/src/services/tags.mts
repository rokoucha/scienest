import { type Content, type Scope, ScopeLevel, ZContent } from 'scienest-common'
import { z } from 'zod'
import { Prisma, type PrismaClient } from '../../prisma/client/index.js'

export class TagService {
  #prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.#prisma = prisma
  }

  public async findMany({ name }: { name?: string | null }): Promise<string[]> {
    const tags = await this.#prisma.$queryRaw<{ name: string }[]>`
      SELECT
        name
      FROM
        Tag
      ${
        name
          ? Prisma.sql`
            WHERE
              name LIKE ${`%${name}%`}
          `
          : Prisma.empty
      }
    `

    return tags.map((t) => t.name)
  }
}
