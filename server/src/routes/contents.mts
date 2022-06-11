import type { FastifyPluginAsync } from 'fastify'
import { Scope } from 'scienest-common'
import { z } from 'zod'
import { type ContentService } from '../services/content.mjs'

export const paramsToId = z.object({ id: z.string() })

export const contents =
  ({
    contentService,
  }: {
    contentService: ContentService
  }): FastifyPluginAsync =>
  async (app) => {
    app.get('/:id', async (req) => {
      const { id } = paramsToId.parse(req.params)
      const { scope } = z
        .object({ scope: z.optional(z.nativeEnum(Scope)) })
        .parse(req.query)

      return { tree: await contentService.findContentTree({ id, scope }) }
    })
  }
