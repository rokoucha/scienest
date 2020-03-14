import { APP_PORT, isProduction } from './config'
import { systemLogger as logger } from './utils/logger'
import app from './app'

app().then(app => {
  if (isProduction === false) {
    logger.warn(
      `Application is not works with production mode. NODE_ENV is '${process.env.NODE_ENV}'`,
    )
  }

  app.listen(APP_PORT, () => {
    logger.info(`Listenig on http://localhost:${APP_PORT}/`)
  })
})
