import { homeController } from '~/src/server/home/controller'
import { getDefaultLocaleData } from '../localisation'

jest.mock('../localisation')

describe('homeController', () => {
  let request, h

  beforeEach(() => {
    request = {
      yar: {
        set: jest.fn()
      }
    }
    h = {
      view: jest.fn()
    }
  })

  it('should set cookies to null and render the home view with correct data', async () => {
    const mockData = {
      govukheading: 'Heading',
      govukcaption: 'Caption',
      govukbodytitle: 'Body Title',
      buttonText: 'Start Now',
      publishedSection: 'Published Section',
      appliesToSection: 'Applies To Section',
      textBeforeStartNowSection: 'Text Before Start Now',
      textAfterStartNowSection: 'Text After Start Now',
      relatedContentSection: 'Related Content Section',
      getHelpSection: 'Get Help Section'
    }

    getDefaultLocaleData.mockResolvedValue(mockData)

    await homeController.handler(request, h)

    expect(request.yar.set).toHaveBeenCalledWith(
      'purposeOfVisitRadiooption',
      null
    )
    expect(request.yar.set).toHaveBeenCalledWith(
      'importConfirmationRadiooption',
      null
    )
    expect(request.yar.set).toHaveBeenCalledWith('searchQuery', null)
    expect(request.yar.set).toHaveBeenCalledWith('countrySearchQuery', null)
    expect(request.yar.set).toHaveBeenCalledWith('format', null)

    expect(h.view).toHaveBeenCalledWith('home/index', {
      govukCaption: 'Caption',
      govukHeading: 'Heading',
      govukBodyTitle: 'Body Title',
      buttonText: 'Start Now',
      publishedSection: 'Published Section',
      appliesToSection: 'Applies To Section',
      textBeforeStartNowSection: 'Text Before Start Now',
      textAfterStartNowSection: 'Text After Start Now',
      relatedContentSection: 'Related Content Section',
      getHelpSection: 'Get Help Section',
      pageTitle: 'Check plant health information and import rules — GOV.UK',
      heading: '',
      breadcrumbs: [
        { text: 'Home', href: '/' },
        { text: 'Environment', href: '/' },
        { text: 'Animal and plant health', href: '/' }
      ]
    })
  })
})
