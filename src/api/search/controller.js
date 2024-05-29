import { config } from '~/src/config'
const axios = require('axios')

const searchController = {
  handler: async (request, h) => {
    const path = request.path

    let result

    if (path.includes('plants')) {
      const searchQuery = request.query.searchQuery
      result = await invokeSearchApi(searchQuery)
    }

    if (path.includes('countries')) {
      result = await getCountries()
    }
    return h.response({ message: result }).code(200)
  }
}

async function invokeSearchApi(searchQuery) {
  try {
    const response = await axios.post(
      config.get('backendApiUrl') + '/search/plants',
      { search: searchQuery }
    )
    return response.data
  } catch (error) {
    return error // Rethrow the error so it can be handled appropriately
  }
}

async function getCountries() {
  try {
    const response = await axios.get(
      config.get('backendApiUrl') + '/search/countries'
    )
    return response.data
  } catch (error) {
    return error
  }
}

export { searchController }
