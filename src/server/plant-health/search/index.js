import { searchController } from '~/src/server/plant-health/search/controller'

const searchPage = {
  plugin: {
    name: 'search',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/search',
          ...searchController
        }
      ])
    }
  }
}

export { searchPage }
