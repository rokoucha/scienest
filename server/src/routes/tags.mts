import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { TagService } from '../services/tags.mjs'

export const tags =
  ({ tagService }: { tagService: TagService }): FastifyPluginAsync =>
  async (app) => {
    app.get('/', async (req) => {
      const { name } = z
        .object({ name: z.optional(z.string()) })
        .parse(req.query)

      return { tree: await tagService.findMany({ name }) }
    })
  }
