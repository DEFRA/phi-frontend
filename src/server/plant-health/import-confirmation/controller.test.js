import { importConfirmationController } from '~/src/server/plant-health/import-confirmation/controller.js'
import { getDefaultLocaleData } from '~/src/server/localisation'
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
    config.get.mockReturnValue('http://localhost')
  })

  it('should render search page when whereareyouimportinginto is gb', async () => {
    request.query.whereareyouimportinginto = 'gb'

    await importConfirmationController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith(
      'importConfirmationRadiooption',
      { whereareyouimportinginto: 'gb' }
    )

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/search/index',
      expect.objectContaining({
        eppoCode: undefined,
        frontendUrl: 'http://localhost',
        fullSearchQuery: undefined,
        getHelpSection: undefined,
        heading: 'Search',
        hostRef: undefined,
        mainContent: undefined,
        pageTitle:
          'What plant, plant product or seeds are you importing? — Check plant health information and import rules — GOV.UK',
        searchQuery: undefined
      })
    )
  })

  it('should render service unavailable page when whereareyouimportinginto is ni', async () => {
    request.query.whereareyouimportinginto = 'ni'
    getDefaultLocaleData.mockResolvedValue({
      serviceUnavailablePage: 'serviceUnavailablePage',
      getHelpSection: 'getHelpSection'
    })

    await importConfirmationController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith(
      'importConfirmationRadiooption',
      { whereareyouimportinginto: 'ni' }
    )
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/import-confirmation/service-unavailable.njk',
      expect.objectContaining({
        serviceUnavailablePage: 'serviceUnavailablePage',
        getHelpSection: 'getHelpSection',
        pageTitle:
          'This service does not include import and plant health information for Northern Ireland — Check plant health information and import rules — GOV.UK',
        heading: 'ImportConfirmation'
      })
    )
  })

  it('should render error page when no valid query is provided', async () => {
    request.yar.get
      .mockReturnValueOnce({ whereareyouimportinginto: null })
      .mockReturnValueOnce({ errors: 'errors' })
      .mockReturnValueOnce({ errorMessage: 'errorMessage' })
    getDefaultLocaleData
      .mockResolvedValueOnce({
        mainContent: 'mainContent',
        getHelpSection: 'getHelpSection'
      })
      .mockResolvedValueOnce({
        errors: {
          titleText: 'Error Title',
          importConfirmationErrorListText: 'Error List'
        }
      })

    await importConfirmationController.handler(request, h)
  })
})
