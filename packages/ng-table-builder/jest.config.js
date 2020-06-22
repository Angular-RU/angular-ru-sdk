const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    maxWorkers: 2,
    maxConcurrency: 2,
    cacheDirectory: '../../.cache',
    rootDir: path.resolve('.'),
    displayName: '@angular-ru/ng-table-builder',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
    tsConfigSpecPath: '<rootDir>/integration/tests/tsconfig.spec.json',
    setupFilesAfterEnv: ['<rootDir>/integration/tests/setupJest.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
