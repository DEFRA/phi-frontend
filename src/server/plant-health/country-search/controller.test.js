import { countrySearchController } from '~/src/server/plant-health/country-search/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');

describe('countrySearchController', () => {
  let request, h;

  beforeEach(() => {
    request = {
      query: {},
      yar: {
        set: jest.fn(),
        get: jest.fn()
      }
    };
    h = {
      view: jest.fn()
    };
  });

  it('should handle valid country search query', async () => {
    request.query.countrySearchQuery = 'testCountry';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await countrySearchController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', { value: 'testCountry' });
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'testCountry' }); 
    expect(request.yar.set).toHaveBeenCalledWith('autocompleteCountrySearchQuery', { value: 'testCountry' });
    expect(h.view).toHaveBeenCalledWith('plant-health/format/index', expect.any(Object));
  });

  it('should handle empty country search query', async () => {
    request.query.countrySearchQuery = '';
    request.query.emptyCountrySearchQuery = 'true';
    getDefaultLocaleData.mockResolvedValue({
      errors: {
        titleText: 'Error Title',
        searchErrorListText1: 'Error List Text 1',
        searchErrorListText2: 'Error List Text 2'
      }
    });

    await countrySearchController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error Title', 'Error List');
   
    expect(h.view).toHaveBeenCalledWith('plant-health/country-search/index', expect.any(Object));
  });

  it('should handle valid country code', async () => {
    request.query.countryCode = 'testCode';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await countrySearchController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('countryCode', { value: 'testCode' });
    expect(h.view).toHaveBeenCalledWith('plant-health/format/index', expect.any(Object));
  });

  it('should handle missing country code', async () => {
    request.query.countryCode = '';
    request.query.countryCodeOne = 'testCodeOne';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await countrySearchController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('countryCode', { value: 'testCodeOne' });
    expect(h.view).toHaveBeenCalledWith('plant-health/format/index', expect.any(Object));
  });
});
