import accessibleAutocomplete from './accessible-autocomplete.min.js'
let finalArray = []
let timer

async function fetchSuggestions(query, populateResults) {
  finalArray = []
  const defaulthostref = document.querySelector('#my-autocomplete-container')
    ?.childNodes[1]
  defaulthostref?.setAttribute('value', '')
  const apiUrl = '/search/plants?searchQuery=' + query
  await clearTimeout(timer)
  timer = await setTimeout(async () => {
    try {
      if (query.length > 2) {
        const response = await fetch(apiUrl)
        const responseJSON = await response.json()
        await renderSuggestions(responseJSON, query)
        function compareNames(a, b) {
          if (a.text < b.text) {
            return -1
          }
          if (a.text > b.text) {
            return 1
          }
          return 0
        }
        populateResults(finalArray.sort(compareNames))
      }
    } catch (error) {
      // TypeError: Failed to fetch
      // console.log('Error fetching suggestions:', error)
    }
  }, 1000)
}
let regexValue
async function renderSuggestions(json, query) {
  finalArray = []
  const latinJson = json.message.plant_detail.filter(function (el) {
    return el.id === 'latin-name'
  })[0].results
  const commonJson = json.message.plant_detail.filter(function (el) {
    return el.id === 'common-name'
  })[0].results
  const synonymJson = json.message.plant_detail.filter(function (el) {
    return el.id === 'synonym-name'
  })[0].results
  regexValue = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  const latinArray = []
  const commonArray = []
  const synonymArray = []

  function getResults(latinJson, commonJson) {
    // latin name search
    if (commonArray.length === 0 && synonymArray.length === 0) {
      for (let i = 0; i < latinJson.length; i++) {
        for (let j = 0; j < latinJson[i].plantName.length; j++) {
          if (
            latinJson[i].plantName[j].type === 'LATIN_NAME' &&
            latinJson[i].plantName[j].NAME.match(new RegExp(regexValue, 'gi'))
          ) {
            latinArray.push({
              result: latinJson[i].plantName,
              hostRef: latinJson[i].hostRef,
              eppoCode: latinJson[i].eppoCode,
              highlight: 'LATIN_NAME',
              matchingText: query
            })
          }
        }
      }
    }

    // common name search
    if (synonymArray.length === 0) {
      for (let i = 0; i < commonJson.length; i++) {
        for (let j = 0; j < commonJson[i].plantName.length; j++) {
          if (commonJson[i].plantName[j].type === 'COMMON_NAME') {
            commonJson[i].plantName[j].NAME.sort().filter((name) => {
              if (name.match(new RegExp(regexValue, 'gi'))) {
                if (latinArray.length > 0) {
                  const existingArray = commonExistingNameCheck(
                    latinArray,
                    name
                  )
                  if (existingArray.length === 0) {
                    commonArray.push({
                      result: commonJson[i].plantName,
                      hostRef: commonJson[i].hostRef,
                      eppoCode: commonJson[i].eppoCode,
                      highlight: 'COMMON_NAME',
                      matchingText: query
                    })
                  }
                } else {
                  commonArray.push({
                    result: commonJson[i].plantName,
                    hostRef: commonJson[i].hostRef,
                    eppoCode: commonJson[i].eppoCode,
                    highlight: 'COMMON_NAME',
                    matchingText: query
                  })
                }
              }
              return commonArray
            })
          }
        }
      }
    }

    // synonym name search
    if (commonArray.length === 0) {
      for (let i = 0; i < synonymJson.length; i++) {
        for (let j = 0; j < synonymJson[i].plantName.length; j++) {
          if (synonymJson[i].plantName[j].type === 'SYNONYM_NAME') {
            synonymJson[i].plantName[j].NAME.filter((name) => {
              if (name.match(new RegExp(regexValue, 'gi'))) {
                if (latinArray.length > 0) {
                  const existingArray = synonymExistingNameCheck(
                    latinArray,
                    name
                  )
                  if (existingArray.length === 0) {
                    synonymArray.push({
                      result: synonymJson[i].plantName,
                      hostRef: synonymJson[i].hostRef,
                      eppoCode: synonymJson[i].eppoCode,
                      highlight: 'SYNONYM_NAME',
                      matchingText: query
                    })
                  }
                } else {
                  synonymArray.push({
                    result: synonymJson[i].plantName,
                    hostRef: synonymJson[i].hostRef,
                    eppoCode: synonymJson[i].eppoCode,
                    highlight: 'SYNONYM_NAME',
                    matchingText: query
                  })
                }
              }
              return synonymArray
            })
          }
        }
      }
    }
  }
  getResults(latinJson, commonJson)

  const resultSet = [
    {
      latinNames: latinArray,
      commonNames: commonArray,
      synonymNames: synonymArray
    }
  ]
  return await renderResultsWithHtml(resultSet)
}

function synonymExistingNameCheck(latinArray, name) {
  const existingArray = []
  latinArray.filter(function (item) {
    item.result[2].NAME?.filter(function (sname) {
      if (sname.match(new RegExp(name, 'gi'))) existingArray.push(sname)
      return existingArray
    })
    return existingArray
  })
  return existingArray
}

