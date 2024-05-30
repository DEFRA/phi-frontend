import { searchController } from '~/src/api/search/controller'
const search = {
  plugin: {
    name: 'search',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/search/plants',
          handler: searchController.handler
        },
        {
          method: 'GET',
          path: '/search/countries',
          handler: searchController.handler
        }
      ])
    }
  }
}

export { search }
