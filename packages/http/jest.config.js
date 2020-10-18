const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    maxWorkers: 2,
    maxConcurrency: 2,
    cacheDirectory: '../../.cache',
    displayName: '@angular-ru/http',
    rootDir: path.resolve('.'),
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],
    testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
    tsConfigSpecPath: '<rootDir>/integration/tests/tsconfig.spec.json',
    setupFilesAfterEnv: ['<rootDir>/integration/tests/setupJest.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
