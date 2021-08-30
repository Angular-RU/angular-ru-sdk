const createTsJestConfig = require('../../../../../dev-infra/jest').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './integration/tests/jest/tsconfig.jest.json',
    jestConfig: {
        rootDir: '.',
        cacheDirectory: '../../node_modules/.cache',
        testMatch: ['<rootDir>/integration/tests/jest/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/integration/tests/jest/setup-jest.ts'],
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/integration/**', '!<rootDir>/dist/**']
    }
});
