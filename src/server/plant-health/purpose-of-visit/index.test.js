import { purposeOfVisit } from '~/src/server/plant-health/purpose-of-visit/index'
import { purposeOfVisitController } from '~/src/server/plant-health/purpose-of-visit/controller'
import Hapi from '@hapi/hapi'

jest.mock('~/src/server/plant-health/purpose-of-visit/controller', () => ({
  purposeOfVisitController: {
    handler: jest.fn(),
    options: {}
  }
}))

describe('purposeOfVisit plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await purposeOfVisit.plugin.register(server)
  })

  test('should register the /plant-health/purpose-of-visit route', () => {
    const routes = server.table()
    const purposeOfVisitRoute = routes.find(
      (routes) =>
        routes.path === '/plant-health/purpose-of-visit' &&
        routes.method === 'get'
    )
    expect(purposeOfVisitRoute).toBeDefined()
    expect(purposeOfVisitRoute.settings.handler).toBe(
      purposeOfVisitController.handler
    )
  })
})
