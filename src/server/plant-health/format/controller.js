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
      request.yar.set('countrySearchQuery', {
        value: decodeURI(request.query.countrySearchQuery)
      })
      request.yar.set('countryCode', {
        value: request.yar?.get('countryCode')?.value
      })
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
        const countryCode = request.yar?.get('countryCode')?.value
        let ulIndicatorFlag = false
        if (request.yar?.get('hostRef')?.value) {
          const plantDetails = {
            hostRef: parseInt(request.yar?.get('hostRef')?.value),
            serviceFormat: request.query.format,
            country: request?.yar?.get('countrySearchQuery')?.value
          }
          result = await invokeWorkflowApi(plantDetails)
          const subFormatArray = []
          function capitalizeFirstLetter(string) {
            return string?.charAt(0)?.toUpperCase() + string?.slice(1)
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
            subFormatArray.push('In vitro material')
          }
          if (result.FormatClarification?.length > 0) {
            subFormatArray.push(
              capitalizeFirstLetter(result.FormatClarification)
            )
          }

          const ulIndicatorList = [
            { name: 'dormant', flag: result.dormantIndicator },
            { name: 'fruit', flag: result.fruitIndicator },
            { name: 'in vitro material', flag: result.invintroIndicator },
            {
              name: 'naturally and artificially dwarfed',
              flag: result.bonsaiIndicator
            },
            { name: 'seeds', flag: result.seedIndicator }
          ]
          let processedData = []
          processedData.push(
            capitalizeFirstLetter(subFormatArray?.join(' or ')?.toLowerCase())
          )
          if (processedData.length > 0) {
            processedData = processedData?.join(' ')?.split(',')
          }
          if (subFormatArray?.length > 1) {
            ulIndicatorFlag = true
          }
          let removedProcessedData = processedData
          result.annex11RulesArr?.forEach(function (annex11) {
            if (
              annex11.SERVICE_SUBFORMAT?.toLowerCase() ===
                'seeds for planting' ||
              annex11.SERVICE_SUBFORMAT?.toLowerCase() === 'seeds for eating'
            ) {
              removedProcessedData = processedData[0]
                ?.split(' or ')
                ?.filter(function (el) {
                  return el.toLowerCase() !== 'seeds'
                })
            }
            if (
              annex11.SERVICE_SUBFORMAT?.toLowerCase() ===
              'root and tubercle vegetables'
            ) {
              removedProcessedData = processedData?.push(
                'Root and tubercle vegetables'
              )
            }
            if (
              annex11.SERVICE_SUBFORMAT === '' &&
              format.toLowerCase() === 'produce'
            ) {
              removedProcessedData = []
              if (result.ProhibitionClarification?.length > 0) {
                if (annex11.SERVICE_SUBFORMAT_EXCLUDED?.length > 0) {
                  processedData = []
                  removedProcessedData = processedData?.push(
                    capitalizeFirstLetter(format) +
                      ' (other than ' +
                      annex11.SERVICE_SUBFORMAT_EXCLUDED?.trim() +
                      ')'
                  )
                }
              } else {
                if (result.dormantIndicator?.length > 0) {
                  processedData = []
                  removedProcessedData = processedData?.push('Dormant')
                }
              }
            }
            if (
              annex11.SERVICE_SUBFORMAT === '' &&
              format.toLowerCase() === 'plants for planting'
            ) {
              removedProcessedData = []
              if (result.ProhibitionClarification?.length > 0) {
                if (annex11.SERVICE_SUBFORMAT_EXCLUDED?.length > 0) {
                  processedData = []
                  removedProcessedData = processedData?.push(
                    capitalizeFirstLetter(format) +
                      ' (other than ' +
                      annex11.SERVICE_SUBFORMAT_EXCLUDED.trim() +
                      ')'
                  )
                }
              } else {
                if (
                  result.dormantIndicator?.length > 0 &&
                  result.invintroIndicator?.length === 0 &&
                  result.bonsoiIndicator?.length === 0
                ) {
                  processedData = []
                  removedProcessedData = processedData?.push('Dormant')
                }
              }
            }
            if (annex11.SERVICE_SUBFORMAT?.toLowerCase() === 'fruit') {
              removedProcessedData = processedData[0]
                ?.split(' or ')
                ?.filter(function (el) {
                  return el.toLowerCase() !== 'fruit'
                })
            }
            if (annex11.SERVICE_SUBFORMAT?.toLowerCase() === 'grain') {
              removedProcessedData = processedData?.push('Grain')
            }
            if (annex11.SERVICE_SUBFORMAT?.toLowerCase() === 'cut flowers') {
              removedProcessedData = processedData?.push('Cut flowers')
            }
            if (annex11.SERVICE_SUBFORMAT?.toLowerCase() === 'wood packaging') {
              removedProcessedData = processedData?.push('Wood packaging')
            }
            if (
              annex11.SERVICE_SUBFORMAT?.toLowerCase() === 'cooper products'
            ) {
              removedProcessedData = processedData?.push('Cooper products')
            }
            if (annex11.BTOM_CLARIFICATION?.length > 0) {
              removedProcessedData =
                processedData[0] + ' (' + annex11.BTOM_CLARIFICATION + ')'
            }
          })
          const resultHeaderArray = []
          for (let i = 0; i < removedProcessedData?.length; i++) {
            resultHeaderArray?.push(removedProcessedData[i])
            if (i < removedProcessedData?.length - 1) {
              resultHeaderArray?.push('or')
            }
          }
          removedProcessedData = resultHeaderArray
          if (removedProcessedData?.length > 0) {
            removedProcessedData = removedProcessedData?.join(' ')?.split(',')
            removedProcessedData = capitalizeFirstLetter(
              removedProcessedData[0]
            )
          }

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
            ?.sort(compareQuarantineIndicator)
            ?.reverse()
          const checkProcessedData = ulIndicatorList.filter(function (item) {
            if (item.flag !== '') {
              return item
            } else {
              return null
            }
          })

          return h.view('plant-health/plant-details/index', {
            ulIndicatorFlag,
            pageTitle:
              searchQuery.value +
              ' — Check plant health information and import rules — GOV.UK',
            heading: 'Plant Details',
            getHelpSection,
            radiobuttonValue,
            processedData,
            removedProcessedData,
            hostRef,
            format,
            countryCode,
            outcome: result.outcome,
            result,
            checkProcessedData,
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
            ' are you importing? — Check plant health information and import rules — GOV.UK',
          heading: 'Format',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { formatPageController }
