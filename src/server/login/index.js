import { loginController, authController } from '~/src/server/login/controller'

const login = {
  plugin: {
    name: 'login',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/',
          ...loginController,
          options: { auth: { mode: 'try' } } // access login page without cookie set , hapi will try to authenticate the user, if fails, the reoute can still be accessed
        },
        {
          method: 'POST',
          path: '/',
          ...authController,
          options: { auth: { mode: 'try' } }
        },
        {
          method: 'GET',
          path: '/logout',
          handler: (request, h) => {
            request.cookieAuth.clear()
            return h.redirect('/')
          }
        }
      ])
    }
  }
}

export { login }
