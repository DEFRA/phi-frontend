import { initAll } from 'govuk-frontend'

import '../stylesheets/application.scss'

import '../images/favicon.ico'
import '../images/favicon.svg'
import '../images/govuk-icon-180.png'
import '../images/govuk-icon-192.png'
import '../images/govuk-icon-512.png'
import '../images/govuk-icon-mask.svg'
import './plant-search.js'
import './pest-search.js'
import './country-search.js'

function compareNames(a, b) {
  if (a.text < b.text) {
    return -1
  }
  if (a.text > b.text) {
    return 1
  }
  return 0
}

export function timerFunction(query, finalArray, populateResults) {
  return setTimeout(async () => {
    try {
      if (query.length > 2) {
        return populateResults(finalArray.sort(compareNames))
      }
    } catch (error) {
      // TypeError: Failed to fetch
      // console.log('Error fetching suggestions:', error)
    }
  }, 1000)
}

export function inputValueTemplate(asd) {
  return asd?.text
}

export function suggestionTemplate(asd, regexValue) {
  const inputElementCustom =
    document.getElementsByClassName('custom-hint-class')
  inputElementCustom[0]?.setAttribute('aria-label', 'autocomplete__hint')
  inputElementCustom[0]?.setAttribute('id', 'autocomplete__hint')
  let template
  if (regexValue?.length > 0) {
    template =
      '<div class="suggestions"><span class="name" id="resultName">' +
      asd?.text?.replace(
        new RegExp(regexValue, 'gi'),
        (match) => `<strong>${match}</strong>`
      ) +
      '</span></div>'
  } else {
    template =
      '<div class="suggestions"><span class="name" id="resultName">' +
      asd?.replace(
        new RegExp(asd, 'gi'),
        (match) => `<strong>${match}</strong>`
      ) +
      '</span></div>'
  }
  return template
}

initAll()
