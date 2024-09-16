import accessibleAutocomplete from './accessible-autocomplete.min.js'
let finalArray = []
let searching = false
let timer

async function fetchSuggestions(query, populateResults) {
  finalArray = []
  const defaultcountryCode = document.querySelector(
    '#my-autocomplete-country-container'
  )?.childNodes[1]
  defaultcountryCode?.setAttribute('value', null)
  searching = true
  const apiUrl = '/search/countries?searchQuery=' + query
  await clearTimeout(timer)
  timer = await setTimeout(async () => {
    try {
      if (query.length > 2) {
        const response = await fetch(apiUrl)
        const responseJSON = await response.json()
        await renderSuggestions(responseJSON, query)
        if (finalArray.length > 0) {
          searching = false
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
      }
    } catch (error) {
      // TypeError: Failed to fetch
      // console.log('Error fetching suggestions:', error)
    }
  }, 1000)
}
let regexValue, suggestions
async function renderSuggestions(json, query) {
  finalArray = []
  if (json.length === 0 && query !== '') {
    const emptyCoutrySearchValue = document.getElementById(
      'emptyCountrySearchQuery'
    )
    emptyCoutrySearchValue.value = true
  } else {
    const newJson = json.message.countries[0].COUNTRY_GROUPING.COUNTRY_GROUPING
    suggestions = newJson.filter(function (item) {
      let result = null
      regexValue = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      if (item.COUNTRY_NAME.match(new RegExp(regexValue, 'gi'))) {
        result = item
      }
      return result
    })

    createAndAppendLiElement(suggestions)
    const autocompleteInputValue = document.getElementById(
      'emptyCountrySearchQuery'
    )
    autocompleteInputValue.value = true
  }
}
function createAndAppendLiElement(suggestions) {
  suggestions.forEach(function (item, index) {
    finalArray.push({ text: item.COUNTRY_NAME, countryCode: item.COUNTRY_CODE })
  })
}

const onConfirm = (e) => {
  if (e !== undefined) {
    const countryCode = document.createElement('input')
    countryCode.id = 'countryCode'
    countryCode.style = 'display:none'
    countryCode.name = 'countryCode'
    countryCode.setAttribute('value', e?.countryCode)
    countryCode.ariaLabel = 'countryCode'
    document
      .querySelector('#my-autocomplete-country-container')
      .appendChild(countryCode)
  }
}
if (document.querySelector('#my-autocomplete-country-container')) {
  accessibleAutocomplete({
    element: document.querySelector('#my-autocomplete-country-container'),
    id: 'my-autocomplete', // To match it to the existing <label>.
    source: fetchSuggestions,
    name: 'autocompleteCountrySearchQuery',
    defaultValue: document.querySelector('#my-autocomplete-country-container')
      ?.childNodes[0]?.value,
    tStatusQueryTooShort: 2,
    tNoResults: () => (searching ? 'Searching...' : 'No results found'),
    autoselect: true,
    templates: {
      inputValue: function (asd) {
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