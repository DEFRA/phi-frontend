import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const countrySearchController = {
  handler: (request, h) => {
    if (request != null) {
      const data = getDefaultLocaleData('country-search')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('countrySearchQuery', {
        value: decodeURI(request.query.countrySearchQuery)
      })
      request.yar.set('fullSearchQuery', {
        value: decodeURI(request.yar?.get('fullSearchQuery')?.value)
      })
      request.yar.set('searchQuery', {
        value: decodeURI(request.yar?.get('searchQuery')?.value)
      })
      request.yar.set('hostRef', {
        value: request.yar?.get('hostRef')?.value
      })
      request.yar.set('eppoCode', {
        value: request.yar?.get('eppoCode')?.value
      })
      request.yar.set('format', {
        value: decodeURI(request.query.format)
      })
      const hostRef = request?.yar?.get('hostRef')?.value
      const eppoCode = request?.yar?.get('eppoCode')?.value
      const searchInput = request?.yar?.get('countrySearchQuery')
      const searchValue = searchInput?.value
      const radiobuttonValue = request?.yar?.get('format')?.value
      const searchQuery = request.yar?.get('searchQuery')
      if (searchValue) {
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const data = getDefaultLocaleData('format')
        const mainContent = data?.mainContent
        const getHelpSection = data?.getHelpSection
        return h.view('plant-health/format/index', {
          pageTitle: 'Plant format',
          heading: 'Format',
          getHelpSection,
          mainContent,
          hostRef,
          eppoCode,
          radiobuttonValue,
          fullSearchQuery,
          countrySearchQuery,
          searchQuery
        })
      } else {
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const searchQuery = request.yar?.get('searchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        if (request.query.countrySearchQuery === '') {
          const errorData = getDefaultLocaleData('country-search')
          const errorSection = errorData?.errors
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.searchErrorListText1 +
              ' ' +
              request.yar?.get('searchQuery').value +
              ' ' +
              errorSection.searchErrorListText2
          )
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/country-search/index', {
          mainContent,
          getHelpSection,
          countrySearchQuery,
          searchQuery,
          fullSearchQuery,
          pageTitle: 'Import from country selection',
          heading: 'Country Search',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { countrySearchController }
