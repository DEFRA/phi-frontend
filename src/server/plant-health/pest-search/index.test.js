import { pestSearchPage } from '~/src/server/plant-health/pest-search/index'
import { pestSearchController } from '~/src/server/plant-health/pest-search/controller'
import Hapi from '@hapi/hapi' // Adjust the import based on your server setup

jest.mock('~/src/server/plant-health/pest-search/controller', () => ({
  pestSearchController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('pestSearchPage plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await pestSearchPage.plugin.register(server)
  })

  test('should register the /plant-health/pest-search route', () => {
    const routes = server.table()
    const pestSearchPageRoute = routes.find(
      (routes) =>
        routes.path === '/plant-health/pest-search' && routes.method === 'get'
    )
    expect(pestSearchPageRoute).toBeDefined()
    expect(pestSearchPageRoute.settings.handler).toBe(
      pestSearchController.handler
    )
  })
})
