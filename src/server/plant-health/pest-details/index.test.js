import { pestDetailsPage } from '~/src/server/plant-health/pest-details/index'
import { pestDetailsPageController } from '~/src/server/plant-health/pest-details/controller'
import { server } from '~/src/server'
import Hapi from '@hapi/hapi' // Adjust the import based on your server setup

jest.mock('~/src/server/plant-health/pest-details/controller', () => ({
  pestDetailsPageController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('pestDetailsPage plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await pestDetailsPage.plugin.register(server)
  })

  test('should register the /plant-health/pest-details route', () => {
    const routes = server.table()
    const pestDetailsPageRoute = routes.find(
      (routes) =>
        routes.path === '/plant-health/pest-details' && routes.method === 'get'
    )
    expect(pestDetailsPageRoute).toBeDefined()
    expect(pestDetailsPageRoute.settings.handler).toBe(
      pestDetailsPageController.handler
    )
  })
})
