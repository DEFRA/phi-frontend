import { plantHealthController } from '~/src/server/plant-health/controller';
import { getDefaultLocaleData } from '../localisation';

jest.mock('../localisation');

describe('plantHealthController', () => {
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

  it('should handle findanotherpest query', async () => {
    request.query.findanotherpest = 'true';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await plantHealthController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('purposeOfVisitRadiooption', null);
    expect(request.yar.set).toHaveBeenCalledWith('importConfirmationRadiooption', null);
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', null);
    expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', null);
    expect(request.yar.set).toHaveBeenCalledWith('format', null);
    expect(request.yar.set).toHaveBeenCalledWith('pestsearchQuery', null);
    expect(h.view).toHaveBeenCalledWith('plant-health/index', expect.any(Object));
  });

  it('should handle request with no query parameters', async () => {
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await plantHealthController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('errors', '');
    expect(request.yar.set).toHaveBeenCalledWith('errorMessage', '');
    expect(request.yar.set).toHaveBeenCalledWith('errorMessageRadio', '');
    expect(h.view).toHaveBeenCalledWith('plant-health/index', expect.any(Object));
  });

  it('should set radiobuttonValue from yar', async () => {
    request.yar.get.mockReturnValueOnce({ purposeOfVisit: 'testValue' });
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await plantHealthController.handler(request, h);

    expect(h.view).toHaveBeenCalledWith('plant-health/index', expect.objectContaining({
      radiobuttonValue: 'testValue'
    }));
  });
});
