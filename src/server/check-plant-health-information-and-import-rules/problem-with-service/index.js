import { problemWithServiceController } from '~/src/server/check-plant-health-information-and-import-rules/problem-with-service/controller'

const problemWithService = {
  plugin: {
    name: 'error',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/check-plant-health-information-and-import-rules/problem-with-service',
          ...problemWithServiceController
        }
      ])
    }
  }
}

export { problemWithService }
