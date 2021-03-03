const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    cacheDirectory: '../../.cache',
    rootDir: path.resolve('.'),
    displayName: '@angular-ru/ng-table-builder',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/integration/tests/setup-jest.ts'],
    tsConfigRootPath: path.resolve('./integration/tests/tsconfig.spec.json')
});
