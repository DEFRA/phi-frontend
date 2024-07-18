import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const plantDetailsPageController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('format')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection

      let radiobuttonValue
      request.yar.set('searchQuery', {
        value: decodeURI(request.yar?.get('searchQuery')?.value)
      })
      request.yar.set('fullSearchQuery', {
        value: decodeURI(request.yar?.get('fullSearchQuery')?.value)
      })
      request.yar.set('countrySearchQuery', {
        value: request.yar?.get('countrySearchQuery')?.value
      })
      request.yar.set('hostRef', {
        value: request.yar?.get('hostRef')?.value
      })
      request.yar.set('eppoCode', {
        value: request.yar?.get('eppoCode')?.value
      })
      request.yar.set('commonName', {
        value: request.yar?.get('fullSearchQuery').match(/\[(.*?)\]/)
      })
      const hostRef = request?.yar?.get('hostRef')?.value
      const eppoCode = request?.yar?.get('eppoCode')?.value

      if (request.query.format !== undefined) {
        radiobuttonValue = request.query.format
        request.yar.set('format', {
          value: radiobuttonValue
        })
        const searchQuery = request.yar?.get('searchQuery')
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const formatData = await getDefaultLocaleData('format')
        const mainContent = formatData?.mainContent
        const getHelpSection = formatData?.getHelpSection

        return h.view('plant-health/plant-details/index', {
          pageTitle:
            searchQuery.value +
            ' — Check plant health information and import rules — GOV.UK',
          heading: 'Plant Details',
          getHelpSection,
          hostRef,
          eppoCode,
          countrySearchQuery,
          fullSearchQuery,
          mainContent,
          searchQuery
        })
      } else {
        request.yar.set('errors', '')
        request.yar.set('errorMessage', '')
        request.yar.set('errorMessageRadio', '')
        radiobuttonValue = request?.yar?.get('format')
        const errorData = await getDefaultLocaleData('format')
        const errorSection = errorData?.errors
        const searchQuery = request.yar?.get('searchQuery')
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const hostRef = request?.yar?.get('hostRef')?.value
        const eppoCode = request?.yar?.get('eppoCode')?.value
        setErrorMessage(
          request,
          errorSection.titleText,
          errorSection.formatPageErrorListText1 +
            ' ' +
            searchQuery?.value +
            ' ' +
            errorSection.formatPageErrorListText2
        )
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/plant-details/index', {
          mainContent,
          getHelpSection,
          radiobuttonValue,
          countrySearchQuery,
          searchQuery,
          hostRef,
          eppoCode,
          fullSearchQuery,
          pageTitle:
            searchQuery.value +
            ' — Check plant health information and import rules — GOV.UK',
          heading: 'Format',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { plantDetailsPageController }
