import { pestSearchController } from '~/src/server/plant-health/pest-search/controller'

const pestSearchPage = {
  plugin: {
    name: 'pest-search',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/pest-search',
          ...pestSearchController
        }
      ])
    }
  }
}

export { pestSearchPage }
