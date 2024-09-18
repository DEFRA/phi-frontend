import { countrySearchController } from '~/src/server/plant-health/country-search/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');

describe('countrySearchController', () => {
  let request, h;

  beforeEach(() => {
    request = {
      yar: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue({ value: 'test' })
      },
      query: {}
    };
    h = {
      view: jest.fn()
    };
  });

  it('should handle request with valid countrySearchQuery and countryCode', async () => {
    request.query.countrySearchQuery = 'testCountrySearch';
    request.query.countryCode = 'testCountryCode';
    request.query.searchQuery = 'testSearch';
    request.query.hostRef = 'testHostRef';
    request.query.eppoCode = 'testEppoCode';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await countrySearchController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', { value: 'testCountrySearch' });
    expect(request.yar.set).toHaveBeenCalledWith('countryCode', { value: 'testCountryCode' });
    expect(request.yar.set).toHaveBeenCalledWith('fullSearchQuery', { value: 'testSearch' });
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'testSearch' });
    expect(request.yar.set).toHaveBeenCalledWith('hostRef', { value: 'testHostRef' });
    expect(request.yar.set).toHaveBeenCalledWith('eppoCode', { value: 'testEppoCode' });
    expect(h.view).toHaveBeenCalledWith('plant-health/format/index', expect.objectContaining({
      pageTitle: 'Which format of testSearch are you importing? — Check plant health information and import rules — GOV.UK',
      heading: 'Format',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });

  it('should handle request with invalid countrySearchQuery or empty countryCode', async () => {
    request.query.countrySearchQuery = '';
    request.query.countryCode = '';
    request.query.searchQuery = 'testSearch';
    request.query.hostRef = 'testHostRef';
    request.query.eppoCode = 'testEppoCode';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection',
      errors: {
        titleText: 'Error Title',
        searchErrorListText1: 'Error Text 1',
        searchErrorListText2: 'Error Text 2'
      }
    });

    await countrySearchController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(
      request,
      'Error Title',
      'Error Text 1 testSearch Error Text 2'
    );
    expect(h.view).toHaveBeenCalledWith('plant-health/country-search/index', expect.objectContaining({
      pageTitle: 'Which country, state or territory are you importing testSearch — Check plant health information and import rules — GOV.UK',
      heading: 'Country Search',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });
});
