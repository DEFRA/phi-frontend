import { formatPage } from '~/src/server/plant-health/format/index'

import { formatPageController } from '~/src/server/plant-health/format/controller'

import Hapi from '@hapi/hapi' // Adjust the import based on your server setup

jest.mock('~/src/server/plant-health/format/controller', () => ({
  formatPageController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('formatPage plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await formatPage.plugin.register(server)
  })

  test('should register the /plant-health/format route', () => {
    const routes = server.table()
    const formatRoute = routes.find(
      (routes) =>
        routes.path === '/plant-health/format' && routes.method === 'get'
    )
    expect(formatRoute).toBeDefined()
    expect(formatRoute.settings.handler).toBe(formatPageController.handler)
  })
})
