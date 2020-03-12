import { configure, getLogger } from 'log4js'
import { APP_LOGGING } from '../config'

configure({
  appenders: {
    console: {
      type: 'console',
    },
  },
  categories: {
    access: { appenders: ['console'], level: APP_LOGGING },
    default: { appenders: ['console'], level: APP_LOGGING },
    provider: { appenders: ['console'], level: APP_LOGGING },
    service: { appenders: ['console'], level: APP_LOGGING },
    system: { appenders: ['console'], level: APP_LOGGING },
  },
})

export const accessLogger = getLogger('access')
export const providerLogger = getLogger('provider')
export const serviceLogger = getLogger('service')
export const systemLogger = getLogger('system')
