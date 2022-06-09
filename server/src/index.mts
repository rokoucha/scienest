import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { prismaPlugin } from './plugins/prisma.mjs'
import { routes } from './routes.mjs'

const app = fastify({
  logger: true,
})

app.register(prismaPlugin)
app.register(cors.default)
app.register(routes)

const start = async () => {
  try {
    await app.listen({ port: 3300, host: '::' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
