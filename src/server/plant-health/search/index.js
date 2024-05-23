import { searchPageController } from '~/src/server/plant-health/search/controller'

const searchPage = {
  plugin: {
    name: 'searchPage',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/search',
          ...searchPageController
        }
      ])
    }
  }
}

export { searchPage }
