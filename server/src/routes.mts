import type { FastifyPluginAsync } from 'fastify'
import { toPageBase } from 'scienest-common'
import { PageService } from './services/page.mjs'
import { z } from 'zod'

const paramsToSlug = z.object({ slug: z.string() })

export const routes: FastifyPluginAsync = async (app) => {
  const pageService = new PageService(app.prisma)

  app.get('/', async () => {
    return { hello: 'world' }
  })

  app.get('/pages', async () => {
    return { pages: await pageService.findMany() }
  })

  app.post('/pages', async (req, res) => {
    const input = toPageBase(req.body)

    const page = await pageService.create({ input })

    if (!page) {
      res.statusCode = 400
      return {}
    }

    res.statusCode = 201
    res.header('Location', `/pages/${page}`)
    return {}
  })

  app.get('/pages/:slug', async (req, res) => {
    const { slug } = paramsToSlug.parse(req.params)

    const page = await pageService.findBySlug(slug)
    if (!page) {
      res.statusCode = 404
      return {}
    }

    return { page }
  })

  app.put('/pages/:slug', async (req, res) => {
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
      res.header('Location', `/pages/${page}`)
    }
    return {}
  })

  app.delete('/pages/:slug', async (req, res) => {
    const { slug } = req.params as { slug: string }

    const result = await pageService.delete(slug)

    res.statusCode = result ? 204 : 404
    return {}
  })
}
