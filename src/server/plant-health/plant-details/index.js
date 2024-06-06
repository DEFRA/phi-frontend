import { plantDetailsPageController } from '~/src/server/plant-health/plant-details/controller'

const plantDetailsPage = {
  plugin: {
    name: 'plant-details-page',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/plant-details',
          ...plantDetailsPageController
        }
      ])
    }
  }
}

export { plantDetailsPage }
