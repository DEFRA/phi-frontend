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
   
    h = {
      view: jest.fn()
    };
    config.get = jest.fn().mockReturnValue('http://localhost');
  });

  it('should handle request with searchQuery and hostRef', async () => {
    request = {
      yar: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue({ value: 'test' })
      },
      query: {hostRef:'testHostRef',
searchQuery : 'testSearch',
fullSearchQuery :'testSearch',
autocompleteSearchQuery : 'testautocompleteSearch'
      }
    };
    // request.query.searchQuery = 'testSearch';
    // request.query.fullSearchQuery = 'testSearch';
    // request.query.hostRef = 'testHostRef';
    // request.query.autocompleteSearchQuery = 'testautocompleteSearch';
    // getDefaultLocaleData.mockResolvedValue({
    //   mainContent: 'mainContent',
    //   getHelpSection: 'getHelpSection'
    // });

    await searchPageController.handler(request, h);

    // expect(request.yar.set).toHaveBeenCalledWith('fullSearchQuery', { value: 'testSearch' });
    // expect(request.yar.set).toHaveBeenCalledWith('searchQuery', { value: 'testSearch' });
    // expect(request.yar.set).toHaveBeenCalledWith('autocompleteSearchQuery', { value: 'testautocompleteSearch' });
    // expect(request.yar.set).toHaveBeenCalledWith('hostRef', { value: 'undefined' });
    expect(h.view).toHaveBeenCalledWith('plant-health/country-search/index', expect.objectContaining({
     countryCode: "test", 
     countrySearchQuery: {"value": "test"}, 
     eppoCode: "test", 
     frontendUrl: "http://localhost", 
     fullSearchQuery: {"value": "test"}, 
     getHelpSection: undefined, 
     heading: "Country",
      hostRef: "test", 
      mainContent: undefined,
       pageTitle: "Which country, state or territory are you importing test from? — Check plant health information and import rules — GOV.UK",
        searchQuery: {"value": "test"}
    }));
  });

  it('should handle request without searchQuery or hostRef', async () => {
    request = {
      yar: {
        set: jest.fn().mockReturnValue({ errors: { titleText: 'Error Title',  searchErrorListText: "Enter the name of the plant, plant product or seeds you are importing"} }),
        get: jest.fn()
      },
      query: {}
    };
    request.query.autocompleteSearchQuery = '';
    request.query.hostRef = undefined;
    // request.yar.get.mockReturnValueOnce({ list: { errorList:'test'  } });
    // request.yar.get.mockReturnValueOnce('errorMessage');
   // getDefaultLocaleData.mockReturnValueOnce({ errors: { titleText: 'Error Title',  searchErrorListText: "Enter the name of the plant, plant product or seeds you are importing"} });
    // getDefaultLocaleData.mockResolvedValue({
    //   mainContent: 'mainContent',
    //   getHelpSection: 'getHelpSection',
    //   errors: {
    //     titleText: 'Error Title',
    //     searchErrorListText: 'Error Text'
    //   }
    // });
    let errorSection;
    await searchPageController.handler(request, h);
     errorSection = errorSection || {  titleText: 'Error Title',  searchErrorListText: "Enter the name of the plant, plant product or seeds you are importing" };
    //  expect (setErrorMessage).toHaveBeenCalledWith(
    //   request,
    //   'Error Title',
    //   'Enter the name of the plant, plant product or seeds you are importing'
    // );
    //expect(setErrorMessage).toHaveBeenCalledWith(request, 'Error Title', 'Error List Text');
    expect(h.view).toHaveBeenCalledWith('plant-health/search/index', expect.objectContaining({
     errorMessage: undefined,
      errors: undefined, 
      frontendUrl: "http://localhost",
       getHelpSection: undefined, 
       heading: "Search", 
       mainContent: undefined,
        pageTitle: "What plant, plant product or seeds are you importing? — Check plant health information and import rules — GOV.UK", 
        searchQuery: undefined
    }));
  });
});
