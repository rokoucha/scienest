import type { FastifyPluginAsync } from 'fastify'
import { ContentService } from '../services/content.mjs'
import { PageService } from '../services/page.mjs'

import { contents } from './contents.mjs'
import { pages } from './pages.mjs'

export const routes: FastifyPluginAsync = async (app) => {
  const contentService = new ContentService(app.prisma)
  const pageService = new PageService(app.prisma)

  app.get('/', async () => {
    return { hello: 'world' }
  })

  app.register(contents({ contentService }), { prefix: '/contents' })
  app.register(pages({ pageService }), { prefix: '/pages' })
}
