const createTsJestConfig = require('../jest/dist/index').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.spec.json',
    jestConfig: {
        rootDir: '.',
        collectCoverage: true,
        cacheDirectory: '../../node_modules/.cache/jest',
        coverageDirectory: '../../coverage/eslint-config-enterprise',
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/integration/**', '!<rootDir>/dist/**'],
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
    }
});
