const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './integration/tests/tsconfig.spec.json',
    jestConfig: {
        rootDir: '.',
        cacheDirectory: '../../.cache',
        displayName: '@angular-ru/common',
        modulePathIgnorePatterns: ['<rootDir>/dist/'],
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/integration/tests/setup-jest.ts'],
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/integration/**', '!<rootDir>/dist/**']
    }
});
