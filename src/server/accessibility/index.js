import { accessibiltyController } from '~/src/server/accessibility/controller'

const accessibilityStatement = {
  plugin: {
    name: 'accessibility-statement',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/accessibility',
          ...accessibiltyController
        }
      ])
    }
  }
}

export { accessibilityStatement }
