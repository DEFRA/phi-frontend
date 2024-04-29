import { importConfirmationController } from '~/src/server/plant-health/import-confirmation/controller'

const importConfirmation = {
  plugin: {
    name: 'plant',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/plant-health/import-confirmation',
          ...importConfirmationController
        }
      ])
    }
  }
}

export { importConfirmation }
