const { createTsJestConfig } = require('../../node_modules/@angular-ru/jest');

module.exports = createTsJestConfig({
    tsConfig: '<rootDir>/tsconfig.spec.json',
    jestConfig: {
        rootDir: __dirname,
        testMatch: ['<rootDir>/tests/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/tests/setup-jest.ts'],
        collectCoverageFrom: ['<rootDir>/**/*.ts'],
        coverageDirectory: '<rootDir>/../../coverage/eslint-config-enterprise',
        cacheDirectory: '<rootDir>/../../node_modules/.cache/jest/eslint-config-enterprise'
    }
});
