import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const searchPageController = {
  handler: (request, h) => {
    if (request != null) {
      const data = getDefaultLocaleData('search')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('fullSearchQuery', {
        value: decodeURI(request.query.searchQuery)
      })
      request.yar.set('searchQuery', {
        value: decodeURI(
          request.query.searchQuery.replace(/ *\([^)]*\) */g, '')
        )
      })
      const frontendUrl = config.get('frontendUrl')
      const searchInput = request?.yar?.get('searchQuery')
      const searchValue = searchInput?.value
      if (searchValue) {
        const searchQuery = request.yar?.get('searchQuery')
        const fullSearchQuery = request.yar.get('fullSearchQuery')
        const data = getDefaultLocaleData('country-search')
        const mainContent = data?.mainContent
        const getHelpSection = data?.getHelpSection
        const countrySearchQuery = request.yar.get('countrySearchQuery')
        return h.view('plant-health/country-search/index', {
          pageTitle: 'Country',
          heading: 'Country',
          getHelpSection,
          mainContent,
          searchQuery,
          countrySearchQuery,
          fullSearchQuery,
          frontendUrl
        })
      } else {
        const searchQuery = request.yar?.get('searchQuery')
        if (request.query.searchQuery === '') {
          const errorData = getDefaultLocaleData('search')
          const errorSection = errorData?.errors
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.searchErrorListText
          )
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/search/index', {
          mainContent,
          getHelpSection,
          searchQuery,
          frontendUrl,
          pageTitle: 'Search',
          heading: 'Search',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { searchPageController }
