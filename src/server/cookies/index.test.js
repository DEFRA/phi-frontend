import { CookiesPage } from '~/src/server/cookies/index'
import { cookiesController } from '~/src/server/cookies/controller'
import Hapi from '@hapi/hapi' // Adjust the import based on your server setup

jest.mock('~/src/server/cookies/controller', () => ({
  cookiesController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('CookiesPage plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await CookiesPage.plugin.register(server)
  })

  test('should register the /cookies route', () => {
    const routes = server.table()
    const cookiesRoute = routes.find(
      (routes) =>
        routes.path === '/cookies' &&
        routes.method === 'get'
    )
    expect(cookiesRoute).toBeDefined()
    expect(cookiesRoute.settings.handler).toBe(
      cookiesController.handler
    )
  })
})
