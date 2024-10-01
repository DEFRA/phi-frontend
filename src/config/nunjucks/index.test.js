import path from 'path'
import nunjucks from 'nunjucks'
import hapiVision from '@hapi/vision'
import { nunjucksConfig } from './nunjucksConfig'
import { config } from '~/src/config'
import { context } from './context'
import * as filters from './filters'
import * as globals from './globals'

jest.mock('path')
jest.mock('nunjucks')
jest.mock('@hapi/vision')
jest.mock('~/src/config')
jest.mock('./context')
jest.mock('./filters')
jest.mock('./globals')

describe('nunjucksConfig', () => {
  const mockNunjucksEnvironment = {
    addFilter: jest.fn()
  }

  beforeAll(() => {
    nunjucks.configure.mockReturnValue(mockNunjucksEnvironment)
    config.get.mockImplementation((key) => {
      const configValues = {
        isDevelopment: true,
        isProduction: false
      }
      return configValues[key]
    })
  })

  it('should configure nunjucks environment correctly', () => {
    expect(nunjucks.configure).toHaveBeenCalledWith(
      [
        'node_modules/govuk-frontend/dist/',
        path.normalize(path.resolve(__dirname, '..', '..', 'server', 'common', 'templates')),
        path.normalize(path.resolve(__dirname, '..', '..', 'server', 'common', 'components'))
      ],
      {
        autoescape: true,
        throwOnUndefined: false,
        trimBlocks: true,
        lstripBlocks: true,
        watch: true,
        noCache: true
      }
    )
  })

  it('should add filters and globals to nunjucks environment', () => {
    Object.keys(globals).forEach((global) => {
      expect(mockNunjucksEnvironment.addFilter).toHaveBeenCalledWith(global, globals[global])
    })

    Object.keys(filters).forEach((filter) => {
      expect(mockNunjucksEnvironment.addFilter).toHaveBeenCalledWith(filter, filters[filter])
    })
  })

  it('should set up nunjucksConfig correctly', () => {
    expect(nunjucksConfig).toEqual({
      plugin: hapiVision,
      options: {
        engines: {
          njk: expect.any(Object)
        },
        compileOptions: {
          environment: mockNunjucksEnvironment
        },
        relativeTo: path.normalize(path.resolve(__dirname, '..', '..')),
        path: 'server',
        isCached: false,
        context
      }
    })
  })
})
