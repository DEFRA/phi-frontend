import { purposeOfVisitController } from '~/src/server/plant-health/purpose-of-visit/controller'

const purposeOfVisit = {
  plugin: {
    name: 'purpose-of-visit',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/purpose-of-visit',
          ...purposeOfVisitController
        }
      ])
    }
  }
}

export { purposeOfVisit }
