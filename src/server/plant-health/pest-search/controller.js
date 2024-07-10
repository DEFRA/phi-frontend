import { getDefaultLocaleData } from '~/src/server/localisation'
import { config } from '~/src/config'
const axios = require('axios')
const pestSearchController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = await getDefaultLocaleData('pest-details')
      if (request.query?.getcsl !== '') {
        const pestDetails = {
          cslRef: parseInt(request.query?.getcsl)
        }

        const result = await invokepestdetailsAPI(pestDetails)
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

        const mainContent = data?.mainContent
        const getHelpSection = data?.getHelpSection
        request.yar.set('errors', '')
        request.yar.set('errorMessage', '')

        const plantLinkMap = new Map()

        let resultofPhoto
        const Annex3URL = config.get('Annex3')
        const ContactAuthURL = config.get('contactAuthorities')
        const eppoCode = result.pest_detail[0].EPPO_CODE

        const photoURL = config.get('photoURL') + eppoCode

        const photores = pingWebsite(photoURL)
        async function pingWebsite(url) {
          try {
            const response = await axios.get(url)
            // Evaluate the response
            if (response.status === 200) {
              resultofPhoto = config.get('photoURL') + eppoCode
            } else {
              resultofPhoto = 'Fail'
            }
          } catch (error) {}
        }

        function getPublicationDate(date) {
          const today = new Date(date) // yyyy-mm-dd

          // Getting short month name (e.g. "Oct")
          const month = today.toLocaleString('default', { month: 'long' })

          return month + ' ' + today.getFullYear()
        }

        const factsheetlinks = []
        const otherPublications = []

        // let publicationDateFormated;
        const fc = 'factsheet'.toUpperCase()
        const commanNamearray = result.pest_detail[0].PEST_NAME[1].NAME
        const commonNameSorted = commanNamearray.sort()
        // console.log("cmn",cmn);
        const syNamearray = result.pest_detail[0].PEST_NAME[2].NAME
        const SynonymNameSorted = syNamearray.sort()
        // console.log("cmn",syn);

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
        // const array1=result.pest_detail[0].PLANT_LINK;
        // const ar2 = array1.sort();
        // console.log("array1",array1);
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
        const plantLinkMapsorted = new Map([...plantLinkMap.entries()].sort())

        return h.view('plant-health/pest-details/index', {
          pageTitle: 'Pestdetails',
          heading: 'Pestdetails',
          getHelpSection,
          mainContent,
          cslRef: result.pest_detail[0].CSL_REF,
          eppoCode,
          resultofPhoto,
          photoURL,
          photores,
          Annex3URL,
          ContactAuthURL,
          quarantineIndicator: result.pest_detail[0].QUARANTINE_INDICATOR,
          preferredName: result.pest_detail[0].PEST_NAME[0].NAME,
          commonNames: commonNameSorted,
          synonymNames: SynonymNameSorted,
          plantLinkMapsorted,
          otherPublications,
          factsheetlinks
        })
      }
    }
  }
}

export { pestSearchController }
