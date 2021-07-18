const createTsJestConfig = require('../jest/lib/index').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.spec.json',
    jestConfig: {
        rootDir: '.',
        cacheDirectory: '../../.cache',
        collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
    }
});
