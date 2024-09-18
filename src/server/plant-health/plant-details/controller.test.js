import { plantDetailsPageController } from '~/src/server/plant-health/plant-details/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');

describe('plantDetailsPageController', () => {
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

  it('should handle request with format query', async () => {
    request.query.format = 'testFormat';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await plantDetailsPageController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('format', { value: 'testFormat' });
    expect(h.view).toHaveBeenCalledWith('plant-health/plant-details/index', expect.objectContaining({
      pageTitle: 'test — Check plant health information and import rules — GOV.UK',
      heading: 'Plant Details',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });

  it('should handle request without format query', async () => {
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection',
      errors: {
        titleText: 'Error Title',
        formatPageErrorListText1: 'Error Text 1',
        formatPageErrorListText2: 'Error Text 2'
      }
    });

    await plantDetailsPageController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(
      request,
      'Error Title',
      'Error Text 1 test Error Text 2'
    );
    expect(h.view).toHaveBeenCalledWith('plant-health/plant-details/index', expect.objectContaining({
      pageTitle: 'test — Check plant health information and import rules — GOV.UK',
      heading: 'Format',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });
});
