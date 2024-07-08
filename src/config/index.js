import convict from 'convict'
import path from 'node:path'

const oneWeek = 7 * 24 * 60 * 60 * 1000

const config = convict({
  locale: {
    value: 'en_gb'
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  staticCacheTimeout: {
    doc: 'Static cache timeout in milliseconds',
    format: Number,
    default: oneWeek,
    env: 'STATIC_CACHE_TIMEOUT'
  },
  serviceName: {
    doc: 'Applications Service Name',
    format: String,
    default: ''
  },
  root: {
    doc: 'Project root',
    format: String,
    default: path.normalize(path.join(__dirname, '..', '..'))
  },
  assetPath: {
    doc: 'Asset path',
    format: String,
    default: '/public',
    env: 'ASSET_PATH'
  },
  isProduction: {
    doc: 'If this application running in the production environment',
    format: Boolean,
    default: process.env.NODE_ENV === 'production'
  },
  isDevelopment: {
    doc: 'If this application running in the development environment',
    format: Boolean,
    default: process.env.NODE_ENV !== 'production'
  },
  isTest: {
    doc: 'If this application running in the test environment',
    format: Boolean,
    default: process.env.NODE_ENV === 'test'
  },
  logLevel: {
    doc: 'Logging level',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
    default: 'info',
    env: 'LOG_LEVEL'
  },
  httpProxy: {
    doc: 'HTTP Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTP_PROXY'
  },
  httpsProxy: {
    doc: 'HTTPS Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTPS_PROXY'
  },
  backendApiUrl: {
    doc: 'Backend api url',
    format: String,
    default: `http://localhost:3049`,
    env: 'BACKEND_API_URL'
  },
  frontendUrl: {
    doc: 'Frontend url',
    format: String,
    default: `http://localhost:3000`,
    env: 'FRONTEND_URL'
  },
  photoURL: {
    doc: 'photo url',
    format: String,
    default: `https://gd.eppo.int/taxon/`,
    env: 'phot_URL'
  },
  Annex3: {
    doc: 'Annex3',
    format: String,
    default: `https://www.legislation.gov.uk/uksi/2020/1527/schedule/3/made`,
    env: 'Annex3'
  },
  contactAuthorities: {
    doc: 'contactAuthorities',
    format: String,
    default: `https://planthealthportal.defra.gov.uk/pests-and-diseases/reporting-a-pestdisease/`,
    env: 'contactAuthorities'
  }
})

config.validate({ allowed: 'strict' })

export { config }
