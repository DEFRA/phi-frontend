import { purposeOfVisitController } from '~/src/server/plant-health/purpose-of-visit/controller'
import { getDefaultLocaleData } from '~/src/server/localisation'

jest.mock('~/src/server/localisation')
jest.mock('~/src/server/common/helpers/errors')

describe('purposeOfVisitController', () => {
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

  it('should render import confirmation page when whatdoyouwanttofind is importrules', async () => {
    request.query.whatdoyouwanttofind = 'importrules'
    request.yar.get.mockReturnValue({ whereareyouimportinginto: 'somewhere' })
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    })

    await purposeOfVisitController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith('purposeOfVisitRadiooption', {
      purposeOfVisit: 'importrules'
    })
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/import-confirmation/index',
      expect.objectContaining({
        mainContent: 'mainContent',
        getHelpSection: 'getHelpSection',
        radiobuttonValue: 'somewhere'
      })
    )
  })

  it('should render pest search page when whatdoyouwanttofind is pest', async () => {
    request.query.whatdoyouwanttofind = 'pest'
    request.query.pestsearchQuery = 'query'
    request.query.pestFullSearchQuery = 'fullQuery'
    // request.yar.get.mockReturnValueOnce({ value: 'cslRef' }).mockReturnValueOnce({ value: 'eppoCode' });
    // getDefaultLocaleData.mockResolvedValue({
    //   mainContent: 'mainContent',
    //   getHelpSection: 'getHelpSection',
    //   serviceUnavailablePage: 'serviceUnavailablePage'
    // });

    await purposeOfVisitController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith('purposeOfVisitRadiooption', {
      purposeOfVisit: 'pest'
    })
    expect(request.yar.set).toHaveBeenCalledWith('pestsearchQuery', {
      value: 'query'
    })
    expect(request.yar.set).toHaveBeenCalledWith('pestFullSearchQuery', {
      value: 'fullQuery'
    })
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/pest-search/index.njk',
      expect.objectContaining({
        cslRef: undefined,
        eppoCode: undefined,
        getHelpSection: 'getHelpSection',
        heading: 'Pest',
        mainContent: 'mainContent',
        pageTitle:
          'What pest or disease do you want to find out about? — Check plant health information and import rules — GOV.UK',
        pestFullSearchQuery: undefined,
        pestsearchQuery: undefined,
        serviceUnavailablePage: undefined
      })
    )
  })

  it('should render error page when no valid query is provided', async () => {
    request.query.whatdoyouwanttofind = null

    await purposeOfVisitController.handler(request, h)

    // expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error Title', 'Error List');
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/index',
      expect.objectContaining({
        errorMessage: undefined,
        errors: undefined,
        getHelpSection: 'getHelpSection',
        heading: 'Plant',
        mainContent: 'mainContent',
        pageTitle:
          'Error: What do you want to find out? — Check plant health information and import rules — GOV.UK',
        radiobuttonValue: undefined
      })
    )
  })
})
