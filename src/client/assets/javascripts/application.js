import { initAll } from 'govuk-frontend'

import '../stylesheets/application.scss'

import '../images/favicon.ico'
import '../images/favicon.svg'
import '../images/govuk-icon-180.png'
import '../images/govuk-icon-192.png'
import '../images/govuk-icon-512.png'
import '../images/govuk-icon-mask.svg'
import accessibleAutocomplete from './accessible-autocomplete.min.js'
let finalArray = []
let searching = false
let timer;

var childern = document.querySelector('#my-autocomplete-container').childNodes
console.log('CHILDREN', childern[0].value)
 async function fetchSuggestions(query, populateResults) {
    finalArray = []
    searching = true
    var apiUrl = '/search/plants?searchQuery=' + query;
  clearTimeout(timer);
  timer = setTimeout(async() => {
    try {
      if (query.length > 2){
      const response = await fetch(apiUrl);
      const responseJSON = await response.json();
      await renderSuggestions(responseJSON, query)
      console.log('SUGGESTIONS', finalArray)
      if (finalArray.length > 0){
       searching = false
       populateResults(finalArray.sort())
      }
    }
    } catch (error) {
      // TypeError: Failed to fetch
      console.log('Error fetching suggestions:', error);
    }
  }, 1000);

  }
  var regexValue;
  async function renderSuggestions(json, query) {
    finalArray = []
    console.log('JSON', json)
    var latinJson = json.message.plant_detail.filter(function(el) {
      return el.id == "latin-name"
    })[0].results
    var commonJson = json.message.plant_detail.filter(function(el) {
      return el.id == "common-name"
    })[0].results
    var synonymJson = json.message.plant_detail.filter(function(el) {
      return el.id == "synonym-name"
    })[0].results
    regexValue = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    var latinArray = []
    var commonArray = []
    var synonymArray = []

  

    function getResults(latinJson, commonJson) {
      //latin name search
      if (commonArray.length === 0 && synonymArray.length === 0) {
        for (let i = 0; i < latinJson.length; i++) {
          for (let j = 0; j < latinJson[i]['plantName'].length; j++) {
            if ((latinJson[i]['plantName'][j]['type'] === "LATIN_NAME") && (latinJson[i]['plantName'][j]['NAME'].match(new RegExp(regexValue, "gi")))) {
              latinArray.push({
                result: latinJson[i]['plantName'],
                hostRef: latinJson[i]['hostRef'],
                eppoCode: latinJson[i]['eppoCode'],
                highlight: 'LATIN_NAME',
                matchingText: query
              })
            }
          }
        }
      }

      //common name search
      if (synonymArray.length === 0) {
        for (let i = 0; i < commonJson.length; i++) {
          var existingArray;
          for (let j = 0; j < commonJson[i]['plantName'].length; j++) {
            if (commonJson[i]['plantName'][j]['type'] === "COMMON_NAME") {
              commonJson[i]['plantName'][j]['NAME'].sort().filter(name => {
                if (name.match(new RegExp(regexValue, "gi"))) {
                  if (latinArray.length > 0) {
                    var existingArray = commonExistingNameCheck(latinArray, name)
                    if (existingArray.length === 0) {
                      commonArray.push({
                        result: commonJson[i]['plantName'],
                        hostRef: commonJson[i]['hostRef'],
                        eppoCode: commonJson[i]['eppoCode'],
                        highlight: 'COMMON_NAME',
                        matchingText: query
                      })
                    }
                  } else {
                    commonArray.push({
                      result: commonJson[i]['plantName'],
                      hostRef: commonJson[i]['hostRef'],
                      eppoCode: commonJson[i]['eppoCode'],
                      highlight: 'COMMON_NAME',
                      matchingText: query
                    })
                  }

                }
              })
            }
          }
        }
      }

      //synonym name search
      if (commonArray.length === 0) {
        for (let i = 0; i < synonymJson.length; i++) {
          for (let j = 0; j < synonymJson[i]['plantName'].length; j++) {
            if (synonymJson[i]['plantName'][j]['type'] === "SYNONYM_NAME") {
              synonymJson[i]['plantName'][j]['NAME'].filter(name => {
                if (name.match(new RegExp(regexValue, "gi"))) {
                  if (latinArray.length > 0) {
                    var existingArray = synonymExistingNameCheck(latinArray, name)
                    if (existingArray.length === 0) {
                      synonymArray.push({
                        result: synonymJson[i]['plantName'],
                        hostRef: synonymJson[i]['hostRef'],
                        eppoCode: synonymJson[i]['eppoCode'],
                        highlight: 'SYNONYM_NAME',
                        matchingText: query
                      })
                    }
                  } else {
                    synonymArray.push({
                      result: synonymJson[i]['plantName'],
                      hostRef: synonymJson[i]['hostRef'],
                      eppoCode: synonymJson[i]['eppoCode'],
                      highlight: 'SYNONYM_NAME',
                      matchingText: query
                    })
                  }
                }
              })
            }
          }
        }
      }

    }
    getResults(latinJson, commonJson)

    var resultSet = [{
      latinNames: latinArray,
      commonNames: commonArray,
      synonymNames: synonymArray
    }]

    return await renderResultsWithHtml(resultSet)
  }

  function synonymExistingNameCheck(latinArray, name) {
    var existingArray = []
    latinArray.filter(function(item) {
      item.result[2]['NAME']?.filter(function(sname) {
        if (sname.match(new RegExp(name, "gi")))
          existingArray.push(sname)
      })
    })
    return existingArray
  }

  function commonExistingNameCheck(latinArray, name) {
    var existingArray = []
    latinArray.filter(function(item) {
      item.result[1]['NAME']?.filter(function(cname) {
        if (cname.match(new RegExp(name, "gi")))
          existingArray.push(cname)
      })
    })
    return existingArray
  }

  async function renderResultsWithHtml(filterResults) {
    finalArray = []
    var checkForEmptyArray = filterResults.flat()
    if (checkForEmptyArray.length > 0) {
      if (checkForEmptyArray[0]['commonNames'].length === 0 &&
        checkForEmptyArray[0]['latinNames'].length === 0 &&
        checkForEmptyArray[0]['synonymNames'].length === 0) {
        var hostRefElement = document.getElementById('hostRef');
        var eppoCodeElement = document.getElementById('eppoCode');
        hostRefElement.ariaLabel  = "Host ref"
        hostRefElement.value = ''
        eppoCodeElement.value = ''
          searchResults.style.display = 'inline-block';
        } else {
        filterResults.forEach(function(resultSet) {
          resultSet['latinNames'].forEach(function(item, index) {
            var latinIndex = 'latinName' + index
            createAndAppendLiElement(item, latinIndex)
          })

          resultSet['commonNames'].forEach(function(item, index) {
            var commonIndex = 'commonName' + index
            createAndAppendLiElement(item, commonIndex)
          })

          resultSet['synonymNames'].forEach(function(item, index) {
            var synonymIndex = 'synonymName' + index
            createAndAppendLiElement(item, synonymIndex)
          })
        });
      }
    }
  }

  function synonymNameHTML(synonymName, item, commonName) {
    var synonymInnerHTMLText
    synonymName.forEach(function(sname, i) {
      if (commonName.length > 0) {
        synonymInnerHTMLText = sname + " " + "(" + commonName + ")"
      } else {
        synonymInnerHTMLText = sname
      }

      finalArray.push({text: synonymInnerHTMLText, hostRef: item.hostRef})
      return finalArray.sort()
    })
  }

    // Function to sort the list items alphabetically
    async function sortList() {
        // Select the ul element
        const ul = document.getElementById('my-autocomplete__listbox');

        // Get the li elements
        const liElements = ul?.getElementsByTagName('li');
        if (liElements?.length > 0){

          // Convert HTMLCollection to an array
          const liArray = Array.from(liElements);

          // Sort the array based on the text content of the li elements
          liArray.sort((a, b) => a.textContent.localeCompare(b.textContent));

          // Clear the ul element
          ul.innerHTML = '';

          // Append the sorted li elements back to the ul element
          liArray.forEach(li => ul.appendChild(li));
        }
    }

    function createAndAppendLiElement(item, index) {
        var latinName, commonName, synonymName;
        item.result.filter(function(el) {
          if (el.type === "LATIN_NAME") {
            latinName = el.NAME
          }
          if (el.type === "COMMON_NAME") {
            commonName = el.NAME
          }
          if (el.type === "SYNONYM_NAME") {
            synonymName = el.NAME
          }
          return latinName, commonName, synonymName
        })
        latinName = latinName
        var newCA = []
        commonName.forEach(function(cname) {
          var highlightCName;
          if (cname.match(new RegExp(regexValue, "gi"))) {
            highlightCName = cname
            newCA.push(highlightCName);
          } else {
            newCA.push(cname);
          }
        })
        commonName = newCA.join("; ");
        var newSA = []
        synonymName.forEach(function(sname) {
          var highlightSName;
          if (sname.match(new RegExp(regexValue, "gi"))) {
            highlightSName = sname
            newSA.push(highlightSName);
          }
          else{
           if (commonName.length > 0 && item.highlight === 'COMMON_NAME'){
            newSA.push(sname);
           }
          }
        })
        synonymName = newSA;
        var latinInnerHTMLText;
        if (commonName.length > 0) {
          if (latinName !== undefined && item.highlight !== 'SYNONYM_NAME' && latinName.split(' ')[1] !== undefined){
           latinInnerHTMLText = latinName + " " + "(" + commonName + ")"
           console.log('latinInnerHTMLText', latinInnerHTMLText)
          }
          synonymNameHTML(synonymName, item, commonName)
        } else {
        if (item.highlight !== 'SYNONYM_NAME'){
          if (latinName !== undefined  && latinName.split(' ')[1] !== undefined){
            latinInnerHTMLText = latinName
          }
        }  
          synonymNameHTML(synonymName, item, commonName)
        }
    
        if (latinInnerHTMLText) {
          finalArray.push({text: latinInnerHTMLText, hostRef: item.hostRef})
        }
        return finalArray.sort()
      }
      
       



  const onConfirm = e => {
    if (e !== undefined) {
      console.log('onConfirm', e)
      var inputHref = document.createElement('input');
      inputHref.id = 'hostRef';
      inputHref.style = 'display:none',
      inputHref.name = 'hostRef'
      inputHref.setAttribute('value', e?.hostRef);
      inputHref.ariaLabel ='hostRef'
      document.querySelector('#my-autocomplete-container').appendChild(inputHref);

    }
  }
  let hostRefElement = document.getElementById('#hostRef')

  
  accessibleAutocomplete({
    element: document.querySelector('#my-autocomplete-container'),
    id: 'my-autocomplete', // To match it to the existing <label>.
    source: fetchSuggestions,
    name: 'autocompleteSearchQuery',
    defaultValue: document.querySelector('#my-autocomplete-container').childNodes[0].value,
    tStatusQueryTooShort: 2,
    tNoResults: () => searching ? 'Searching...' : 'No results found',
     templates: { inputValue: function(asd) {
      hostRefElement?.setAttribute('value', asd?.hostRef)
      return (
        asd?.text
      )
    }
      , suggestion: function(asd) {
        return (
          '<div class="suggestions"><span class="name" id="resultName">' +
          asd?.text?.replace(new RegExp(regexValue, "gi"), match => `<strong>${match}</strong>`) +'</span></div>'
        )
      }} ,
      onConfirm: onConfirm
  })
initAll()
