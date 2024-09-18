const { getDefaultLocaleData } = require('~/src/server/localisation');
const { setErrorMessage } = require('~/src/server/common/helpers/errors');
const { config } = require('~/src/config');
const axios = require('axios');
const formatPageController = require('~/src/server/plant-health/format/controller'); // Adjust the path as needed

jest.mock('~/src/server/localisation');
jest.mock('~/src/server/common/helpers/errors');
jest.mock('~/src/config');
jest.mock('axios');

describe('formatPageController', () => {
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
      response: jest.fn().mockReturnThis(),
      code: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle a valid request', async () => {
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'main content',
      getHelpSection: 'help section'
    });

    await formatPageController.handler(request, h);

    expect(getDefaultLocaleData).toHaveBeenCalledWith('format');
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'test' });
    expect(request.yar.set).toHaveBeenCalledWith('fullSearchQuery', { value: 'test' });
    expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', { value: 'test' });
    expect(request.yar.set).toHaveBeenCalledWith('countryCode', { value: 'test' });
    expect(request.yar.set).toHaveBeenCalledWith('hostRef', { value: 'test' });
    expect(request.yar.set).toHaveBeenCalledWith('eppoCode', { value: 'test' });
  });

  it('should handle errors gracefully', async () => {
    getDefaultLocaleData.mockRejectedValue(new Error('Failed to fetch data'));

    await expect(formatPageController.handler(request, h)).rejects.toThrow('Failed to fetch data');
  });

  // Add more tests as needed
});
