import type { FastifyPluginAsync } from 'fastify'
import { ContentService } from '../services/content.mjs'
import { PageService } from '../services/page.mjs'
import { TagService } from '../services/tags.mjs'

import { contents } from './contents.mjs'
import { pages } from './pages.mjs'
import { tags } from './tags.mjs'

export const routes: FastifyPluginAsync = async (app) => {
  const contentService = new ContentService(app.prisma)
  const pageService = new PageService(app.prisma)
  const tagService = new TagService(app.prisma)

  app.get('/', async () => {
    return { hello: 'world' }
  })

  app.register(contents({ contentService }), { prefix: '/contents' })
  app.register(pages({ pageService }), { prefix: '/pages' })
  app.register(tags({ tagService }), { prefix: '/tags' })
}
