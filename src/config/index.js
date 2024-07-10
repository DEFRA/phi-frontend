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
   default: `https://phi-etl-fera-backend.dev.cdp-int.defra.cloud`,  
  },
  frontendUrl: {
    doc: 'Frontend url',
    format: String,  
    default: `https://phi-frontend.test.cdp-int.defra.cloud`,
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
  },
  redis: {
    enabled: {
      doc: 'Enable Redis on your Frontend. Before you enable Redis, contact the CDP platform team as we need to set up config so you can run Redis in CDP environments',
      format: Boolean,
      default: false,
      env: 'REDIS_ENABLED'
    },
    host: {
      doc: 'Redis cache host',
      format: String,
      default: '127.0.0.1',
      env: 'REDIS_HOST'
    },
    username: {
      doc: 'Redis cache username',
      format: String,
      default: '',
      env: 'REDIS_USERNAME'
    },
    password: {
      doc: 'Redis cache password',
      format: '*',
      default: '',
      sensitive: true,
      env: 'REDIS_PASSWORD'
    },
    keyPrefix: {
      doc: 'Redis cache key prefix name used to isolate the cached results across multiple clients',
      format: String,
      default: 'phi-frontend',
      env: 'REDIS_KEY_PREFIX'
    },
    useSingleInstanceCache: {
      doc: 'Enable the use of a single instance Redis Cache',
      format: Boolean,
      default: process.env.NODE_ENV !== 'production',
      env: 'USE_SINGLE_INSTANCE_CACHE'
    }
  },
  phiPassword: {
    doc: 'password for phi',
    format: '*',
    default: 'demo123',
    sensitive: true,
    env: 'PHI_PASSWORD'
  },
  cookiePassword: {
    doc: 'password for  cookie',
    format: '*',
    default: 'the-password-must-be-at-least-32-characters-long',
    sensitive: true,
    env: 'COOKIE_PASSWORD'
  },
  sessionCookiePassword: {
    doc: 'session password for  cookie',
    format: '*',
    default: 'the-password-must-be-at-least-32-characters-long',
    sensitive: true,
    env: 'SESSION_COOKIE_PASSWORD'
  }
})

config.validate({ allowed: 'strict' })

export { config }
