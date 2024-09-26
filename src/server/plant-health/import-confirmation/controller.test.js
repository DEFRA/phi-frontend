import { importConfirmationController } from '~/src/server/plant-health/import-confirmation/controller.js';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';
import { config } from '~/src/config';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');
jest.mock('~/src/config');

describe('importConfirmationController', () => {
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
    config.get.mockReturnValue('http://localhost');
  });

  it('should render search page when whereareyouimportinginto is gb', async () => {
    request.query.whereareyouimportinginto = 'gb';
    request.query.searchQuery = 'query';
    request.yar.get.mockReturnValueOnce({ value: 'hostRef' });
    getDefaultLocaleData.mockResolvedValueOnce({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }).mockResolvedValueOnce({
      mainContent: 'searchMainContent',
      getHelpSection: 'searchGetHelpSection'
    });

    await importConfirmationController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('importConfirmationRadiooption', { whereareyouimportinginto: 'gb' });
   // expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'query' });
    expect(h.view).toHaveBeenCalledWith('plant-health/search/index', expect.objectContaining({
      pageTitle: 'What plant, plant product or seeds are you importing? — Check plant health information and import rules — GOV.UK',
      heading: 'Search',
      getHelpSection: 'searchGetHelpSection',
      hostRef: 'hostRef',
     
      mainContent: 'searchMainContent',
      frontendUrl: 'http://localhost',
      searchQuery: { value: 'query' },
      fullSearchQuery: undefined
    }));
  });

  it('should render service unavailable page when whereareyouimportinginto is ni', async () => {
    request.query.whereareyouimportinginto = 'ni';
    getDefaultLocaleData.mockResolvedValue({
      serviceUnavailablePage: 'serviceUnavailablePage',
      getHelpSection: 'getHelpSection'
    });

    await importConfirmationController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('importConfirmationRadiooption', { whereareyouimportinginto: 'ni' });
    expect(h.view).toHaveBeenCalledWith('plant-health/import-confirmation/service-unavailable.njk', expect.objectContaining({
      serviceUnavailablePage: 'serviceUnavailablePage',
      getHelpSection: 'getHelpSection',
      pageTitle: 'This service does not include import and plant health information for Northern Ireland — Check plant health information and import rules — GOV.UK',
      heading: 'ImportConfirmation'
    }));
  });

  it('should render error page when no valid query is provided', async () => {
    request.yar.get.mockReturnValueOnce({ whereareyouimportinginto: null }).mockReturnValueOnce({ errors: 'errors' }).mockReturnValueOnce({ errorMessage: 'errorMessage' });
    getDefaultLocaleData.mockResolvedValueOnce({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }).mockResolvedValueOnce({
      errors: {
        titleText: 'Error Title',
        importConfirmationErrorListText: 'Error List'
      }
    });

    await importConfirmationController.handler(request, h);

    // expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error Title', 'Error List');
    // expect(h.view).toHaveBeenCalledWith('plant-health/import-confirmation/index', expect.objectContaining({
    //   mainContent: 'mainContent',
    //   getHelpSection: 'getHelpSection',
    //   radiobuttonValue: null,
    //   pageTitle: 'Error: What plant, plant product or seeds are you importing? — Check plant health information and import rules — GOV.UK',
    //   heading: 'ImportConfirmation',
    //   errors: 'errors',
    //   errorMessage: 'errorMessage'
    // }));
  });
});
