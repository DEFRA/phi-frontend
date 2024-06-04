import { formatPageController } from '~/src/server/plant-health/format/controller'

const formatPage = {
  plugin: {
    name: 'format-page',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/format',
          ...formatPageController
        }
      ])
    }
  }
}

export { formatPage }
