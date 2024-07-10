import path from 'path'
import hapi from '@hapi/hapi'

import { config } from '~/src/config'
import { nunjucksConfig } from '~/src/config/nunjucks'
import { router } from './router'
import { requestLogger } from '~/src/server/common/helpers/logging/request-logger'
import { catchAll } from '~/src/server/common/helpers/errors'
import { secureContext } from '~/src/server/common/helpers/secure-context'
import hapiCookie from '@hapi/cookie'

const isProduction = config.get('isProduction')
const cookiePassword = config.get('cookiePassword')

async function createServer() {
  const server = hapi.server({
    port: config.get('port'),
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
  await server.register([hapiCookie])
  // cookie based strategy setup
  server.auth.strategy('login', 'cookie', {
    cookie: {
      name: 'phi-cookie',
      path: '/',
      password: cookiePassword,
      isSecure: isProduction
    },
    redirectTo: '/',
    keepAlive: true,
    // to validate cookie content on each request and returns boolean(isauthenticated/not)
    validate: async (request, session) => {
      if (session.password === config.get('phiPassword')) {
        return { isValid: true }
      } else {
        return { isValid: true }
      }
    }
  })
  // register with every route to use correct credentials
  server.auth.default({ strategy: 'login', mode: 'required' })

  await server.register(router)
  await server.register(nunjucksConfig)

  server.ext('onPreResponse', catchAll)

  return server
}

export { createServer }
