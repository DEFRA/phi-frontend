import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const importConfirmationController = {
  handler: (request, h) => {
    if (request != null) {
      const data = getDefaultLocaleData('import-confirmation')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection
      const serviceUnavailablePage = data?.serviceUnavailablePage

      let radiobuttonValue
      if (request.query.whereareyouimportinginto === 'gb') {
        radiobuttonValue = request.query.Whereareyouimportinginto
        request.yar.set('importConfirmationRadiooption', {
          whereareyouimportinginto: 'gb'
        })
        if (request.query.searchQuery) {
          request.yar.set('searchQuery', {
            value: request.query.searchQuery
          })
        }
        const searchQuery = request.yar?.get('searchQuery')
        const searchData = getDefaultLocaleData('search')
        const mainContent = searchData?.mainContent
        const getHelpSection = searchData?.getHelpSection
        const frontendUrl = config.get('frontendUrl')
        return h.view('plant-health/search/index', {
          pageTitle: 'Search',
          heading: 'Search',
          getHelpSection,
          mainContent,
          frontendUrl,
          searchQuery
        })
      } else if (request.query.whereareyouimportinginto === 'ni') {
        request.yar.set('importConfirmationRadiooption', {
          whereareyouimportinginto: 'ni'
        })
        return h.view(
          'plant-health/import-confirmation/service-unavailable.njk',
          {
            serviceUnavailablePage,
            getHelpSection,
            pageTitle: 'ImportConfirmation',
            heading: 'ImportConfirmation'
          }
        )
      } else if (request.query.searchQuery) {
        request.yar.set('searchQuery', {
          value: decodeURI(request.query.searchQuery)
        })
        const searchQuery = request.yar?.get('searchQuery')
        return h.view('plant-health/import-confirmation/country', {
          pageTitle: 'Country',
          heading: 'Country',
          getHelpSection,
          searchQuery
        })
      } else {
        request.yar.set('errors', '')
        request.yar.set('errorMessage', '')
        request.yar.set('errorMessageRadio', '')
        const radiooption = request?.yar?.get('importConfirmationRadiooption')
        radiobuttonValue = radiooption?.whereareyouimportinginto
        const errorData = getDefaultLocaleData('import-confirmation')
        const errorSection = errorData?.errors

        if (!radiobuttonValue) {
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.importConfirmationErrorListText
          )
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/import-confirmation/index', {
          mainContent,
          getHelpSection,
          radiobuttonValue,
          pageTitle: 'ImportConfirmation',
          heading: 'ImportConfirmation',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { importConfirmationController }
