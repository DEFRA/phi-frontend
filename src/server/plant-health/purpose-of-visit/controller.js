import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const purposeOfVisitController = {
  handler: async (request, h) => {
    const data = await await getDefaultLocaleData('purpose-of-visit')
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
          pageTitle:
            'Where are you importing your plant, plant product or seeds to? — Check plant health information and import rules — GOV.UK',
          heading: 'Plant'
        })
      } else if (request.query.whatdoyouwanttofind === 'pest') {
        if (request.query.pestsearchQuery) {
          request.yar.set('pestsearchQuery', {
            value: request.query.pestsearchQuery
          })
        }
        const pestsearchQuery = request.yar?.get('pestsearchQuery')
        request.yar.set('purposeOfVisitRadiooption', {
          purposeOfVisit: 'pest'
        })
        const cslRef = request.yar.get('cslRef')?.value
        const eppoCode = request.yar.get('eppoCode')?.value

        return h.view('plant-health/pest-search/index.njk', {
          mainContent,
          getHelpSection,
          cslRef,
          eppoCode,
          pestsearchQuery,
          serviceUnavailablePage,
          pageTitle:
            'What pest or disease do you want to find out about? — Check plant health information and import rules — GOV.UK',
          heading: 'Pest'
        })
      } else {
        const plantHealthdata = await getDefaultLocaleData('plant-health')
        const mainContent = plantHealthdata?.mainContent
        const getHelpSection = plantHealthdata?.getHelpSection
        const errorData = await getDefaultLocaleData('purpose-of-visit')
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
          pageTitle:
            'What do you want to find out? — Check plant health information and import rules — GOV.UK',
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
