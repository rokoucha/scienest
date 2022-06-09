import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../prisma/client/index.js'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export const prismaPlugin = fp.default(async (app: FastifyInstance) => {
  const prisma = new PrismaClient()

  await prisma.$connect()

  app.decorate('prisma', prisma)

  app.addHook('onClose', async (app) => {
    await app.prisma.$disconnect()
  })
})
