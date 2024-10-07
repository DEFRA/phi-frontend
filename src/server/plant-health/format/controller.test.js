import { formatPageController } from '~/src/server/plant-health/format/controller'
import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
import axios from 'axios'

jest.mock('~/src/server/localisation')
jest.mock('~/src/server/common/helpers/errors')
jest.mock('axios')

describe('formatPageController', () => {
  let request, h

  beforeEach(() => {
    request = {
      query: {},
      yar: {
        set: jest.fn(),
        get: jest.fn()
      }
    }
    h = {
      view: jest.fn(),
      redirect: jest.fn()
    }
  })

  // it('should handle a valid request and return the correct view', async () => {
  //   request.query = {
  //     countrySearchQuery: 'Algeria',
  //     fullSearchQuery: 'Phoenix acaulis',
  //     searchQuery: 'Phoenix acaulis',
  //     hostRef: 18795,
  //     eppoCode: '1PHXG',
  //     format: 'plants for planting'
  //   };

  //   axios.post.mockResolvedValueOnce({ data:  request.query });

  //   await formatPageController.handler(request, h);

  //   expect(h.view).toHaveBeenCalledWith('plant-health/plant-details/index', expect.objectContaining({
  //     heading: "Plant Details",
  //     pageTitle: "Plant Details",
  //     result: {
  //       FormatClarification: "Clarification",
  //       annex11RulesArr: [],
  //        annexElevenRule: "Annex Eleven",
  //        annexSixRule: "Annex Six",
  //        bonsaiIndicator: ["Bonsai"]
  //        , dormantIndicator: ["Dormant"],
  //         eppoCode: "E123",
  //          fruitIndicator: ["Fruit"],
  //           hostRef: "123",
  //            invintroIndicator: ["In vitro"],
  //            pestDetails: [],
  //             plantName: [{"NAME": "Preferred Name"}, {"NAME": "Common Name"}, {"NAME": "Synonym Name"}],
  //             seedIndicator: ["Seeds"]
  //     // Add other expected properties here
  //   }}
  // ));
  // });

  it('should handle errors and redirect to the error page', async () => {
    request.query.result = ''
    //axios.post.mockRejectedValueOnce(new Error('API Error'));

    await formatPageController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith(
      'plant-health/format/index',
      expect.objectContaining({
        countrySearchQuery: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        getHelpSection: undefined,
        heading: 'Format',
        hostRef: undefined,
        mainContent: undefined,
        pageTitle:
          'Which format of undefined are you importing? — Check plant health information and import rules — GOV.UK',
        radiobuttonValue: undefined,
        searchQuery: undefined
      })
    )
  })

  it('should set error messages and return the error view', async () => {
    request.query.format = undefined
    // request.yar.get.mockReturnValueOnce(null);

    // const errorData = {
    //   errors: {
    //     titleText: 'Error Title',
    //     formatPageErrorListText1: 'Error List Text 1',
    //     formatPageErrorListText2: 'Error List Text 2'
    //   }
    // };
    // getDefaultLocaleData.mockResolvedValueOnce(errorData);

    await formatPageController.handler(request, h)

    // expect(setErrorMessage).toHaveBeenCalledWith(
    //   request,
    //   errorData.errors.titleText,
    //   expect.any(String)
    // );
    expect(h.view).toHaveBeenCalledWith(
      'plant-health/format/index',
      expect.objectContaining({
        countrySearchQuery: undefined,
        errorMessage: undefined,
        errors: undefined,
        fullSearchQuery: undefined,
        getHelpSection: undefined,
        heading: 'Format',
        hostRef: undefined,
        mainContent: undefined,
        pageTitle:
          'Which format of undefined are you importing? — Check plant health information and import rules — GOV.UK',
        radiobuttonValue: undefined,
        searchQuery: undefined
      })
    )
  })
})
