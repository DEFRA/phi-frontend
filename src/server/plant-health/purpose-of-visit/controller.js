import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const purposeOfVisitController = {
  handler: (request, h) => {
    const data = getDefaultLocaleData('purpose-of-visit')
    const serviceUnavailablePage = data?.serviceUnavailablePage
    const mainContent = data?.mainContent
    const getHelpSection = data?.getHelpSection

    if (request != null) {
      let radiobuttonValue
      if (request.query.whatdoyouwanttofind === 'importrules') {
        request.yar.set('purposeOfVisitRadiooption', {
          purposeOfVisit: 'importrules'
        })
        const radiooption = request?.yar?.get('importConfirmationRadiooption')
        radiobuttonValue = radiooption?.whereareyouimportinginto
        return h.view('plant-health/import-confirmation/index', {
          mainContent,
          getHelpSection,
          radiobuttonValue,
          pageTitle: 'Import to country selection',
          heading: 'Plant'
        })
      } else if (request.query.whatdoyouwanttofind === 'pest') {
        request.yar.set('purposeOfVisitRadiooption', {
          purposeOfVisit: 'pest'
        })
        const plantHealthdata = getDefaultLocaleData('plant-health')
        const getHelpSection = plantHealthdata?.getHelpSection
        return h.view('plant-health/service-unavailable.njk', {
          getHelpSection,
          serviceUnavailablePage,
          pageTitle: 'NI not supported',
          heading: 'Plant'
        })
      } else {
        const plantHealthdata = getDefaultLocaleData('plant-health')
        const mainContent = plantHealthdata?.mainContent
        const getHelpSection = plantHealthdata?.getHelpSection
        const errorData = getDefaultLocaleData('purpose-of-visit')
        const errorSection = errorData?.errors
        const radiooption = request?.yar?.get('purposeOfVisitRadiooption')
        radiobuttonValue = radiooption?.purposeOfVisit

        if (!radiobuttonValue) {
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.purposeOfVisitErrorListText
          )
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/index', {
          mainContent,
          getHelpSection,
          pageTitle: 'Select journey',
          heading: 'Plant',
          radiobuttonValue,
          errors,
          errorMessage
        })
      }
    }
  }
}

export { purposeOfVisitController }
