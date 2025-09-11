/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'jsdom',              // so you can test DOM code
    roots: ['<rootDir>/tests'],            // keep tests out of your theme bundle
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'json'],
    transform: { '^.+\\.[mc]?js$': 'babel-jest' },
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
    // prevent style/file imports from breaking tests
    moduleNameMapper: {
      '\\.(css|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
      '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js'
    }
  };
  