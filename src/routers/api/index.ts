import Router from '@koa/router'
import { APP_NAME, APP_VERSION } from '../../constants'

const router = new Router({ prefix: '/api' })

router.get('/', async ctx => {
  ctx.body = {
    application: {
      name: APP_NAME,
      version: APP_VERSION,
    },
  }
})

export default router
