import { pestDetailsPageController } from '~/src/server/plant-health/pest-details/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');
test('TextEncoder is globally defined in Jest', () => {
  expect(global.TextEncoder).toBeDefined();
});
describe('pestDetailsPageController', () => {
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

  it('should handle valid format query', async () => {
    request.query.format = 'testFormat';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await pestDetailsPageController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('format', { value: 'testFormat' });
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.any(Object));
  });

  it('should handle missing format query', async () => {
    request.query.format = undefined;
    getDefaultLocaleData.mockResolvedValue({
      errors: {
        titleText: 'Error Title',
        formatPageErrorListText1: 'Error List Text 1',
        formatPageErrorListText2: 'Error List Text 2'
      }
    });

    await pestDetailsPageController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error Title', 'Error List');
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.objectContaining({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection',
      radiobuttonValue: null,
      errors: 'errors',
      errorMessage: 'errorMessage'
    }));
   // expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.any(Object));
  });

  it('should set search query values correctly', async () => {
    request.yar.get.mockReturnValueOnce('testSearchQuery')
      .mockReturnValueOnce('testFullSearchQuery')
      .mockReturnValueOnce('testPestSearchQuery')
      .mockReturnValueOnce('testCslRef')
      .mockReturnValueOnce('testEppoCode');

    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await pestDetailsPageController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'testSearchQuery' });
    expect(request.yar.set).toHaveBeenCalledWith('fullSearchQuery', { value: 'testFullSearchQuery' });
    expect(request.yar.set).toHaveBeenCalledWith('pestSearchQuery', { value: 'testPestSearchQuery' });
    expect(request.yar.set).toHaveBeenCalledWith('cslRef', { value: 'testCslRef' });
    expect(request.yar.set).toHaveBeenCalledWith('eppoCode', { value: 'testEppoCode' });
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.any(Object));
  });
});
