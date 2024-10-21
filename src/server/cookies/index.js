import { cookiesController } from '~/src/server/cookies/controller'

const CookiesPage = {
  plugin: {
    name: 'cookies',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/cookies',
          ...cookiesController
          //  options: { auth: { mode: 'try' } }
        }
      ])
    }
  }
}

export { CookiesPage }
