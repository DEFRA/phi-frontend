import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const axios = require('axios')

const formatPageController = {
  handler: async (request, h) => {
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
      request.yar.set('hostRef', {
        value: request.yar?.get('hostRef')?.value
      })
      request.yar.set('eppoCode', {
        value: request.yar?.get('eppoCode')?.value
      })

      const hostRef = request?.yar?.get('hostRef')?.value

      if (request.query.format !== undefined) {
        let result
        radiobuttonValue = decodeURI(request.query.format)
        request.yar.set('format', {
          value: radiobuttonValue
        })
        const searchQuery = request.yar?.get('searchQuery')
        const countrySearchQuery = request.yar?.get('countrySearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        const plantData = getDefaultLocaleData('plant-details')
        const mainContent = plantData?.mainContent
        const getHelpSection = plantData?.getHelpSection
        const format = request.yar?.get('format')?.value
        let ulIndicatorFlag = false
        if (request.yar?.get('hostRef')?.value) {
          const plantDetails = {
            hostRef: parseInt(request.yar?.get('hostRef')?.value),
            serviceFormat: request.query.format,
            country: request?.yar?.get('countrySearchQuery')?.value
          }
          result = await invokeWorkflowApi(plantDetails)
          if (result.annex11RulesArr?.length > 0) {
            ulIndicatorFlag =
              ulIndicatorFlag ||
              result.annex11RulesArr.some((annex11Rules) => {
                return (
                  annex11Rules.SERVICE_SUBFORMAT_EXCLUDED.split(',').length > 0
                )
              })
          }
          const pestDetails = result.pestDetails
          return h.view('plant-health/plant-details/index', {
            ulIndicatorFlag,
            pageTitle: 'Plant Details',
            heading: 'Plant Details',
            getHelpSection,
            radiobuttonValue,
            hostRef,
            format,
            outcome: result.outcome,
            result,
            annexSixRule: result.annexSixRule,
            annexElevenRule: result.annexElevenRule,
            eppoCode: result.eppoCode,
            preferredName: result.plantName[0].NAME,
            commonNames: result.plantName[1].NAME,
            synonymNames: result.plantName[2].NAME,
            pest_names: pestDetails.map(function (item) {
              return item
            }),
            countrySearchQuery,
            fullSearchQuery,
            mainContent,
            searchQuery
          })
        }

        async function invokeWorkflowApi(payload) {
          try {
            const response = await axios.post(
              config.get('backendApiUrl') + '/workflow',
              { plantDetails: payload }
            )
            return response.data
          } catch (error) {
            return error // Rethrow the error so it can be handled appropriately
          }
        }
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
        const hostRef = request?.yar?.get('hostRef')?.value
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
          hostRef,
          pageTitle: 'Plant format',
          heading: 'Format',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { formatPageController }
