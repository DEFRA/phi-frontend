import { getDefaultLocaleData } from '~/src/server/localisation'
import { config } from '~/src/config'
import { proxyFetch } from '~/src/server/common/helpers/proxy-fetch'
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

        const photoURL = config.get('photoURL') + eppoCode + '/photos'

        const proxyVar = await proxyFetch(photoURL, null)
        const proxyVarstatus = proxyVar.status

        const photores = await getstatus(proxyVarstatus)

        async function getstatus(proxyVarstatus) {
          const status = Number(proxyVarstatus)
          // Evaluate the response
          if (status === 200) {
            return true
          } else {
            return false
          }
        }
        function getPublicationDate(date) {
          const today = new Date(date) // yyyy-mm-dd

          // Getting short month name (e.g. "Oct")
          const month = today.toLocaleString('default', { month: 'long' })

          return month + ' ' + today.getFullYear()
        }

        const factsheetlinks = []
        const otherPublications = []
        const Rnpmap = []
        const Othermap = []
        // let publicationDateFormated;
        const fc = 'factsheet'.toUpperCase()
        const commanNamearray = result.pest_detail[0].PEST_NAME[1].NAME
        const commonNameSorted = commanNamearray.sort()

        const syNamearray = result.pest_detail[0].PEST_NAME[2].NAME
        const SynonymNameSorted = syNamearray.sort()

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
              const st = fcl.PUBLICATION_DATE_FORMATTED.split(' ')
              fcl.INDEX = Number(st[1])
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
              const st = ocl.PUBLICATION_DATE_FORMATTED.split(' ')
              ocl.INDEX = Number(st[1])
              otherPublications.push(ocl)
            }
          }
        }
        // Sorting documents based on new one first
        factsheetlinks.sort(function (a, b) {
          return b.INDEX - a.INDEX
        })
        otherPublications.sort(function (a, b) {
          return b.INDEX - a.INDEX
        })

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

        if (result.pest_detail[0].QUARANTINE_INDICATOR === 'R') {
          const Plantdetails = await invokepestplantLinkAPI(plantLinl)

          const array1 = Plantdetails.pest_link

          const RArray = []
          const OtherArray = []
          const Rmap = new Map()
          const Omap = new Map()
          for (let ar = 0; ar < array1.length; ar++) {
            for (let r = 0; r < array1[ar].PEST_LINK.length; r++) {
              if (
                array1[ar].PEST_LINK[r].CSL_REF ===
                result.pest_detail[0].CSL_REF
              ) {
                if (array1[ar].PEST_LINK[r].QUARANTINE_INDICATOR === 'R') {
                  const ra = []
                  ra.HOSTREF = array1[ar].HOST_REF
                  ra.FORMAT = array1[ar].PEST_LINK[r].REGULATION_INDICATOR
                  RArray.push(ra.HOSTREF)
                  Rmap.set(ra.HOSTREF, ra.FORMAT)
                } else {
                  const ra = []
                  ra.HOSTREF = array1[ar].HOST_REF
                  ra.FORMAT = array1[ar].PEST_LINK[r].REGULATION_INDICATOR
                  OtherArray.push(ra.HOSTREF)
                  Omap.set(ra.HOSTREF, ra.FORMAT)
                }
              }
            }
          }

          for (let a = 0; a < result.pest_detail[0].PLANT_LINK.length; a++) {
            if (result.pest_detail[0].QUARANTINE_INDICATOR === 'R') {
              // RArray = RArray.map(Number)

              RArray.forEach((element) => {
                if (element === result.pest_detail[0].PLANT_LINK[a].HOST_REF) {
                  const item = result.pest_detail[0].PLANT_LINK[a].PLANT_NAME

                  const commonmNames = []
                  for (let j = 0; j < item.length; j++) {
                    if (item[j].type === 'COMMON_NAME') {
                      commonmNames.push(item[j].NAME)
                    }
                  }
                  const va = []
                  va.LATIN_NAME = result.pest_detail[0].PLANT_LINK[a].LATIN_NAME
                  va.COMMAN_NAME = commonmNames
                  va.FORMAT = Rmap.get(
                    result.pest_detail[0].PLANT_LINK[a].HOST_REF
                  )
                  Rnpmap.push(va)
                }
              })

              OtherArray.forEach((element) => {
                if (element === result.pest_detail[0].PLANT_LINK[a].HOST_REF) {
                  const item = result.pest_detail[0].PLANT_LINK[a].PLANT_NAME

                  const commonmNames = []
                  for (let j = 0; j < item.length; j++) {
                    if (item[j].type === 'COMMON_NAME') {
                      commonmNames.push(item[j].NAME)
                    }
                  }
                  const va = []
                  va.LATIN_NAME = result.pest_detail[0].PLANT_LINK[a].LATIN_NAME
                  va.COMMAN_NAME = commonmNames
                  va.FORMAT = Rmap.get(
                    result.pest_detail[0].PLANT_LINK[a].HOST_REF
                  )
                  Othermap.push(va)
                }
              })
            }
          }
        } else {
          Rnpmap.push()
          Othermap.push()
        }

        async function invokepestplantLinkAPI(payload) {
          try {
            const response = await axios.post(
              config.get('backendApiUrl') + '/search/pestlink',
              { hostRefs: payload }
            )

            return response.data
          } catch (error) {
            return error // Rethrow the error so it can be handled appropriately
          }
        }
        const plantLinkMapsorted = new Map([...plantLinkMap.entries()].sort())

        return h.view('plant-health/pest-details/index', {

          pageTitle:
            result.pest_detail[0].PEST_NAME[0].NAME +
            ' — Check plant health information and import rules — GOV.UK',
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
          factsheetlinks,
          Rnpmap,
          Othermap
        })
      }
    }
  }
}

export { pestSearchController }
