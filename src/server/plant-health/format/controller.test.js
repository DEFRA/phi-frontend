import { formatPageController } from '~/src/server/plant-health/format/controller'

jest.mock('~/src/server/localisation')
jest.mock('~/src/server/common/helpers/errors')
jest.mock('axios')

describe('formatPageController', () => {
  let request, h

  beforeEach(() => {
    request = {
      query: {},
      yar: {
        set: jest.fn(),
        get: jest.fn()
      }
    }
    h = {
      view: jest.fn(),
      redirect: jest.fn()
    }
  })

  it('should handle errors and redirect to the error page', async () => {
    request.query.result = ''

    await formatPageController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/format/index',
      expect.objectContaining({
        countrySearchQuery: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        getHelpSection: undefined,
        heading: 'Format',
        hostRef: undefined,
        mainContent: undefined,
        pageTitle:
          'Which format of undefined are you importing? — Check plant health information and import rules — GOV.UK',
        radiobuttonValue: undefined,
        searchQuery: undefined
      })
    )
  })

  it('should set error messages and return the error view', async () => {
    request.query.format = undefined

    await formatPageController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/format/index',
      expect.objectContaining({
        countrySearchQuery: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        getHelpSection: undefined,
        heading: 'Format',
        hostRef: undefined,
        mainContent: undefined,
        pageTitle:
          'Which format of undefined are you importing? — Check plant health information and import rules — GOV.UK',
        radiobuttonValue: undefined,
        searchQuery: undefined
      })
    )
  })
})
