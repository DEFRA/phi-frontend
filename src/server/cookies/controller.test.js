import { cookiesController } from '~/src/server/cookies/controller'
import { getDefaultLocaleData } from '~/src/server/localisation'

jest.mock('~/src/server/localisation')
jest.mock('~/src/server/common/helpers/errors')

describe('cookiesController', () => {
  let request, h

  beforeEach(() => {
    request = {
      yar: {
        get: jest.fn(),
        set: jest.fn()
      },
      query: {}
    }
    h = {
      view: jest.fn()
    }
  })

  it('should handle cookies redirection page', async () => {
    // request.query.format = 'someFormat'
    getDefaultLocaleData.mockResolvedValue({
      mainContent: 'mainContent',
      getHelpSection: 'getHelpSection'
    })

    await cookiesController.handler(request, h)

    // expect(request.yar.set).toHaveBeenCalledWith('format', {
    //   value: 'someFormat'
    // })

    expect(h.view).toHaveBeenCalledWith(
      'cookies/index',
      expect.objectContaining({
        getHelpSection: 'getHelpSection',
        headings: undefined,
        paragraphs: undefined,
        table1: undefined,
        table2: undefined,
        title: undefined
      })
    )
  })
})
