import { getDefaultLocaleData } from '~/src/server/localisation'
import { setErrorMessage } from '~/src/server/common/helpers/errors'
import { config } from '~/src/config'
const axios = require('axios')
const pestSearchController = {
  handler: async (request, h) => {
    if (request != null) {
      const data = getDefaultLocaleData('pest-search')
      //console.log("pest-searchlocal data",request)
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
      // console.log("searchValue",searchValue);
      // console.log("CSL Ref of search value:",cslRef);
      // console.log("eppoCodeof search value:",eppoCode);
      if (searchValue) {
        const pestSearchQuery = request.yar?.get('pestSearchQuery')
        const fullSearchQuery = request.yar?.get('fullSearchQuery')
       
        const pestData = getDefaultLocaleData('pest-details')
        const mainContent = pestData?.mainContent
        const getHelpSection = pestData?.getHelpSection

        const pestDetails = {
          cslRef: parseInt(request.yar?.get('cslRef')?.value)         
        }
        




        let result
        result = await invokepestdetailsAPI(pestDetails)
        const plantLink = result.pest_detail[0].PLANT_LINK
        //console.log("PLANTLINKDETAILS_full",plantLink)
        const plantLinkMap = new Map();
        let photores;
        let resultofPhoto;
        let Annex3URL=config.get('Annex3') ;
        let ContactAuthURL=config.get('contactAuthorities') ;
        // config.get('photoURL') + '/search/pestdetails',
         let photoURL =config.get('photoURL') + eppoCode
       //  console.log("photoURL",photoURL);
         photores=pingWebsite(photoURL);
       //  console.log("photores",photores)

         function getPublicationDate(date)
         {
          var today = new Date(date); // yyyy-mm-dd

          // Getting short month name (e.g. "Oct")
          var month = today.toLocaleString('default', { month: 'long' });
        
          //console.log("pl date",month + " "+ today.getFullYear());
          return month + " "+ today.getFullYear();
         }
         async function pingWebsite(url) {
           try {
             const response = await axios.get(url);
             // Evaluate the response 
             if (response.status === 200) {
              resultofPhoto =config.get('photoURL') + eppoCode;
               console.log('Ping successful!');
              // console.log('Response data of photo:', response.data);
             } else {
             
              console.log(`Received unexpected status code: ${response.status}`); }
           } catch (error) {
             console.log("errorphoto", error)
           }
         }
        // console.log("resultofPhoto",resultofPhoto);
         //console.log("Document Link",result.pest_detail[0].DOCUMENT_LINK);
         let documentLink= result.pest_detail[0].DOCUMENT_LINK;
         let factsheetlinks = [] ;
         let otherPublications = [];
         
        // let publicationDateFormated;
         let fc= "factsheet".toUpperCase()
        // console.log("fc",fc);
        
         for(var i=0;i<result.pest_detail[0].DOCUMENT_LINK.length;i++)
          {
            if(result.pest_detail[0].DOCUMENT_LINK[i].VISIBLE_ON_PHI_INDICATOR == 1)
              {

            if(result.pest_detail[0].DOCUMENT_LINK[i].DOCUMENT_TYPE.toUpperCase() === fc )
              {
            
           let res =getPublicationDate(result.pest_detail[0].DOCUMENT_LINK[i].PUBLICATION_DATE)
           //console.log( "res",res);
           let fcl=result.pest_detail[0].DOCUMENT_LINK[i];
           fcl.PUBLICATION_DATE_FORMATTED = res;
           fcl.TITLE=result.pest_detail[0].DOCUMENT_LINK[i].DOCUMENT_TITLE.split(".");
          
           let fileExtension= fcl.TITLE[1].toUpperCase()
           fcl.FILE_EXTENSION =fileExtension
                factsheetlinks.push (fcl)
                }
              else
              {
                let ocl=result.pest_detail[0].DOCUMENT_LINK[i];
               
                let res1 =getPublicationDate(result.pest_detail[0].DOCUMENT_LINK[i].PUBLICATION_DATE)
                ocl.PUBLICATION_DATE_FORMATTED=res1;
                ocl.TITLE=result.pest_detail[0].DOCUMENT_LINK[i].DOCUMENT_TITLE.split(".");
               let fileExtension= ocl.TITLE[1].toUpperCase()
               ocl.FILE_EXTENSION =fileExtension
                otherPublications.push(ocl)

              }
            }
          }
          // console.log("factsheetlinks",factsheetlinks);
          // console.log("otherPublications",otherPublications);
          // console.log("quarantine indicator",result.pest_detail[0].QUARANTINE_INDICATOR);
        for(var i=0;i<result.pest_detail[0].PLANT_LINK.length;i++)
          {
            let item=result.pest_detail[0].PLANT_LINK[i].PLANT_NAME
           // console.log("item",item)
            let commonmNames =[];
            for(var j=0;j<item.length;j++)
              {
           let commonnameofPlants=item[j] ;
           
           if(item[j].type=='COMMON_NAME')
            {
          //console.log("item[j]",item[j].NAME);
          commonmNames.push(item[j].NAME);
            }
            
              }
             
              plantLinkMap.set(result.pest_detail[0].PLANT_LINK[i].LATIN_NAME,commonmNames)
            
          }
          
         
       //console.log("plmaps",plantLinkMap)
        
        return h.view('plant-health/pest-details/index', {
          pageTitle: 'Pestdetails',
          heading: 'Pestdetails',
          getHelpSection,
          mainContent,
          cslRef,
          eppoCode,
          resultofPhoto,
          photoURL,
          Annex3URL,
          ContactAuthURL,
          quarantineIndicator:result.pest_detail[0].QUARANTINE_INDICATOR,
          preferredName:result.pest_detail[0].PEST_NAME[0].NAME,
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
            console.log("invoking pest details")
            const response = await axios.post(
              config.get('backendApiUrl') + '/search/pestdetails',
              { pestDetails: payload }
            )
            console.log("responsepest",response.data)
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

 