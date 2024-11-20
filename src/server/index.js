import path from 'path'
import hapi from '@hapi/hapi'

import { config } from '~/src/config'
import { nunjucksConfig } from '~/src/config/nunjucks'
import { router } from './router'
import { requestLogger } from '~/src/server/common/helpers/logging/request-logger'
import { secureContext } from '~/src/server/common/helpers/secure-context'
const isProduction = config.get('isProduction')

function catchAll(request, h) {
  const { response } = request

  if (!response.isBoom) {
    response.header(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    )
    response.header('X-Content-Type-Options', 'nosniff')
    response.header('X-Frame-Options', 'DENY')
    response.header('X-XSS-Protection', '1; mode=block')
    response.header('Referrer-Policy', 'no-referrer')
    response.header(
      'Content-Security-Policy',
      "default-src 'self' 'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw=' 'sha256-r5X1+PpkARiIVqqcQ0RDzcx7PYvuO6QoyiWpRaUuS2M=' 'sha256-W+lIm8NzGKSAA+hPYBnTTi9FPX4RS+5f+vn77dO32ko=' 'sha256-pvukEGssf3w6u5+mxgVHnbiZCYAGJG7vMcjE29hkcKs='  https://www.googletagmanager.com; connect-src 'self' https://region1.google-analytics.com  https://www.googletagmanager.com; script-src 'self' 'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw=' 'sha256-r5X1+PpkARiIVqqcQ0RDzcx7PYvuO6QoyiWpRaUuS2M=' 'sha256-W+lIm8NzGKSAA+hPYBnTTi9FPX4RS+5f+vn77dO32ko=' 'sha256-pvukEGssf3w6u5+mxgVHnbiZCYAGJG7vMcjE29hkcKs='  https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'"
    )
    // COOP (Cross-Origin Opener Policy)
    response.header('Cross-Origin-Opener-Policy', 'same-origin')

    // COEP (Cross-Origin Embedder Policy)
    response.header('Cross-Origin-Embedder-Policy', 'require-corp')

    // CORP (Cross-Origin Resource Policy)
    response.header('Cross-Origin-Resource-Policy', 'cross-origin')

    return h.continue
  }
  request.logger.error(response)
  request.logger.error(response?.stack)
  // return  response.output
  return h.redirect(
    '/check-plant-health-information-and-import-rules/problem-with-service?statusCode=' +
      response.output.statusCode
  )
}

async function createServer() {
  const server = hapi.server({
    port: config.get('port'),
    state: {
      // parse and store in request.state
      strictHeader: false // may also be 'ignore' or 'log'
    },
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      },

      files: {
        relativeTo: path.resolve(config.get('root'), '.public')
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  await server.register(requestLogger)

  if (isProduction) {
    await server.register(secureContext)
  }

  await server.register(router)
  await server.register(nunjucksConfig)

  server.ext('onPreResponse', catchAll)

  return server
}

export { createServer }
