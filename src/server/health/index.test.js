import { health } from '~/src/server/health/index'
import { healthController } from '~/src/server/health/controller'
import { server } from '~/src/server'
import Hapi from '@hapi/hapi' // Adjust the import based on your server setup

jest.mock('~/src/server/health/controller', () => ({
  healthController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('health plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await health.plugin.register(server)
  })

  test('should register the /health route', () => {
    const routes = server.table()
    const healthRoute = routes.find(
      (routes) => routes.path === '/health' && routes.method === 'get'
    )
    expect(healthRoute).toBeDefined()
    expect(healthRoute.settings.handler).toBe(healthController.handler)
  })
})
