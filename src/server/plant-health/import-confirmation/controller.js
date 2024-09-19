import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const importConfirmationController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('import-confirmation')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      const serviceUnavailablePage = data?.serviceUnavailablePage

      let radiobuttonValue
      if (request.query.whereareyouimportinginto === 'gb') {
        radiobuttonValue = request.query.Whereareyouimportinginto
        request.yar.set('importConfirmationRadiooption', {
          whereareyouimportinginto: 'gb'
        })
        if (request.query.searchQuery) {
          request.yar.set('searchQuery', {
            value: request.query.searchQuery
          })
        }
        const searchQuery = request.yar?.get('searchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const searchData = await getDefaultLocaleData('search')
        const mainContent = searchData?.mainContent
        const getHelpSection = searchData?.getHelpSection
        const frontendUrl = config.get('frontendUrl')
        const hostRef = request.yar.get('hostRef')?.value
        const eppoCode = request.yar.get('eppoCode')?.value
        return h.view('plant-health/search/index', {
          pageTitle:
            'What plant, plant product or seeds are you importing? — Check plant health information and import rules — GOV.UK',
          heading: 'Search',
          getHelpSection,
          hostRef,
          eppoCode,
          mainContent,
          frontendUrl,
          searchQuery,
          fullSearchQuery
        })
      } else if (request.query.whereareyouimportinginto === 'ni') {
        request.yar.set('importConfirmationRadiooption', {
          whereareyouimportinginto: 'ni'
        })
        return h.view(
          'plant-health/import-confirmation/service-unavailable.njk',
          {
            serviceUnavailablePage,
            getHelpSection,
            pageTitle:
              'This service does not include import and plant health information for Northern Ireland — Check plant health information and import rules — GOV.UK',
            heading: 'ImportConfirmation'
          }
        )
      } else {
        request.yar.set('errors', '')
        request.yar.set('errorMessage', '')
        request.yar.set('errorMessageRadio', '')
        const radiooption = request?.yar?.get('importConfirmationRadiooption')
        radiobuttonValue = radiooption?.whereareyouimportinginto
        const errorData = await getDefaultLocaleData('import-confirmation')
        const errorSection = errorData?.errors

        if (!radiobuttonValue) {
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.importConfirmationErrorListText
          )
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        let pageTitle
        if (errors?.list?.errorList?.length > 0) {
          pageTitle =
            'Error: Where are you importing your plant, plant product or seeds to? — Check plant health information and import rules — GOV.UK'
        } else {
          pageTitle =
            'Where are you importing your plant, plant product or seeds to? — Check plant health information and import rules — GOV.UK'
        }
        return h.view('plant-health/import-confirmation/index', {
          mainContent,
          getHelpSection,
          radiobuttonValue,
          pageTitle,
          heading: 'ImportConfirmation',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { importConfirmationController }
