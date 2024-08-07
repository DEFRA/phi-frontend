import { plantHealthController } from '~/src/server/plant-health/controller'
import { getDefaultLocaleData } from '../localisation'

jest.mock('../localisation')

describe('plantHealthController', () => {
  let request, h

  beforeEach(() => {
    request = {
      query: {},
      yar: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue({ purposeOfVisit: 'test' })
      }
    }
    h = {
      view: jest.fn()
    }
  })

  it('should call getDefaultLocaleData with "plant-health"', async () => {
    await plantHealthController.handler(request, h)
    expect(getDefaultLocaleData).toHaveBeenCalledWith('plant-health')
  })

  it('should set yar values when findanotherpest is true', async () => {
    request.query.findanotherpest = 'true'
    await plantHealthController.handler(request, h)
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
  })

  it('should set yar errors and error messages to empty strings', async () => {
    await plantHealthController.handler(request, h)
    expect(request.yar.set).toHaveBeenCalledWith('errors', '')
    expect(request.yar.set).toHaveBeenCalledWith('errorMessage', '')
    expect(request.yar.set).toHaveBeenCalledWith('errorMessageRadio', '')
  })

  it('should render the view with correct data', async () => {
    const mockData = {
      mainContent: 'main content',
      getHelpSection: 'help section'
    }
    getDefaultLocaleData.mockResolvedValue(mockData)

    await plantHealthController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith('plant-health/index', {
      mainContent: 'main content',
      getHelpSection: 'help section',
      pageTitle:
        'What do you want to find out? — Check plant health information and import rules — GOV.UK',
      heading: 'Plant',
      radiobuttonValue: 'test'
    })
  })
})
