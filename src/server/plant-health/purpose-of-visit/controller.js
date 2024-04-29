import { getDefaultLocaleData } from '~/src/server/localisation'
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
          pageTitle: 'Plant',
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
          pageTitle: 'Plant',
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
          request.yar.set('errors', {
            errors: {
              titleText: errorSection.titleText,
              errorList: [
                {
                  text: errorSection.purposeOfVisitErrorListText,
                  href: '#itembox'
                }
              ]
            }
          })
          request.yar.set('errorMessage', {
            errorMessage: { text: errorSection.purposeOfVisitErrorListText }
          })
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/index', {
          mainContent,
          getHelpSection,
          pageTitle: 'Plant',
          heading: 'Plant',
          radiobuttonValue,
          errors: errors?.errors,
          errorMessage: errorMessage?.errorMessage,
          errorMessageRadio: errorMessage?.errorMessage
        })
      }
    }
  }
}

export { purposeOfVisitController }
