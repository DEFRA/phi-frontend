import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const formatPageController = {
  handler: (request, h) => {
    if (request != null) {
      const data = getDefaultLocaleData('format')
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
      if (request.query.format !== undefined) {
        radiobuttonValue = request.query.format
        request.yar.set('format', {
          value: radiobuttonValue
        })
        const searchQuery = request.yar?.get('searchQuery')
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const formatData = getDefaultLocaleData('format')
        const mainContent = formatData?.mainContent
        const getHelpSection = formatData?.getHelpSection
        return h.view('plant-health/format/index', {
          pageTitle: 'Format',
          heading: 'Format',
          getHelpSection,
          radiobuttonValue,
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
        const errorData = getDefaultLocaleData('format')
        const errorSection = errorData?.errors
        const searchQuery = request.yar?.get('searchQuery')
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
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
        return h.view('plant-health/format/index', {
          mainContent,
          getHelpSection,
          radiobuttonValue,
          countrySearchQuery,
          searchQuery,
          fullSearchQuery,
          pageTitle: 'Format',
          heading: 'Format',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { formatPageController }
