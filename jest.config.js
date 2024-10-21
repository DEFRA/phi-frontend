module.exports = {
  rootDir: '.',
  testEnvironment: 'jsdom',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  silent: true,
  coverageProvider: 'v8',
  testMatch: ['**/src/**/*.test.js'],
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  collectCoverage: true,
  testTimeout: 80000,
  coverageReporters: ['html', 'text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/test-helpers',
    '<rootDir>/mock-api',
    '<rootDir>/src/server/common/helpers',
    '<rootDir>/src/client/assets/javascripts/application.js',
    '<rootDir>/src/client/assets/javascripts/country-search.js',
    '<rootDir>/src/client/assets/javascripts/pest-search.js',
    '<rootDir>/src/client/assets/javascripts/plant-search.js',
    '<rootDir>/src/router.js',
    '<rootDir>/src/index.js',
    '<rootDir>/src/server/router.js',
    '<rootDir>/src/server/index.js',
    '<rootDir>/src/server/localisation.js',
    '<rootDir>/src/config/nunjucks/context/index.js',
    '<rootDir>/src/config/nunjucks/index.js',
    '<rootDir>/webpack/universalModuleDefinition',
    '<rootDir>/src/api/search/index.js',
   '<rootDir>/src/server/plant-health/index.js',
   '<rootDir>/src/config/nunjucks/context/build-navigation.js'
  ],
  coverageDirectory: '<rootDir>/coverage'
}
