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
      const searchInput = request?.yar?.get('countrySearchQuery')
      const searchValue = searchInput?.value
      const searchQuery = request.yar?.get('searchQuery')
      if (searchValue) {
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        return h.view('plant-health/country-search/format', {
          pageTitle: 'Format',
          heading: 'Format',
          getHelpSection,
          mainContent,
          countrySearchQuery,
          searchQuery
        })
      } else {
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const searchQuery = request.yar?.get('searchQuery')
        if (request.query.countrySearchQuery === '') {
          const errorData = getDefaultLocaleData('country-search')
          const errorSection = errorData?.errors
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.searchErrorListText1 +
              request.yar?.get('searchQuery').value +
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
          pageTitle: 'Country Search',
          heading: 'Country Search',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { countrySearchController }
