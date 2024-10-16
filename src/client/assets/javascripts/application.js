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

export function timerFunction(query, finalArray, populateResults) {
  return setTimeout(async () => {
    try {
      if (query.length > 2) {
        function compareNames(a, b) {
          if (a.text < b.text) {
            return -1
          }
          if (a.text > b.text) {
            return 1
          }
          return 0
        }
        return populateResults(finalArray.sort(compareNames))
      }
    } catch (error) {
      // TypeError: Failed to fetch
      // console.log('Error fetching suggestions:', error)
    }
  }, 1000)
}

initAll()
