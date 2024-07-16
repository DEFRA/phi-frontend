import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const axios = require('axios')

const formatPageController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('format')
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
        const plantData = await getDefaultLocaleData('plant-details')
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
          // return result
          const subFormatArray = []
          function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
          }
          if (result.dormantIndicator?.length > 0) {
            subFormatArray.push('Dormant')
          }

          if (result.seedIndicator?.length > 0) {
            subFormatArray.push('Seeds')
          }

          if (result.fruitIndicator?.length > 0) {
            subFormatArray.push('Fruit')
          }
          if (result.bonsaiIndicator?.length > 0) {
            subFormatArray.push('Naturally and artificially dwarfed')
          }
          if (result.invintroIndicator?.length > 0) {
            subFormatArray.push('Invitro material')
          }
          if (result.FormatClarification?.length > 0) {
            subFormatArray.push(
              capitalizeFirstLetter(result.FormatClarification)
            )
          }

          const ulIndicatorList = [
            { name: 'dormant', flag: result.dormantIndicator },
            { name: 'seeds', flag: result.seedIndicator },
            { name: 'fruit', flag: result.fruitIndicator },
            {
              name: 'naturally and artificially dwarfed',
              flag: result.bonsaiIndicator
            },
            { name: 'invitro material', flag: result.invintroIndicator }
          ]
          let processedData = []
          for (let i = 0; i < subFormatArray?.length; i++) {
            processedData.push(subFormatArray[i])
            if (i < subFormatArray.length - 1) {
              processedData.push('or')
            }
          }
          if (processedData.length > 0) {
            processedData = processedData?.join(' ')?.split(',')
          }
          if (subFormatArray?.length > 1) {
            ulIndicatorFlag = true
          }
          let removedProcessedData = processedData
          result.annex11RulesArr?.forEach(function (annex11) {
            if (result.hybridIndicator.length === 0) {
              if (
                annex11.SERVICE_SUBFORMAT.toLowerCase() === 'seeds for planting'
              ) {
                removedProcessedData = processedData[0]?.replace('or Seeds', '')
                removedProcessedData = processedData[0]?.replace('Seeds or', '')
              }
              if (
                annex11.SERVICE_SUBFORMAT.toLowerCase() === 'seeds for eating'
              ) {
                removedProcessedData = processedData[0]?.replace('or Seeds', '')
                removedProcessedData = processedData[0]?.replace('Seeds or', '')
              }
              if (
                annex11.SERVICE_SUBFORMAT.toLowerCase() ===
                'root and tubercle vegetables'
              ) {
                removedProcessedData = processedData[0]?.push(
                  'Root and tubercle vegetables'
                )
              }
              if (annex11.SERVICE_SUBFORMAT.toLowerCase() === 'fruit') {
                removedProcessedData = processedData[0]?.replace('or Fruit', '')
                removedProcessedData = processedData[0]?.replace('Fruit or', '')
                removedProcessedData = processedData[0]?.replace('Fruit', '')
              }
              if (annex11.SERVICE_SUBFORMAT.toLowerCase() === 'grain') {
                removedProcessedData = processedData[0]?.push('Grain')
              }
              if (annex11.SERVICE_SUBFORMAT.toLowerCase() === 'cut flowers') {
                removedProcessedData = processedData[0]?.push('Cut flowers')
              }
              if (
                annex11.SERVICE_SUBFORMAT.toLowerCase() === 'wood packaging'
              ) {
                removedProcessedData = processedData[0]?.push('Wood packaging')
              }
              if (
                annex11.SERVICE_SUBFORMAT.toLowerCase() === 'cooper products'
              ) {
                removedProcessedData = processedData[0]?.push('Cooper products')
              }
              if (annex11.BTOM_CLARIFICATION.length > 0) {
                removedProcessedData = processedData[0]?.push(
                  annex11.BTOM_CLARIFICATION
                )
              }
            }
          })
          function compareQuarantineIndicator(a, b) {
            if (a.quarantine_indicator > b.quarantine_indicator) {
              return -1
            }
            if (a.quarantine_indicator < b.quarantine_indicator) {
              return 1
            }
            return 0
          }

          const pestDetails = result.pestDetails
            .sort(compareQuarantineIndicator)
            .reverse()

          return h.view('plant-health/plant-details/index', {
            ulIndicatorFlag,
            pageTitle:
              searchQuery.value +
              ' - Check plant health information and import rules - GOV.UK',
            heading: 'Plant Details',
            getHelpSection,
            radiobuttonValue,
            processedData,
            removedProcessedData,
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
            searchQuery,
            ulIndicatorList
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
        const errorData = await getDefaultLocaleData('format')
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
          pageTitle:
            'Which format of ' +
            searchQuery.value +
            ' are you importing? - Check plant health information and import rules - GOV.UK',
          heading: 'Format',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { formatPageController }
