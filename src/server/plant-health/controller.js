import { getDefaultLocaleData } from '../localisation'
const plantHealthController = {
  handler: async (request, h) => {
    const data = await getDefaultLocaleData('plant-health')
    const mainContent = data?.mainContent
    const getHelpSection = data?.getHelpSection

    if (request != null) {
      const previousURL = request?.info?.referrer
      if (
        request.query?.findanotherpest === 'true' ||
        previousURL ===
          'https://www.gov.uk/guidance/check-plant-health-information-and-import-rules'
      ) {
        request.yar.set('purposeOfVisitRadiooption', null)
        request.yar.set('importConfirmationRadiooption', null)
        request.yar.set('searchQuery', null)
        request.yar.set('fullSearchQuery', null)
        request.yar.set('hostRef', null)
        request.yar.set('cslRef', null)
        request.yar.set('countrySearchQuery', null)
        request.yar.set('format', null)
        request.yar.set('pestsearchQuery', null)
        request.yar.set('pestFullSearchQuery', null)
      }
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('errorMessageRadio', '')
      const radiooption = request?.yar?.get('purposeOfVisitRadiooption')
      const radiobuttonValue = radiooption?.purposeOfVisit
      return h.view('plant-health/index', {
        mainContent,
        getHelpSection,

        pageTitle:
          'What do you want to find out? — Check plant health information and import rules — GOV.UK',
        heading: 'Plant',
        radiobuttonValue
      })
    }
  }
}

export { plantHealthController }
