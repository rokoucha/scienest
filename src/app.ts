import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'
import Koa from 'koa'
import logger from 'koa-logger'
import { accessLogger, systemLogger } from './utils/logger'
import apiRouter from './routers/api'

const app = async (): Promise<Koa> => {
  const app = new Koa()

  app.use(logger(message => accessLogger.info(message)))

  app.use(apiRouter.routes())
  app.use(apiRouter.allowedMethods())

  systemLogger.info('Connecting to database')
  const config = await getConnectionOptions()
  await createConnection({
    ...config,
    logging: ['query'],
  })

  return app
}

export default app
