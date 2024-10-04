import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
const pestDetailsPageController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('pest-details')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection

      let radiobuttonValue
      request.yar.set('searchQuery', {
        value: decodeURI(request.yar?.get('searchQuery')?.value)
      })
      request.yar.set('fullSearchQuery', {
        value: decodeURI(request.yar?.get('fullSearchQuery')?.value)
      })
      request.yar.set('pestSearchQuery', {
        value: request.yar?.get('pestSearchQuery')?.value
      })
      request.yar.set('cslRef', {
        value: request.yar?.get('cslRef')?.value
      })
      request.yar.set('eppoCode', {
        value: request.yar?.get('eppoCode')?.value
      })
      request.yar.set('commonName', {
        value: request.yar?.get('fullSearchQuery')?.match(/\[(.*?)\]/)
      })
      const cslRef = request?.yar?.get('cslRef')?.value

      const eppoCode = request?.yar?.get('eppoCode')?.value

      if (request.query.format !== undefined) {
        radiobuttonValue = request.query.format
        request.yar.set('format', {
          value: radiobuttonValue
        })
        const searchQuery = request.yar?.get('searchQuery')
        const pestSearchQuery = request.yar?.get('pestSearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')

        return h.view('plant-health/pest-details/index', {
          pageTitle: 'Check plant health information and import rules — GOV.UK',
          heading: 'pest-details-page',
          getHelpSection,
          cslRef,
          eppoCode,
          pestSearchQuery,
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
        const pestSearchQuery = request.yar?.get('pestSearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        setErrorMessage(
          request,
          errorSection?.titleText,
          errorSection?.formatPageErrorListText1 +
            ' ' +
            searchQuery?.value +
            ' ' +
            errorSection?.formatPageErrorListText2
        )
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/pest-details/index', {
          mainContent,
          getHelpSection,
          radiobuttonValue,
          pestSearchQuery,
          searchQuery,

          fullSearchQuery,
          pageTitle:
            'Error: Check plant health information and import rules — GOV.UK',
          heading: 'Format',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { pestDetailsPageController }
