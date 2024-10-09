import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'

const searchPageController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('search')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      let invalidSearchEntry = false

      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')

      if (request.query?.searchQuery?.length > 0) {
        request.yar.set('fullSearchQuery', {
          value: decodeURI(request.query.fullSearchQuery)
        })
        request.yar.set('searchQuery', {
          value: decodeURI(
            request.query.searchQuery?.replace(/ *\([^)]*\) */g, '')
          )
        })
      } else {
        if (
          decodeURI(request.query.autocompleteSearchQuery) !==
          'No results found'
        ) {
          request.yar.set('fullSearchQuery', {
            value: decodeURI(request.query.autocompleteSearchQuery)
          })
          request.yar.set('searchQuery', {
            value: decodeURI(
              request.query.autocompleteSearchQuery?.replace(
                / *\([^)]*\) */g,
                ''
              )
            )
          })
        }
      }
      if (request.query?.hostRef?.length > 0) {
        request.yar.set('hostRef', {
          value: parseInt(request.query.hostRef)
        })
      } else {
        request.yar.set('hostRef', {
          value: parseInt(request.query.hostReff)
        })
      }

      request.yar.set('eppoCode', {
        value: request.query.eppoCode
      })
      request.yar.set('countryCode', {
        value: request.yar?.get('countryCode')?.value
      })
      const frontendUrl = config.get('frontendUrl')
      const searchInput = request?.yar?.get('searchQuery')
      const searchValue = searchInput?.value
      const hostRef = request?.yar?.get('hostRef')?.value
      const eppoCode = request?.yar?.get('eppoCode')?.value
      const fullSearchQuery = request.yar.get('fullSearchQuery')
      if (searchValue && hostRef) {
        const searchQuery = request.yar?.get('searchQuery')
        const data = await getDefaultLocaleData('country-search')
        const mainContent = data?.mainContent
        const getHelpSection = data?.getHelpSection
        const countrySearchQuery = request.yar.get('countrySearchQuery')
        const countryCode = request.yar.get('countryCode').value
        return h.view('plant-health/country-search/index', {
          pageTitle:
            'Which country, state or territory are you importing ' +
            searchQuery.value +
            ' from? — Check plant health information and import rules — GOV.UK',
          heading: 'Country',
          getHelpSection,
          mainContent,
          countryCode,
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
        if (!searchQuery?.value) {
          const errorData = await getDefaultLocaleData('search')
          const errorSection = errorData?.errors
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.searchErrorListText
          )
        } else if (searchQuery?.value && !hostRef) {
          invalidSearchEntry = true
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        let pageTitle
        if (errors?.list?.errorList?.length > 0) {
          pageTitle =
            'Error: What plant, plant product or seeds are you importing? — Check plant health information and import rules — GOV.UK'
        } else if (invalidSearchEntry) {
          pageTitle =
            'Search results for ' +
            searchQuery.value +
            ' — Check plant health information and import rules — GOV.UK'
        } else {
          pageTitle =
            'What plant, plant product or seeds are you importing? — Check plant health information and import rules — GOV.UK'
        }
        return h.view('plant-health/search/index', {
          mainContent,
          getHelpSection,
          searchQuery,
          frontendUrl,
          pageTitle,
          invalidSearchEntry,
          heading: 'Search',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { searchPageController }
