import { importConfirmationController } from '~/src/server/plant-health/import-confirmation/controller'
import { getDefaultLocaleData } from '~/src/server/localisation.js'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'

jest.mock('~/src/server/localisation')
jest.mock('~/src/server/common/helpers/errors')
jest.mock('~/src/config')

describe('importConfirmationController', () => {
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
      view: jest.fn()
    }
  })

  it('should handle GB import confirmation', async () => {
    request.query.whereareyouimportinginto = 'gb'
    request.query.searchQuery = 'some query'
    getDefaultLocaleData.mockResolvedValueOnce({
      mainContent: 'main content',
      getHelpSection: 'help section'
    })
    getDefaultLocaleData
      .mockResolvedValueOnce({
        mainContent: 'search main content',
        getHelpSection: 'search help section'
      })
      .mockResolvedValueOnce({
        searchQuery: 'some query',
        hostRef: 28,
        eppoCode: '1ABIG'
      })
    config.get.mockReturnValue('http://frontend.url')

    await importConfirmationController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith(
      'importConfirmationRadiooption',
      { whereareyouimportinginto: 'gb' }
    )
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', {
      value: 'some query'
    })
    request.yar.get
      .mockReturnValueOnce('hostRef')
      .mockReturnValueOnce('eppoCode')
      .mockReturnValueOnce('searchQuery')
    expect(h.view).toHaveBeenCalledWith('plant-health/search/index', {
      pageTitle:
        'What plant or plant product are you importing? — Check plant health information and import rules — GOV.UK',
      heading: 'Search',
      mainContent: 'search main content',
      getHelpSection: 'search help section',
      frontendUrl: 'http://frontend.url',
      searchQuery: undefined,
      hostRef: undefined,
      eppoCode: undefined
    })
  })

  it('should render the import confirmation service unavailable view with correct data', async () => {
    const mockData = {
      serviceUnavailablePage: {
        headerText:
          'This service does not include import and plant health information for Northern Ireland',
        desc1: 'You will be able to use the service later.',
        desc2:
          'There are different plant health controls for Northern Ireland and Great Britain. You can'
      }
    }
    getDefaultLocaleData.mockResolvedValueOnce(mockData)
    request.query.whereareyouimportinginto = 'ni'

    await importConfirmationController.handler(request, h)
    expect(request.yar.set).toHaveBeenCalledWith(
      'importConfirmationRadiooption',
      { whereareyouimportinginto: 'ni' }
    )

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/import-confirmation/service-unavailable.njk',
      {
        serviceUnavailablePage: undefined,
        pageTitle:
          'This service does not include import and plant health information for Northern Ireland — Check plant health information and import rules — GOV.UK',
        heading: 'ImportConfirmation'
      }
    )
  })

  it('should render the import confirmation view with error data', async () => {
    const mockData = {
      mainContent: {
        headerText: 'Where are you importing your plant or plant product to?',
        radioButtonText1: 'Great Britain (England, Scotland and Wales)',
        radioButtonText2: 'Northern Ireland',
        buttonText: 'Continue'
      },
      getHelpSection: {
        titleText: 'Get help with this service',
        supportUrl: {
          text: 'If you have any queries or you need technical support, email'
        },
        betabannertext1: 'This is a new service - your',
        betabannertext2: 'will help us to improve it.',
        betaText: 'Beta'
      },
      errors: {
        titleText: 'There is a problem',
        importConfirmationErrorListText:
          'Select where are you importing your plant or plant product to'
      }
    }
    getDefaultLocaleData.mockReturnValueOnce(mockData).mockResolvedValueOnce({
      errors: {
        titleText: 'There is a problem',
        importConfirmationErrorListText:
          'Select where are you importing your plant or plant product to'
      }
    })
    request.yar.get
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('errors')
      .mockReturnValueOnce('errorMessage')

    await importConfirmationController.handler(request, h)
    expect(setErrorMessage).toHaveBeenCalledWith(
      request,
      'There is a problem',
      'Select where are you importing your plant or plant product to'
    )

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/import-confirmation/index',
      {
        mainContent: undefined,
        getHelpSection: undefined,
        pageTitle:
          'Where are you importing your plant or plant product to? — Check plant health information and import rules — GOV.UK',
        heading: 'ImportConfirmation',
        errors: 'errors',
        errorMessage: 'errorMessage',
        radiobuttonValue: undefined
      }
    )
  })
})
