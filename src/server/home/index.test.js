import { home } from '~/src/server/home'
import { homeController } from '~/src/server/home/controller'
import Hapi from '@hapi/hapi'

describe('home plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await home.plugin.register(server)
  })

  test('should register the /home route', () => {
    const routes = server.table()
    const homeRoute = routes.find(
      (route) => route.path === '/' && route.method === 'get'
    )

    expect(homeRoute).toBeDefined()
    expect(homeRoute.settings.handler).toBe(homeController.handler)
  })
})
