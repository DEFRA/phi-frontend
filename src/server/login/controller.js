import { config } from '~/src/config'
const password = config.get('phiPassword')
const loginController = {
  handler: (request, h) => {
    if (request.auth.isAuthenticated) {
      return h.redirect('/home')
    } else {
      const errors = request.yar.get('errors')
      const errorMessage = request.yar.get('errorMessage')
      request.yar.set('errors', null)
      request.yar.set('errorMessage', null)
      return h.view('login/index', {
        pageTitle: 'Check plant health information and import rules — GOV.UK',
        heading: 'Login Page',
        page: 'home',
        serviceName: '',
        errors: errors?.errors,
        errorMessage: errorMessage?.errorMessage
      })
    }
  }
}

const authController = {
  handler: (request, h) => {
    if (request.payload.password === password) {
      // once user loggedin , set the cookie with user data and send back cookie with authentication
      // this info will also be validated in serverside using validate function
      request.cookieAuth.set({ password: request.payload.password })
      return h.redirect('/home')
    } else {
      request.yar.set('errors', {
        errors: {
          titleText: 'There is a problem',
          errorList: [
            {
              text: 'The password is not correct',
              href: '#password'
            }
          ]
        }
      })
      request.yar.set('errorMessage', {
        errorMessage: {
          text: 'The password is not correct'
        }
      })
      return h.redirect('/')
    }
  }
}

export { loginController, authController }
