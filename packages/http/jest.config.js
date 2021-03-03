const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    cacheDirectory: '../../.cache',
    displayName: '@angular-ru/http',
    rootDir: path.resolve('.'),
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],
    testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
    tsConfigSpecPath: '<rootDir>/integration/tests/tsconfig.spec.json',
    setupFilesAfterEnv: ['<rootDir>/integration/tests/setup-jest.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
