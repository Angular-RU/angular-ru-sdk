// @ts-ignore
const createTsJestConfig = require('../jest').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.spec.json',
    jestConfig: {
        rootDir: '.',
        cacheDirectory: '../../node_modules/.cache/jest',
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/integration/**', '!<rootDir>/dist/**'],
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
    }
});
