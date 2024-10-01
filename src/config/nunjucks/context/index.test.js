import path from 'path'
import { context } from '~/src/context'
import { config } from '~/src/config'
import { createLogger } from '~/src/server/common/helpers/logging/logger'
import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation'

jest.mock('path')
jest.mock('~/src/config')
jest.mock('~/src/server/common/helpers/logging/logger')
jest.mock('~/src/config/nunjucks/context/build-navigation')

describe('context', () => {
  const mockRequest = {}
  const mockLogger = {
    error: jest.fn()
  }
  const mockConfig = {
    get: jest.fn()
  }
  const mockBuildNavigation = jest.fn()

  beforeAll(() => {
    createLogger.mockReturnValue(mockLogger)
    config.get.mockImplementation((key) => {
      const configValues = {
        assetPath: '/assets',
        root: '/root',
        serviceName: 'Test Service'
      }
      return configValues[key]
    })
    buildNavigation.mockReturnValue(mockBuildNavigation)
  })

  it('should return the correct context object', () => {
    const expectedContext = {
      serviceName: 'Test Service',
      serviceUrl: '/',
      breadcrumbs: [],
      navigation: mockBuildNavigation,
      getAssetPath: expect.any(Function)
    }

    const result = context(mockRequest)
    expect(result).toEqual(expectedContext)
  })

  it('should return the correct asset path', () => {
    const mockWebpackManifest = {
      'test-asset.js': 'test-asset-hash.js'
    }
    jest.mock('/root/.public/manifest.json', () => mockWebpackManifest, { virtual: true })

    const result = context(mockRequest)
    const assetPath = result.getAssetPath('test-asset.js')
    expect(assetPath).toBe('/assets/test-asset-hash.js')
  })

  it('should log an error if the manifest file is not found', () => {
    jest.resetModules()
    jest.mock('/root/.public/manifest.json', () => { throw new Error('File not found') }, { virtual: true })

    context(mockRequest)
    expect(mockLogger.error).toHaveBeenCalledWith('Webpack Manifest assets file not found')
  })
})
