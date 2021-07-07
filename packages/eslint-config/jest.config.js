const createTsJestConfig = require('../jest-utils/lib/index').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.spec.json',
    jestConfig: {
        rootDir: '.',
        cacheDirectory: '../../.cache',
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/integration/**', '!<rootDir>/dist/**'],
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
    }
});
