const createTsJestConfig = require('./lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    debug: true,
    cacheDirectory: '../../.cache',
    displayName: '@angular-ru/jest-utils',
    rootDir: path.resolve('.'),
    testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
