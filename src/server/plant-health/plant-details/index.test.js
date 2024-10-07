import { plantDetailsPage } from '~/src/server/plant-health/plant-details/index'
import { plantDetailsPageController } from '~/src/server/plant-health/plant-details/controller'
import { server } from '~/src/server' // Adjust the import based on your server setup
import Hapi from '@hapi/hapi'

jest.mock('~/src/server/plant-health/plant-details/controller', () => ({
  plantDetailsPageController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('plantDetailsPage plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await plantDetailsPage.plugin.register(server)
  })

  test('should register the /plant-health/plant-details route', () => {
    const routes = server.table()
    const plantDetailsPageRoute = routes.find(
      (routes) =>
        routes.path === '/plant-health/plant-details' && routes.method === 'get'
    )
    expect(plantDetailsPageRoute).toBeDefined()
    expect(plantDetailsPageRoute.settings.handler).toBe(
      plantDetailsPageController.handler
    )
  })
})
