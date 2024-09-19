import { formatPageController } from '~/src/server/plant-health/format/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';
import { config } from '~/src/config';
import axios from 'axios';

jest.mock('~/src/server/localisation');
jest.mock('~/src/config');
jest.mock('~/src/server/common/helpers/errors');
jest.mock('axios');

describe('formatPageController', () => {
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
      view: jest.fn(),
      redirect: jest.fn()
    };
  });

  it('should handle request with format query parameter', async () => {
    request.query.format = 'testFormat';
    getDefaultLocaleData.mockResolvedValue({ mainContent: 'mainContent', getHelpSection: 'getHelpSection' });

    await formatPageController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('format', { value: 'testFormat' });
    expect(h.view).toHaveBeenCalled();
  });

  it('should handle request with searchQuery and countrySearchQuery', async () => {
    request.query.searchQuery = 'testSearchQuery';
    request.query.countrySearchQuery = 'testCountrySearchQuery';
    getDefaultLocaleData.mockResolvedValue({ mainContent: 'mainContent', getHelpSection: 'getHelpSection' });

    await formatPageController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'testSearchQuery' });
    expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', { value: 'testCountrySearchQuery' });
    expect(h.view).toHaveBeenCalled();
  });

  it('should handle errors and render error view', async () => {
    request.query = {};
    getDefaultLocaleData.mockResolvedValue({ errors: { titleText: 'Error', formatPageErrorListText1: 'Error list part 1', formatPageErrorListText2: 'Error list part 2' } });

    await formatPageController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error', 'Error list part 1  Error list part 2');
    expect(h.view).toHaveBeenCalledWith('plant-health/format/index', expect.any(Object));
  });

  it('should redirect to error page on API error', async () => {
    request.query.format = 'testFormat';
    axios.post.mockRejectedValue({ response: { status: 500 } });
    getDefaultLocaleData.mockResolvedValue({ mainContent: 'mainContent', getHelpSection: 'getHelpSection' });

    await formatPageController.handler(request, h);

    expect(h.redirect).toHaveBeenCalledWith('/check-plant-health-information-and-import-rules/problem-with-service?statusCode=500');
  });
});
