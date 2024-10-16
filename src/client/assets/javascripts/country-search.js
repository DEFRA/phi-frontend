import accessibleAutocomplete from './accessible-autocomplete.min.js'
import {
  timerFunction,
  inputValueTemplate,
  suggestionTemplate
} from './application.js'

let finalArray = []
let timer

async function fetchSuggestions(query, populateResults) {
  finalArray = []
  const defaultcountryCode = document.querySelector(
    '#my-autocomplete-country-container'
  )?.childNodes[1]
  defaultcountryCode?.setAttribute('value', null)
  const apiUrl = '/search/countries?searchQuery=' + query
  await clearTimeout(timer)
  const response = await fetch(apiUrl)
  const responseJSON = await response.json()
  await renderSuggestions(responseJSON, query)
  timer = timerFunction(query, finalArray, populateResults)
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
  return finalArray
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
    minLength: 3,
    autoselect: true,
    hint: true,
    hintClasses: 'custom-hint-class',
    showNoOptionsFound: false,
    templates: {
      inputValue: function (asd) {
        return inputValueTemplate(asd)
      },
      suggestion: function (asd) {
        return suggestionTemplate(asd, regexValue)
      }
    },
    onConfirm
  })
  const inputElement = document.getElementById('my-autocomplete')
  inputElement?.setAttribute('aria-label', 'autocompleteCountrySearchQuery')
}
