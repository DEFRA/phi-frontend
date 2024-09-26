import { searchPageController } from '~/src/server/plant-health/search/controller';
import { getDefaultLocaleData } from '~/src/server/localisation.js';
import { setErrorMessage } from '~/src/server/common/helpers/errors';
import { config } from '~/src/config';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');
jest.mock('~/src/config');

describe('searchPageController', () => {
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
    config.get = jest.fn().mockReturnValue('http://localhost');
  });

  it('should handle request with searchQuery and hostRef', async () => {
    request.query.searchQuery = 'testSearch';
    request.query.fullSearchQuery = 'testSearch';
    request.query.hostRef = 'testHostRef';
    request.query.autocompleteSearchQuery = 'testautocompleteSearch';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await searchPageController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('fullSearchQuery', { value: 'testSearch' });
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'testSearch' });
    expect(request.yar.set).toHaveBeenCalledWith('autocompleteSearchQuery', { value: 'testautocompleteSearch' });
    expect(request.yar.set).toHaveBeenCalledWith('hostRef', { value: 'undefined' });
    expect(h.view).toHaveBeenCalledWith('plant-health/country-search/index', expect.objectContaining({
      pageTitle: 'Which country, state or territory are you importing testSearch — Check plant health information and import rules — GOV.UK',
      heading: 'Country',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });

  it('should handle request without searchQuery or hostRef', async () => {
    request.query.searchQuery = '';
    request.query.hostRef = '';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection',
      errors: {
        titleText: 'Error Title',
        searchErrorListText: 'Error Text'
      }
    });

    await searchPageController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(
      request,
      'Error Title',
      'Error Text'
    );
    expect(h.view).toHaveBeenCalledWith('plant-health/search/index', expect.objectContaining({
      pageTitle: 'What plant or plant product are you importing? — Check plant health information and import rules — GOV.UK',
      heading: 'Search',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });
});
