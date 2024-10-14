import { accessibiltyController } from '~/src/server/accessibility/controller.js'
import { getDefaultLocaleData } from '../localisation'

jest.mock('../localisation')

describe('accessibiltyController', () => {
  let request, h

  beforeEach(() => {
    request = {} // Mock request object
    h = {
      view: jest.fn()
    } // Mock h object with view method
  })

  it('should render the accessibility page with the correct data', async () => {
    const mockData = {
      mainContent: '<p>Accessibility content</p>'
    }
    getDefaultLocaleData.mockResolvedValue(mockData)

    await accessibiltyController.handler(request, h)

    expect(getDefaultLocaleData).toHaveBeenCalledWith('accessibility')
    expect(h.view).toHaveBeenCalledWith('accessibility/index', {
      pageTitle:
        'Accessibilty statement — Check plant health information and import rules — GOV.UK',
      heading: '',
      mainContent: mockData.mainContent
    })
  })
})
