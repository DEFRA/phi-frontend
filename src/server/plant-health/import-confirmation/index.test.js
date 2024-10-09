import { importConfirmation } from '~/src/server/plant-health/import-confirmation/index'
import { importConfirmationController } from '~/src/server/plant-health/import-confirmation/controller'
import Hapi from '@hapi/hapi' // Adjust the import based on your server setup

jest.mock('~/src/server/plant-health/import-confirmation/controller', () => ({
  importConfirmationController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('importConfirmation plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await importConfirmation.plugin.register(server)
  })

  test('should register the /plant-health/import-confirmation route', () => {
    const routes = server.table()
    const importConfirmationRoute = routes.find(
      (routes) =>
        routes.path === '/plant-health/import-confirmation' &&
        routes.method === 'get'
    )
    expect(importConfirmationRoute).toBeDefined()
    expect(importConfirmationRoute.settings.handler).toBe(
      importConfirmationController.handler
    )
  })
})
