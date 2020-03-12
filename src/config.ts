import $ from 'transform-ts'
import { $numericString } from './utils/transformers'
import { ARTICLE_SCOPE } from './constants'

export const isProduction = process.env.NODE_ENV === 'production'

export const { APP_DEFAULT_SCOPE, APP_ENV, APP_PORT } = $.obj({
  APP_DEFAULT_SCOPE: $.literal(
    ARTICLE_SCOPE.PRIVATE,
    ARTICLE_SCOPE.PUBLIC,
    ARTICLE_SCOPE.UNLISTED,
  ),
  APP_ENV: $.literal('development', 'production'),
  APP_PORT: $numericString,
}).transformOrThrow(process.env)

export const APP_LOGGING = isProduction ? 'debug' : 'info'
