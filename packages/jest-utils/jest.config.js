const createTsJestConfig = require('./lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    debug: true,
    cacheDirectory: '../../.cache',
    displayName: '@angular-ru/jest-utils',
    rootDir: path.resolve('.'),
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