function commonExistingNameCheck(latinArray, name) {
  const existingArray = []
  latinArray.filter(function (item) {
    item.result[1].NAME?.filter(function (cname) {
      if (cname.match(new RegExp(name, 'gi'))) existingArray.push(cname)
      return existingArray
    })
    return existingArray
  })
  return existingArray
}
async function renderResultsWithHtml(filterResults) {
  finalArray = []
  const checkForEmptyArray = filterResults.flat()
  if (checkForEmptyArray.length > 0) {
    if (
      checkForEmptyArray[0].commonNames.length === 0 &&
      checkForEmptyArray[0].latinNames.length === 0 &&
      checkForEmptyArray[0].synonymNames.length === 0
    ) {
      return finalArray
    } else {
      filterResults.forEach(function (resultSet) {
        resultSet.latinNames.forEach(function (item, index) {
          const latinIndex = 'latinName' + index
          createAndAppendLiElement(item, latinIndex)
        })

        resultSet.commonNames.forEach(function (item, index) {
          const commonIndex = 'commonName' + index
          createAndAppendLiElement(item, commonIndex)
        })

        resultSet.synonymNames.forEach(function (item, index) {
          const synonymIndex = 'synonymName' + index
          createAndAppendLiElement(item, synonymIndex)
        })
      })
    }
  }
}

function synonymNameHTML(synonymName, item, commonName) {
  let synonymInnerHTMLText
  synonymName.forEach(function (sname, i) {
    if (commonName.length > 0) {
      synonymInnerHTMLText = sname + ' ' + '(' + commonName + ')'
    } else {
      synonymInnerHTMLText = sname
    }

    finalArray.push({ text: synonymInnerHTMLText, hostRef: item.hostRef })
    return finalArray
  })
}

function createAndAppendLiElement(item, index) {
  let latinName, commonName, synonymName
  item.result.filter(function (el) {
    if (el.type === 'LATIN_NAME') {
      latinName = el.NAME
    }
    if (el.type === 'COMMON_NAME') {
      commonName = el.NAME
    }
    if (el.type === 'SYNONYM_NAME') {
      synonymName = el.NAME
    }
    return el
  })
  const newCA = []
  commonName.forEach(function (cname) {
    let highlightCName
    if (cname.match(new RegExp(regexValue, 'gi'))) {
      highlightCName = cname
      newCA.push(highlightCName)
    } else {
      newCA.push(cname)
    }
  })
  commonName = newCA.join('; ')
  const newSA = []
  synonymName.forEach(function (sname) {
    let highlightSName
    if (sname.match(new RegExp(regexValue, 'gi'))) {
      highlightSName = sname
      newSA.push(highlightSName)
    } else {
      if (commonName.length > 0 && item.highlight === 'COMMON_NAME') {
        newSA.push(sname)
      }
    }
  })
  synonymName = newSA
  let latinInnerHTMLText
  if (commonName.length > 0) {
    if (
      latinName !== undefined &&
      item.highlight !== 'SYNONYM_NAME' &&
      latinName.split(' ')[1] !== undefined
    ) {
      latinInnerHTMLText = latinName + ' ' + '(' + commonName + ')'
    }
    synonymNameHTML(synonymName, item, commonName)
  } else {
    if (item.highlight !== 'SYNONYM_NAME') {
      if (latinName !== undefined && latinName.split(' ')[1] !== undefined) {
        latinInnerHTMLText = latinName
      }
    }
    synonymNameHTML(synonymName, item, commonName)
  }

  if (latinInnerHTMLText) {
    finalArray.push({ text: latinInnerHTMLText, hostRef: item.hostRef })
  }
  return finalArray
}

const onConfirm = (e) => {
  if (e !== undefined) {
    const existingHostRefElement = document.querySelector('#hostRef')
    document
      .querySelector('#my-autocomplete-container')
      .removeChild(existingHostRefElement)
    const inputHref = document.createElement('input')
    inputHref.id = 'hostRef'
    inputHref.style = 'display:none'
    inputHref.name = 'hostRef'
    inputHref.setAttribute('value', e?.hostRef)
    inputHref.ariaLabel = 'hostRef'
    document.querySelector('#my-autocomplete-container').appendChild(inputHref)
  }
}
const hostRefElement = document.getElementById('#hostRef')

if (document.querySelector('#my-autocomplete-container')) {
  accessibleAutocomplete({
    element: document.querySelector('#my-autocomplete-container'),
    id: 'my-autocomplete', // To match it to the existing <label>.
    source: fetchSuggestions,
    name: 'autocompleteSearchQuery',
    defaultValue: document.querySelector('#my-autocomplete-container')
      ?.childNodes[0]?.value,
    minLength: 3,
    autoselect: true,
    templates: {
      inputValue: function (asd) {
        hostRefElement?.setAttribute('value', asd?.hostRef)
        return asd?.text
      },
      suggestion: function (asd) {
        if (regexValue?.length > 0) {
          return (
            '<div class="suggestions"><span class="name" id="resultName">' +
            asd?.text?.replace(
              new RegExp(regexValue, 'gi'),
              (match) => `<strong>${match}</strong>`
            ) +
            '</span></div>'
          )
        } else {
          return (
            '<div class="suggestions"><span class="name" id="resultName">' +
            asd?.replace(
              new RegExp(asd, 'gi'),
              (match) => `<strong>${match}</strong>`
            ) +
            '</span></div>'
          )
        }
      }
    },
    onConfirm
  })
}
