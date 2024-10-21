import { plantHealth } from '~/src/server/plant-health'
import { plantHealthController } from '~/src/server/plant-health/controller'
import { pestSearchController } from '~/src/server/plant-health/pest-search/controller'

describe('plantHealth plugin', () => {
  let server

  beforeEach(() => {
    server = {
      route: jest.fn()
    }
  })

  it('should register routes correctly', async () => {
    await plantHealth.plugin.register(server)

    expect(server.route).toHaveBeenCalledWith([
      {
        method: 'GET',
        path: '/',
        ...plantHealthController
      },
      {
        method: 'GET',
        path: '/pest-details',
        ...pestSearchController
      }
    ])
  })
})
