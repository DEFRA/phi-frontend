import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation'

const mockRequest = ({ path } = {}) => ({
  path
})

describe('#buildNavigation', () => {
  test('Should provide expected navigation details', () => {
    expect(
      buildNavigation(mockRequest({ path: '/non-existent-path' }))
    ).toEqual([
      {
        isActive: false,
        text: 'Plant-health',
        url: '/'
      },
      {
        isActive: false,
        text: 'About',
        url: '/about'
      }
    ])
  })
})
