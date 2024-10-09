import { searchController } from '~/src/api/search/controller'
import axios from 'axios'
import { config } from '~/src/config'

jest.mock('axios')

describe('searchController', () => {
  let request, h

  beforeEach(() => {
    request = {
      path: '',
      query: {
        searchQuery: 'testQuery'
      }
    }
    h = {
      response: jest.fn().mockReturnThis(),
      code: jest.fn()
    }
  })

  it('should return plant search results', async () => {
    request.path = '/plants'
    axios.post.mockResolvedValue({ data: 'plantData' })

    await searchController.handler(request, h)

    expect(axios.post).toHaveBeenCalledWith(
      `${config.get('backendApiUrl')}/search/plants`,
      { search: 'testQuery' }
    )
    expect(h.response).toHaveBeenCalledWith({ message: 'plantData' })
    expect(h.code).toHaveBeenCalledWith(200)
  })

  it('should return country search results', async () => {
    request.path = '/countries'
    axios.get.mockResolvedValue({ data: 'countryData' })

    await searchController.handler(request, h)

    expect(axios.get).toHaveBeenCalledWith(
      `${config.get('backendApiUrl')}/search/countries`
    )
    expect(h.response).toHaveBeenCalledWith({ message: 'countryData' })
    expect(h.code).toHaveBeenCalledWith(200)
  })

  it('should return pest search results', async () => {
    request.path = '/pests'
    axios.post.mockResolvedValue({ data: 'pestData' })

    await searchController.handler(request, h)

    expect(axios.post).toHaveBeenCalledWith(
      `${config.get('backendApiUrl')}/search/pests`,
      { search: 'testQuery' }
    )
    expect(h.response).toHaveBeenCalledWith({ message: 'pestData' })
    expect(h.code).toHaveBeenCalledWith(200)
  })

  it('should return pest details', async () => {
    request.path = '/pestdetails'
    axios.get.mockResolvedValue({ data: 'pestDetailsData' })

    await searchController.handler(request, h)

    expect(axios.get).toHaveBeenCalledWith(
      `${config.get('backendApiUrl')}/search/pestdetails`
    )
    expect(h.response).toHaveBeenCalledWith({ message: 'pestDetailsData' })
    expect(h.code).toHaveBeenCalledWith(200)
  })

  it('should handle errors gracefully', async () => {
    request.path = '/plants'
    const error = new Error('Test error')
    axios.post.mockRejectedValue(error)

    await searchController.handler(request, h)

    expect(h.response).toHaveBeenCalledWith({ message: error })
    expect(h.code).toHaveBeenCalledWith(200)
  })
})
