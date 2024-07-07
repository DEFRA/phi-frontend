import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const searchPageController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('search')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('fullSearchQuery', {
        value: decodeURI(request.query.searchQuery)
      })
      request.yar.set('searchQuery', {
        value: decodeURI(
          request.query.searchQuery?.replace(/ *\([^)]*\) */g, '')
        )
      })
      request.yar.set('hostRef', {
        value: request.query.hostRef
      })
      request.yar.set('eppoCode', {
        value: request.query.eppoCode
      })
      const frontendUrl = config.get('frontendUrl')
      const searchInput = request?.yar?.get('searchQuery')
      const searchValue = searchInput?.value
      const hostRef = request?.yar?.get('hostRef')?.value
      const eppoCode = request?.yar?.get('eppoCode')?.value
      if (searchValue && hostRef) {
        const searchQuery = request.yar?.get('searchQuery')
        const fullSearchQuery = request.yar.get('fullSearchQuery')
        const data = await getDefaultLocaleData('country-search')
        const mainContent = data?.mainContent
        const getHelpSection = data?.getHelpSection
        const countrySearchQuery = request.yar.get('countrySearchQuery')
        return h.view('plant-health/country-search/index', {
          pageTitle: 'Import from country selection',
          heading: 'Country',
          getHelpSection,
          mainContent,
          searchQuery,
          countrySearchQuery,
          fullSearchQuery,
          hostRef,
          eppoCode,
          frontendUrl
        })
      } else {
        const searchQuery = request.yar?.get('searchQuery')
        const hostRef = request?.yar?.get('hostRef')?.value
        if (request.query.searchQuery === '' || hostRef === '') {
          const errorData = await getDefaultLocaleData('search')
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
          pageTitle: 'Plant search',
          heading: 'Search',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { searchPageController }
