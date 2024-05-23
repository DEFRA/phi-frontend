import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const searchPageController = {
  handler: (request, h) => {
    if (request != null) {
      const data = getDefaultLocaleData('search')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('searchQuery', {
        value: decodeURI(request.query.searchQuery)
      })
      const searchInput = request?.yar?.get('searchQuery')
      const searchValue = searchInput?.value
      if (searchValue) {
        const searchQuery = request.yar?.get('searchQuery')
        return h.view('plant-health/import-confirmation/country', {
          pageTitle: 'Country',
          heading: 'Country',
          getHelpSection,
          mainContent,
          searchQuery
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
