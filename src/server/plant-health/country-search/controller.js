import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const countrySearchController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('country-search')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      let invalidCountrySearchEntry = false
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      if (request.query?.countrySearchQuery?.length > 0) {
        request.yar.set('countrySearchQuery', {
          value: decodeURI(request.query.countrySearchQuery)
        })
      } else {
        if (
          decodeURI(request.query.autocompleteCountrySearchQuery) !==
          'No results found'
        ) {
          request.yar.set('countrySearchQuery', {
            value: decodeURI(request.query.autocompleteCountrySearchQuery)
          })
        }
      }
      if (request.query?.countryCode?.length > 0) {
        request.yar.set('countryCode', {
          value: request.query.countryCode
        })
      } else {
        if (
          request.query?.countryCodeOne?.length > 0 &&
          request.query?.countryCodeOne !== null
        ) {
          request.yar.set('countryCode', {
            value: request.query.countryCodeOne
          })
        }
      }
      request.yar.set('fullSearchQuery', {
        value: decodeURI(request.query.fullSearchQuery)
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
      request.yar.set('format', {
        value: request?.yar?.get('format')?.value
      })
      const hostRef = request?.yar?.get('hostRef')?.value
      const eppoCode = request?.yar?.get('eppoCode')?.value
      const searchInput = request?.yar?.get('countrySearchQuery')
      const autoCompleteValue = request?.yar?.get(
        'autocompleteCountrySearchQuery'
      )?.value
      const radiobuttonValue = request?.yar?.get('format')?.value
      const searchQuery = request.yar?.get('searchQuery')
      const countryCode = request?.yar?.get('countryCode')?.value
      if (
        searchInput?.value &&
        autoCompleteValue !== '' &&
        countryCode &&
        countryCode !== 'null'
      ) {
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const data = await getDefaultLocaleData('format')
        const mainContent = data?.mainContent
        const getHelpSection = data?.getHelpSection
        return h.view('plant-health/format/index', {
          pageTitle:
            'Which format of ' +
            searchQuery.value +
            ' are you importing? — Check plant health information and import rules — GOV.UK',
          heading: 'Format',
          getHelpSection,
          mainContent,
          countryCode,
          hostRef,
          eppoCode,
          radiobuttonValue,
          fullSearchQuery,
          countrySearchQuery,
          searchQuery
        })
      } else {
        let invalidSearchEntry
        const searchQuery = request.yar?.get('searchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const countryCode = request?.yar?.get('countryCode')?.value
        const hostRef = request?.yar?.get('hostRef')?.value
        const eppoCode = request?.yar?.get('eppoCode')?.value
        if (
          request.query.emptyCountrySearchQuery === 'true' ||
          (request.query.emptyCountrySearchQuery === '' &&
            request.query.autocompleteCountrySearchQuery !== '')
        ) {
          invalidSearchEntry = request.query.autocompleteCountrySearchQuery
          request.yar.set('countrySearchQuery', {
            value: ''
          })
          invalidCountrySearchEntry = true
        } else if (
          request.query.countrySearchQuery === '' ||
          request.query.emptyCountrySearchQuery === '' ||
          countryCode === 'null'
        ) {
          const errorData = await getDefaultLocaleData('country-search')
          const errorSection = errorData?.errors
          setErrorMessage(
            request,
            errorSection?.titleText,
            errorSection?.searchErrorListText1 +
              ' ' +
              request.yar?.get('searchQuery')?.value +
              ' ' +
              errorSection?.searchErrorListText2
          )
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        let pageTitle
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        if (errors?.list?.errorList?.length > 0) {
          pageTitle =
            'Error:  Which country, state or territory are you importing ' +
            searchQuery.value +
            ' from? — Check plant health information and import rules — GOV.UK'
        } else if (invalidCountrySearchEntry) {
          pageTitle =
            'Search results for ' +
            invalidSearchEntry +
            ' — Check plant health information and import rules — GOV.UK'
        } else {
          pageTitle =
            'Which country, state or territory are you importing ' +
            searchQuery?.value +
            ' from? — Check plant health information and import rules — GOV.UK'
        }
        return h.view('plant-health/country-search/index', {
          mainContent,
          getHelpSection,
          countrySearchQuery,
          searchQuery,
          countryCode,
          invalidSearchEntry,
          hostRef,
          eppoCode,
          fullSearchQuery,
          invalidCountrySearchEntry,
          pageTitle,
          heading: 'Country Search',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { countrySearchController }
