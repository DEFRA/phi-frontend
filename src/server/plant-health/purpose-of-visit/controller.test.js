import { purposeOfVisitController } from '~/src/server/plant-health/purpose-of-visit/controller'
import { getDefaultLocaleData } from '~/src/server/localisation.js'

jest.mock('~/src/server/localisation.js')

describe('purposeOfVisitController', () => {
  let request, h

  beforeEach(() => {
    request = {
      query: {},
      yar: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue({ whereareyouimportinginto: 'gb' })
      }
    }
    h = {
      view: jest.fn()
    }
  })

  it('should render the import confirmation view with correct data', async () => {
    const mockData = {
      mainContent: 'main content',
      getHelpSection: 'help section'
    }
    getDefaultLocaleData.mockResolvedValue(mockData)
    request.query.whatdoyouwanttofind = 'importrules'

    await purposeOfVisitController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/import-confirmation/index',
      {
        mainContent: 'main content',
        getHelpSection: 'help section',
        pageTitle:
          'Where are you importing your plant or plant product to? — Check plant health information and import rules — GOV.UK',
        heading: 'Plant',
        radiobuttonValue: 'gb'
      }
    )
  })

  it('should render the service unavailable view with correct data', async () => {
    const mockData = {
      serviceUnavailablePage: {
        headerText: 'Pest or disease information unavailable',
        description:
          'You cannot currently use this service to lookup pests or diseases. We will add this information soon',
        buttonText: 'Go Back'
      }
    }
    getDefaultLocaleData.mockResolvedValue(mockData)
    request.query.whatdoyouwanttofind = 'pest'

    await purposeOfVisitController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/service-unavailable.njk',
      {
        serviceUnavailablePage: mockData.serviceUnavailablePage,
        pageTitle:
          'This service does not include import and plant health information for Northern Ireland — Check plant health information and import rules — GOV.UK',
        heading: 'Pest'
      }
    )
  })

  it('should render the purpose of visit view with error data', async () => {
    const mockData = {
      mainContent: 'main content',
      getHelpSection: 'help section',
      errors: {
        titleText: 'There is a problem',
        purposeOfVisitErrorListText: 'Select what do you want to find out'
      }
    }
    getDefaultLocaleData.mockResolvedValue(mockData).mockResolvedValueOnce({
      errors: {
        titleText: 'Error Title',
        purposeOfVisitErrorListText: 'Error List Text'
      }
    })
    request.yar.get
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('errors')
      .mockReturnValueOnce('errorMessage')

    await purposeOfVisitController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith('plant-health/index', {
      mainContent: 'main content',
      getHelpSection: 'help section',
      pageTitle:
        'What do you want to find out? — Check plant health information and import rules — GOV.UK',
      heading: 'Plant',
      errors: 'errors',
      errorMessage: 'errorMessage',
      radiobuttonValue: undefined
    })
  })
})
