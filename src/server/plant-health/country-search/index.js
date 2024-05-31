import { countrySearchController } from '~/src/server/plant-health/country-search/controller'

const countrySearchPage = {
  plugin: {
    name: 'country-search',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/country-search',
          ...countrySearchController
        }
      ])
    }
  }
}

export { countrySearchPage }
