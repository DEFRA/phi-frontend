import { formatPageController } from '~/src/server/plant-health/format/controller';
import { getDefaultLocaleData } from '~/src/server/localisation';
import { setErrorMessage } from '~/src/server/common/helpers/errors';
import { config } from '~/src/config';
import axios from 'axios';




jest.mock('~/src/server/localisation');
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

  it('should handle a valid request and return the correct view', async () => {
    request.query = {
      countrySearchQuery: 'Japan',
      fullSearchQuery: 'Full Query',
      searchQuery: 'Search Query',
      hostRef: '123',
      eppoCode: 'E123',
      format: 'plants for planting'
    };
    request.yar.get.mockReturnValueOnce({ value: '123' });

    const data = {
      mainContent: 'Main Content',
      getHelpSection: 'Help Section'
    };
    getDefaultLocaleData.mockResolvedValueOnce(data);

    const plantData = {
      mainContent: 'Plant Main Content',
      getHelpSection: 'Plant Help Section'
    };
    getDefaultLocaleData.mockResolvedValueOnce(plantData);

    const result = {
      hostRef: '123',
      dormantIndicator: ['Dormant'],
      seedIndicator: ['Seeds'],
      fruitIndicator: ['Fruit'],
      bonsaiIndicator: ['Bonsai'],
      invintroIndicator: ['In vitro'],
      FormatClarification: 'Clarification',
      annex11RulesArr: [],
      pestDetails: [],
      annexSixRule: 'Annex Six',
      annexElevenRule: 'Annex Eleven',
      eppoCode: 'E123',
      plantName: [{ NAME: 'Preferred Name' }, { NAME: 'Common Name' }, { NAME: 'Synonym Name' }]
    };
    axios.post.mockResolvedValueOnce({ data: result });

    await formatPageController.handler(request, h);

    expect(h.view).toHaveBeenCalledWith('plant-health/plant-details/index', expect.objectContaining({
      pageTitle: expect.any(String),
      heading: 'Plant Details',
      result,
      // Add other expected properties here
    }));
  });

  it('should handle errors and redirect to the error page', async () => {
    request.query = { format: 'invalid' };
    axios.post.mockRejectedValueOnce(new Error('API Error'));

    await formatPageController.handler(request, h);

    expect(h.redirect).toHaveBeenCalledWith(expect.stringContaining('/check-plant-health-information-and-import-rules/problem-with-service'));
  });

  it('should set error messages and return the error view', async () => {
    request.query = {};
    request.yar.get.mockReturnValueOnce(null);

    const errorData = {
      errors: {
        titleText: 'Error Title',
        formatPageErrorListText1: 'Error List Text 1',
        formatPageErrorListText2: 'Error List Text 2'
      }
    };
    getDefaultLocaleData.mockResolvedValueOnce(errorData);

    await formatPageController.handler(request, h);

    expect(setErrorMessage).toHaveBeenCalledWith(
      request,
      errorData.errors.titleText,
      expect.any(String)
    );
    expect(h.view).toHaveBeenCalledWith('plant-health/format/index', expect.objectContaining({
      pageTitle: expect.any(String),
      heading: 'Format',
      errors: expect.any(Object),
      errorMessage: expect.any(String)
    }));
  });
});
