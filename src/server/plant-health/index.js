import { plantHealthController } from '~/src/server/plant-health/controller'
import { pestSearchController } from '~/src/server/plant-health/pest-search/controller'
const plantHealth = {
  plugin: {
    name: 'plant-health',
    register: async (server) => {
      server.route([
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
    }
  }
}

export { plantHealth }
