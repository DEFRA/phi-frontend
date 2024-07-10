import { pestDetailsPageController } from '~/src/server/plant-health/pest-details/controller'

const pestDetailsPage = {
  plugin: {
    name: 'pest-details-page',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/pest-details',
          ...pestDetailsPageController
        }
      ])
    }
  }
}

export { pestDetailsPage }
