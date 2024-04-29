import { getDefaultLocaleData } from '../localisation'
const plantHealthController = {
  handler: (request, h) => {
    const data = getDefaultLocaleData('plant-health')
    const mainContent = data?.mainContent
    const getHelpSection = data?.getHelpSection

    if (request != null) {
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('errorMessageRadio', '')
      const radiooption = request?.yar?.get('purposeOfVisitRadiooption')
      const radiobuttonValue = radiooption?.purposeOfVisit
      return h.view('plant-health/index', {
        mainContent,
        getHelpSection,
        pageTitle: 'Plant',
        heading: 'Plant',
        radiobuttonValue
      })
    }
  }
}

export { plantHealthController }
