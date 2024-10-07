import { problemWithService } from '~/src/server/check-plant-health-information-and-import-rules/problem-with-service/index'
import { problemWithServiceController } from '~/src/server/check-plant-health-information-and-import-rules/problem-with-service/controller'
import { server } from '~/src/server'
import Hapi from '@hapi/hapi' // Adjust the import based on your server setup

jest.mock(
  '~/src/server/check-plant-health-information-and-import-rules/problem-with-service/controller',
  () => ({
    problemWithServiceController: {
      handler: jest.fn(),
      options: {}
    }
  })
)

describe('problemWithService plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await problemWithService.plugin.register(server)
  })

  test('should register the /check-plant-health-information-and-import-rules/problem-with-service route', () => {
    const routes = server.table()
    const problemWithServiceRoute = routes.find(
      (routes) =>
        routes.path ===
          '/check-plant-health-information-and-import-rules/problem-with-service' &&
        routes.method === 'get'
    )
    expect(problemWithServiceRoute).toBeDefined()
    expect(problemWithServiceRoute.settings.handler).toBe(
      problemWithServiceController.handler
    )
  })
})
