import { accessibilityStatement } from '~/src/server/accessibility/index'

describe('accessibilityStatement plugin', () => {
  let mockServer

  beforeEach(() => {
    mockServer = {
      route: jest.fn()
    }
  })

  it('should register the accessibility route', async () => {
    await accessibilityStatement.plugin.register(mockServer)

    expect(mockServer.route).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          method: 'GET',
          path: '/accessibility',
          handler: expect.any(Function)
        })
      ])
    )
  })
})
