const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.spec.json',
    jestConfig: {
        rootDir: '.',
        cacheDirectory: '../../.cache',
        displayName: '@angular-ru/websocket',
        modulePathIgnorePatterns: ['<rootDir>/dist/'],
        collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
    }
});
