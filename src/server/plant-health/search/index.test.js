import { searchPage } from '~/src/server/plant-health/search/index'
import { searchPageController } from '~/src/server/plant-health/search/controller'
import { server } from '~/src/server' // Adjust the import based on your server setup
import Hapi from '@hapi/hapi'
jest.mock('~/src/server/plant-health/search/controller', () => ({
  searchPageController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('searchPage plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await searchPage.plugin.register(server)
  })

  test('should register the /plant-health/search route', () => {
    const routes = server.table()
    const searchRoute = routes.find(
      (routes) =>
        routes.path === '/plant-health/search' && routes.method === 'get'
    )
    expect(searchRoute).toBeDefined()
    expect(searchRoute.settings.handler).toBe(searchPageController.handler)
  })
})
