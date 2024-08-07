import { homeController } from '~/src/server/home/controller'
import { getDefaultLocaleData } from '../localisation'

jest.mock('../localisation')

describe('homeController', () => {
  let request, h

  beforeEach(() => {
    request = {
      yar: {
        set: jest.fn()
      }
    }
    h = {
      view: jest.fn()
    }
  })

  it('should set cookies to null and render the home view with correct data', async () => {
    const mockData = {
      govukheading: 'Heading',
      govukcaption: 'Caption',
      govukbodytitle: 'Body Title',
      buttonText: 'Start Now',
      publishedSection: 'Published Section',
      appliesToSection: 'Applies To Section',
      textBeforeStartNowSection: 'Text Before Start Now',
      textAfterStartNowSection: 'Text After Start Now',
      relatedContentSection: 'Related Content Section',
      getHelpSection: 'Get Help Section'
    }

    getDefaultLocaleData.mockResolvedValue(mockData)

    await homeController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith(
      'purposeOfVisitRadiooption',
      null
    )
    expect(request.yar.set).toHaveBeenCalledWith(
      'importConfirmationRadiooption',
      null
    )
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', null)
    expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', null)
    expect(request.yar.set).toHaveBeenCalledWith('format', null)

    expect(h.view).toHaveBeenCalledWith('home/index', {
      govukCaption: 'Caption',
      govukHeading: 'Heading',
      govukBodyTitle: 'Body Title',
      buttonText: 'Start Now',
      publishedSection: 'Published Section',
      appliesToSection: 'Applies To Section',
      textBeforeStartNowSection: 'Text Before Start Now',
      textAfterStartNowSection: 'Text After Start Now',
      relatedContentSection: 'Related Content Section',
      getHelpSection: 'Get Help Section',
      pageTitle: 'Check plant health information and import rules — GOV.UK',
      heading: '',
      breadcrumbs: [
        { text: 'Home', href: '/' },
        { text: 'Environment', href: '/' },
        { text: 'Animal and plant health', href: '/' }
      ]
    })
  })
})
// import { loginController, authController } from '~/src/server/login/controller'
// import { config } from '~/src/config'

// jest.mock('~/src/config')

// describe('loginController', () => {
//   let request, h

//   beforeEach(() => {
//     request = {
//       auth: { isAuthenticated: false },
//       yar: {
//         get: jest.fn(),
//         set: jest.fn()
//       }
//     }
//     h = {
//       redirect: jest.fn().mockReturnValue('redirected'),
//       view: jest.fn().mockReturnValue('view rendered')
//     }
//   })

//   it('should redirect to /home if authenticated', () => {
//     request.auth.isAuthenticated = true
//     const response = loginController.handler(request, h)
//     expect(h.redirect).toHaveBeenCalledWith('/home')
//     expect(response).toBe('redirected')
//   })

//   it('should render login view if not authenticated', () => {
//     request.yar.get.mockReturnValueOnce({ errors: { errors: 'some errors' } })
//     request.yar.get.mockReturnValueOnce({
//       errorMessage: { errorMessage: 'some error message' }
//     })
//     const response = loginController.handler(request, h)
//     expect(h.view).toHaveBeenCalledWith('login/index', {
//       pageTitle: 'Check plant health information and import rules — GOV.UK',
//       heading: 'Login Page',
//       page: 'home',
//       serviceName: '',
//       errors: 'some errors',
//       errorMessage: 'some error message'
//     })
//     expect(response).toBe('view rendered')
//     expect(request.yar.set).toHaveBeenCalledWith('errors', null)
//     expect(request.yar.set).toHaveBeenCalledWith('errorMessage', null)
//   })
// })

// describe('authController', () => {
//   let request, h

//   beforeEach(() => {
//     request = {
//       payload: { password: 'wrongPassword' },
//       yar: {
//         set: jest.fn()
//       },
//       cookieAuth: {
//         set: jest.fn()
//       }
//     }
//     h = {
//       redirect: jest.fn().mockReturnValue('redirected')
//     }
//     config.get.mockReturnValue('demo123')
//   })

//   it('should redirect to /home if password is correct', () => {
//     request.payload.password = 'demo123'
//     const response = authController.handler(request, h)
//     expect(request.cookieAuth.set).toHaveBeenCalledWith({
//       password: 'demo123'
//     })
//     expect(h.redirect).toHaveBeenCalledWith('/home')
//     expect(response).toBe('redirected')
//   })

//   it('should redirect to / if password is incorrect', () => {
//     const response = authController.handler(request, h)
//     expect(request.yar.set).toHaveBeenCalledWith('errors', {
//       errors: {
//         titleText: 'There is a problem',
//         errorList: [
//           {
//             text: 'The password is not correct',
//             href: '#password'
//           }
//         ]
//       }
//     })
//     expect(request.yar.set).toHaveBeenCalledWith('errorMessage', {
//       errorMessage: {
//         text: 'The password is not correct'
//       }
//     })
//     expect(h.redirect).toHaveBeenCalledWith('/')
//     expect(response).toBe('redirected')
//   })
// })
