import { getDefaultLocaleData } from '../localisation'
const plantHealthController = {
  handler: (request, h) => {
    const data = getDefaultLocaleData('plant-health')
    const mainContent = data?.mainContent
    const getHelpSection = data?.getHelpSection

    if (request != null) {
      if (request.query.findanotherpest === 'true') {
        request.yar.set('purposeOfVisitRadiooption', null)
        request.yar.set('importConfirmationRadiooption', null)
        request.yar.set('searchQuery', null)
        request.yar.set('countrySearchQuery', null)
        request.yar.set('format', null)
      }
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('errorMessageRadio', '')
      const radiooption = request?.yar?.get('purposeOfVisitRadiooption')
      const radiobuttonValue = radiooption?.purposeOfVisit
      return h.view('plant-health/index', {
        mainContent,
        getHelpSection,
        pageTitle: 'Select journey',
        heading: 'Plant',
        radiobuttonValue
      })
    }
  }
}

export { plantHealthController }
