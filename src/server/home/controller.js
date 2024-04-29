import { getDefaultLocaleData } from '../localisation'
const homeController = {
  handler: (request, h) => {
    // ========== ========== ========== ========== ==========
    // set null if there are any
    // cookies on click of start now button
    // ========== ========== ========== ========== ==========
    request.yar.set('purposeOfVisitRadiooption', null)
    request.yar.set('importConfirmationRadiooption', null)

    const data = getDefaultLocaleData('home')
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
      pageTitle: 'Home',
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
