import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const axios = require('axios')
const pestSearchController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('pest-details')
      const mainContent = data?.mainContent
      const getHelpSection = data?.getHelpSection

      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('pestSearchQuery', {
        value: decodeURI(request.query.pestSearchQuery)
      })
      request.yar.set('fullSearchQuery', {
        value: decodeURI(request.yar?.get('fullSearchQuery')?.value)
      })
      request.yar.set('searchQuery', {
        value: decodeURI(request.yar?.get('searchQuery')?.value)
      })
      request.yar.set('cslRef', {
        value: request.query.cslRef
      })
      request.yar.set('eppoCode', {
        value: request.query.eppoCode
      })

      const cslRef = request?.yar?.get('cslRef')?.value
      const eppoCode = request?.yar?.get('eppoCode')?.value
      const searchInput = request?.yar?.get('pestSearchQuery')
      const searchValue = searchInput?.value
      const searchQuery = request.yar?.get('searchQuery')

      if (searchValue) {
        const pestSearchQuery = request.yar?.get('pestSearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')

        const pestDetails = {
          cslRef: parseInt(request.yar?.get('cslRef')?.value)
        }

        const result = await invokepestdetailsAPI(pestDetails)

        const plantLinkMap = new Map()

        let resultofPhoto
        const Annex3URL = config.get('Annex3')
        const ContactAuthURL = config.get('contactAuthorities')

        const photoURL = config.get('photoURL') + eppoCode

        const photores = pingWebsite(photoURL)

        function getPublicationDate(date) {
          const today = new Date(date) // yyyy-mm-dd

          // Getting short month name (e.g. "Oct")
          const month = today.toLocaleString('default', { month: 'long' })

          return month + ' ' + today.getFullYear()
        }
        async function pingWebsite(url) {
          try {
            const response = await axios.get(url)
            // Evaluate the response
            if (response.status === 200) {
              resultofPhoto = config.get('photoURL') + eppoCode
            } else {
              resultofPhoto = ''
            }
          } catch (error) {}
        }

        const factsheetlinks = []
        const otherPublications = []

        // let publicationDateFormated;
        const fc = 'factsheet'.toUpperCase()

        for (let i = 0; i < result.pest_detail[0].DOCUMENT_LINK.length; i++) {
          if (
            result.pest_detail[0].DOCUMENT_LINK[i].VISIBLE_ON_PHI_INDICATOR ===
            1
          ) {
            if (
              result.pest_detail[0].DOCUMENT_LINK[
                i
              ].DOCUMENT_TYPE.toUpperCase() === fc
            ) {
              const res = getPublicationDate(
                result.pest_detail[0].DOCUMENT_LINK[i].PUBLICATION_DATE
              )

              const fcl = result.pest_detail[0].DOCUMENT_LINK[i]
              fcl.PUBLICATION_DATE_FORMATTED = res
              fcl.TITLE =
                result.pest_detail[0].DOCUMENT_LINK[i].DOCUMENT_TITLE.split('.')

              const fileExtension = fcl.TITLE[1].toUpperCase()
              fcl.FILE_EXTENSION = fileExtension
              factsheetlinks.push(fcl)
            } else {
              const ocl = result.pest_detail[0].DOCUMENT_LINK[i]

              const res1 = getPublicationDate(
                result.pest_detail[0].DOCUMENT_LINK[i].PUBLICATION_DATE
              )
              ocl.PUBLICATION_DATE_FORMATTED = res1
              ocl.TITLE =
                result.pest_detail[0].DOCUMENT_LINK[i].DOCUMENT_TITLE.split('.')
              const fileExtension = ocl.TITLE[1].toUpperCase()
              ocl.FILE_EXTENSION = fileExtension
              otherPublications.push(ocl)
            }
          }
        }
        const plantLinl = []
        for (let a = 0; a < result.pest_detail[0].PLANT_LINK.length; a++) {
          if (result.pest_detail[0].QUARANTINE_INDICATOR === 'R') {
            plantLinl.push(result.pest_detail[0].PLANT_LINK[a].HOST_REF)
          }

          const item = result.pest_detail[0].PLANT_LINK[a].PLANT_NAME

          const commonmNames = []
          for (let j = 0; j < item.length; j++) {
            if (item[j].type === 'COMMON_NAME') {
              commonmNames.push(item[j].NAME)
            }
          }

          plantLinkMap.set(
            result.pest_detail[0].PLANT_LINK[a].LATIN_NAME,
            commonmNames
          )
        }

        return h.view('plant-health/pest-details/index', {
          pageTitle: 'Pestdetails',
          heading: 'Pestdetails',
          getHelpSection,
          mainContent,
          cslRef,
          eppoCode,
          resultofPhoto,
          photoURL,
          photores,
          Annex3URL,
          ContactAuthURL,
          quarantineIndicator: result.pest_detail[0].QUARANTINE_INDICATOR,
          preferredName: result.pest_detail[0].PEST_NAME[0].NAME,
          commonNames: result.pest_detail[0].PEST_NAME[1].NAME,
          synonymNames: result.pest_detail[0].PEST_NAME[2].NAME,
          plantLinkMap,
          otherPublications,
          factsheetlinks,
          fullSearchQuery,
          pestSearchQuery,
          searchQuery
        })

        async function invokepestdetailsAPI(payload) {
          try {
            const response = await axios.post(
              config.get('backendApiUrl') + '/search/pestdetails',
              { pestDetails: payload }
            )

            return response.data
          } catch (error) {
            return error // Rethrow the error so it can be handled appropriately
          }
        }
      } else {
        const pestSearchQuery = request.yar?.get('pestSearchQuery')
        const searchQuery = request.yar?.get('searchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
        if (request.query.pestSearchQuery === '') {
          const errorData = getDefaultLocaleData('pest-search')
          const errorSection = errorData?.errors
          setErrorMessage(
            request,
            errorSection.titleText,
            errorSection.searchErrorListText1 +
              ' ' +
              request.yar?.get('searchQuery').value +
              ' ' +
              errorSection.searchErrorListText2
          )
        }
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')
        return h.view('plant-health/pest-details/index', {
          mainContent,
          getHelpSection,
          pestSearchQuery,
          searchQuery,
          fullSearchQuery,
          pageTitle: 'Pest details',
          heading: 'Pest details',
          errors,
          errorMessage
        })
      }
    }
  }
}

export { pestSearchController }
