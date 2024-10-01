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
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/test-helpers',
    '<rootDir>/mock-api',
      '<rootDir>/src/server/common/helpers',
      '<rootDir>/src/client/assets/javascripts/application.js' ,
      '<rootDir>/src/client/assets/javascripts/country-search.js', 
      '<rootDir>/src/client/assets/javascripts/pest-search.js',
      '<rootDir>/src/client/assets/javascripts/plant-search.js',    
      '<rootDir>/src/router.js',
        '<rootDir>/src/server/router.js' , 
        '<rootDir>/src/server/about/index.js'
        // '<rootDir>/src/server/plant-health/format/index.js',
        // '<rootDir>/src/server/plant-health/import-confirmation/index.js',
        // '<rootDir>/src/server/plant-health/plant-details/index.js',
        // '<rootDir>/src/server/plant-health/search/index.js',
        // '<rootDir>/src/server/plant-health/purpose-of-visit/index.js',
        // '<rootDir>/src/server/plant-health/pest-search/index.js',
        // '<rootDir>/src/server/plant-health/pest-details/index.js',
        // '<rootDir>/src/server/plant-health/country-search/index.js',
        // '<rootDir>/src/config/nunjucks/context/index.js',
        // '<rootDir>/src/config/nunjucks/index.js',
        
        


    
      

  ],
  coverageDirectory: '<rootDir>/coverage'
}
