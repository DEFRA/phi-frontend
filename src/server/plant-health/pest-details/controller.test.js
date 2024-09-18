import { pestDetailsPageController } from '~/src/server/plant-health/pest-details/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');

describe('pestDetailsPageController', () => {
  let request, h;

  beforeEach(() => {
    request = {
      yar: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue({ value: 'mockValue' })
      },
      query: {}
    };
    h = {
      view: jest.fn()
    };
  });

  it('should handle request with format query', async () => {
    request.query.format = 'mockFormat';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mockMainContent',
      getHelpSection: 'mockGetHelpSection'
    });

    await pestDetailsPageController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('format', { value: 'mockFormat' });
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.objectContaining({
      pageTitle: 'Check plant health information and import rules — GOV.UK',
      heading: 'pest-details-page',
      getHelpSection: 'mockGetHelpSection',
      mainContent: 'mockMainContent'
    }));
  });

  it('should handle request without format query', async () => {
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mockMainContent',
      getHelpSection: 'mockGetHelpSection',
      errors: {
        titleText: 'mockTitleText',
        formatPageErrorListText1: 'mockErrorText1',
        formatPageErrorListText2: 'mockErrorText2'
      }
    });

    await pestDetailsPageController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(
      request,
      'mockTitleText',
      'mockErrorText1 mockValue mockErrorText2'
    );
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.objectContaining({
      pageTitle: 'Check plant health information and import rules — GOV.UK',
      heading: 'Format',
      mainContent: 'mockMainContent',
      getHelpSection: 'mockGetHelpSection'
    }));
  });
});
