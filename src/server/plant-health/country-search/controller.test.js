import { countrySearchController } from '~/src/server/plant-health/country-search/controller'
import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'

jest.mock('~/src/server/localisation')
jest.mock('~/src/server/common/helpers/errors')

describe('countrySearchController', () => {
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

  it('should handle valid country search query', async () => {
    request.query.countrySearchQuery = 'testCountry'
    // getDefaultLocaleData.mockResolvedValue({
    //   mainContent: 'mainContent',
    //   getHelpSection: 'getHelpSection'
    // });

    await countrySearchController.handler(request, h)

    // expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', { value: 'testCountry' });
    // expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'testCountry' });
    // expect(request.yar.set).toHaveBeenCalledWith('autocompleteCountrySearchQuery', { value: 'testCountry' });
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/country-search/index',
      expect.objectContaining({
        countryCode: undefined,
        countrySearchQuery: undefined,
        eppoCode: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        mainContent: undefined,
        hostRef: undefined,
        heading: 'Country Search',
        pageTitle:
          'Which country, state or territory are you importing undefined from? — Check plant health information and import rules — GOV.UK',
        getHelpSection: undefined,
        searchQuery: undefined
      })
    )
  })

  it('should handle empty country search query', async () => {
    request.query.countrySearchQuery = ''
    request.query.emptyCountrySearchQuery = 'true'
    request.query.countryCode === 'null'

    getDefaultLocaleData.mockResolvedValue({
      errors: {
        titleText: 'Error Title',
        searchErrorListText1: 'Error List Text 1',
        searchErrorListText2: 'Error List Text 2',
        searchErrorListText2: 'Error List Text 3'
      }
    })

    await countrySearchController.handler(request, h)

    //expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error Title', 'Error List');

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/country-search/index',
      expect.objectContaining({
        countryCode: undefined,
        countrySearchQuery: undefined,
        eppoCode: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        getHelpSection: undefined,
        heading: 'Country Search',
        hostRef: undefined,
        mainContent: undefined,
        pageTitle:
          'Which country, state or territory are you importing undefined from? — Check plant health information and import rules — GOV.UK',
        searchQuery: undefined
      })
    )
  })

  it('should handle valid country code', async () => {
    request.query.countryCode = 'testCode'

    await countrySearchController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith('countryCode', {
      value: 'testCode'
    })
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/country-search/index',
      expect.objectContaining({
        countryCode: undefined,
        countrySearchQuery: undefined,
        eppoCode: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        mainContent: undefined,
        hostRef: undefined,
        heading: 'Country Search',
        pageTitle:
          'Which country, state or territory are you importing undefined from? — Check plant health information and import rules — GOV.UK',
        getHelpSection: undefined,
        searchQuery: undefined
      })
    )
  })

  it('should handle missing country code', async () => {
    request.query.countryCode = ''
    //request.query.countryCodeOne = 'testCodeOne';
    // getDefaultLocaleData.mockResolvedValue({
    //   mainContent: 'mainContent',
    //   getHelpSection: 'getHelpSection'
    // });

    await countrySearchController.handler(request, h)

    //expect(request.yar.set).toHaveBeenCalledWith('countryCode', { value: 'testCodeOne' });
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/country-search/index',
      expect.objectContaining({
        countryCode: undefined,
        countrySearchQuery: undefined,
        eppoCode: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        mainContent: undefined,
        hostRef: undefined,
        heading: 'Country Search',
        pageTitle:
          'Which country, state or territory are you importing undefined from? — Check plant health information and import rules — GOV.UK',
        getHelpSection: undefined,
        searchQuery: undefined
      })
    )
  })
})
