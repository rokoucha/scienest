import type { FastifyPluginAsync } from 'fastify'
import { toPageBase } from 'scienest-common'
import { type PageService } from '../services/page.mjs'
import { z } from 'zod'
import { getPath } from '../utils.mjs'

export const paramsToSlug = z.object({ slug: z.string() })

export const pages =
  ({ pageService }: { pageService: PageService }): FastifyPluginAsync =>
  async (app) => {
    app.get('/', async (req) => {
      const params = z
        .object({
          slug: z.optional(z.string()),
          tag: z.optional(z.string()),
        })
        .parse(req.query)

      return { pages: await pageService.findMany(params) }
    })

    app.post('/', async (req, res) => {
      const input = toPageBase(req.body)

      const page = await pageService.create({ input })

      if (!page) {
        res.statusCode = 400
        return {}
      }

      res.statusCode = 201
      res.header('Location', getPath(`/pages/${page}`))
      return {}
    })

    app.get('/:slug', async (req, res) => {
      const { slug } = paramsToSlug.parse(req.params)

      const page = await pageService.findBySlug({ slug })
      if (!page) {
        res.statusCode = 404
        return {}
      }

      return { page }
    })

    app.put('/:slug', async (req, res) => {
      const { slug } = paramsToSlug.parse(req.params)

      const input = toPageBase(req.body)

      const page = await pageService.update({ slug, input })

      if (!page) {
        res.statusCode = 400
        return {}
      }

      if (slug === page) {
        res.statusCode = 204
      } else {
        res.statusCode = 201
        res.header('Location', getPath(`/pages/${page}`))
      }
      return {}
    })

    app.delete('/:slug', async (req, res) => {
      const { slug } = req.params as { slug: string }

      const result = await pageService.delete(slug)

      res.statusCode = result ? 204 : 404
      return {}
    })
  }
