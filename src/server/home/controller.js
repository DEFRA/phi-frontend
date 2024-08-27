import { getDefaultLocaleData } from '../localisation'
const homeController = {
  handler: async (request, h) => {
    // ========== ========== ========== ========== ==========
    // set null if there are any
    // cookies on click of start now button
    // ========== ========== ========== ========== ==========
    request.yar.set('purposeOfVisitRadiooption', null)
    request.yar.set('importConfirmationRadiooption', null)
    request.yar.set('searchQuery', null)
    request.yar.set('countrySearchQuery', null)
    request.yar.set('format', null)
    request.yar.set('pestsearchQuery', null)

    const data = await getDefaultLocaleData('home')
    const govukHeading = data?.govukheading
    const govukCaption = data?.govukcaption
    const govukBodyTitle = data?.govukbodytitle
    const buttonText = data?.buttonText
    const publishedSection = data?.publishedSection
    const appliesToSection = data?.appliesToSection
    const textBeforeStartNowSection = data?.textBeforeStartNowSection
    const textAfterStartNowSection = data?.textAfterStartNowSection
    const relatedContentSection = data?.relatedContentSection
    const getHelpSection = data?.getHelpSection

    return h.view('home/index', {
      govukCaption,
      govukHeading,
      govukBodyTitle,
      buttonText,
      publishedSection,
      appliesToSection,
      textBeforeStartNowSection,
      textAfterStartNowSection,
      relatedContentSection,
      getHelpSection,
      pageTitle: 'Check plant health information and import rules — GOV.UK',
      heading: '',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Environment',
          href: '/'
        },
        {
          text: 'Animal and plant health',
          href: '/'
        }
      ]
    })
  }
}

export { homeController }
