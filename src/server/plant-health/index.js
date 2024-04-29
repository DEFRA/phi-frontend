import { plantHealthController } from '~/src/server/plant-health/controller'

const plantHealth = {
  plugin: {
    name: 'plant-health',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health',
          ...plantHealthController
        }
      ])
    }
  }
}

export { plantHealth }
