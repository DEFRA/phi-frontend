import { pestSearchController } from '~/src/server/plant-health/pest-search/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';
import { config } from '~/src/config';
import axios from 'axios';
import { proxyFetch } from '~/src/server/common/helpers/proxy-fetch';

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');
jest.mock('axios');
jest.mock('~/src/server/common/helpers/proxy-fetch');

describe('pestSearchController', () => {
  let request, h;

  beforeEach(() => {
    request = {
      yar: {
        get: jest.fn(),
        set: jest.fn()
      },
      query: {}
    };
    h = {
      view: jest.fn()
    };
  });

  it('should handle request with cslRef query', async () => {
    request.query.cslRef = '123';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });

    await pestSearchController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('cslRef', { value: 13 });
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.objectContaining({
      pageTitle: expect.stringContaining(' — Check plant health information and import rules — GOV.UK'),
      heading: 'Pestdetails',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });

  it('should handle request without cslRef query', async () => {
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection',
      errors: {
        titleText: 'Error Title',
        searchErrorListText: 'Error Text'
      }
    });

    await pestSearchController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error Title', 'Error List');
   
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-search/index.njk', expect.objectContaining({
      pageTitle: expect.stringContaining('Error: What pest or disease do you want to find out about? — Check plant health information and import rules — GOV.UK'),
      heading: 'Search',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });

  it('should handle API call for pest details', async () => {
    request.query.cslRef = '123';
    request.query.pestsearchQuery = 'testQuery';
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    });
    axios.post.mockResolvedValue({
      data: {
        pest_detail: [{
          EPPO_CODE: 'EPPO123',
          PEST_NAME: [{ NAME: 'Pest Name' }],
          DOCUMENT_LINK: [],
          PLANT_LINK: [],
          QUARANTINE_INDICATOR: 'R'
        }]
      }
    });
    proxyFetch.mockResolvedValue({ status: 200 });

    await pestSearchController.handler(request, h);

    expect(axios.post).toHaveBeenCalledWith(
      config.get('backendApiUrl') + '/search/pestdetails',
      { pestDetails: { cslRef: 123 } }
    );
    expect(h.view).toHaveBeenCalledWith('plant-health/pest-details/index', expect.objectContaining({
      pageTitle: expect.stringContaining('Pest Name — Check plant health information and import rules — GOV.UK'),
      heading: 'Pestdetails',
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    }));
  });
});
