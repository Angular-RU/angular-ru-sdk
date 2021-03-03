const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    isolatedModules: true,
    cacheDirectory: '../../.cache',
    rootDir: path.resolve('.'),
    displayName: '@angular-ru/common',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/integration/tests/setup-jest.ts'],
    tsConfigRootPath: path.resolve('./integration/tests/tsconfig.spec.json'),
    collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/integration/**', '!<rootDir>/dist/**']
});
