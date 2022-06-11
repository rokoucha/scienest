import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { prismaPlugin } from './plugins/prisma.mjs'
import { routes } from './routes/index.mjs'
import { API_PREFIX } from './constants.js'

const app = fastify({
  logger: true,
})

app.register(prismaPlugin)
app.register(cors.default)
app.register(routes, { prefix: API_PREFIX })

const start = async () => {
  try {
    await app.listen({ port: 3300, host: '::' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
