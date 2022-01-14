const { createTsJestConfig } = require('../../@angular-ru/jest');

module.exports = createTsJestConfig({
    tsConfig: '<rootDir>/tsconfig.spec.json',
    jestConfig: {
        rootDir: __dirname,
        collectCoverage: true,
        testMatch: ['<rootDir>/tests/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
        coverageDirectory: '<rootDir>/../../coverage/ngxs',
        modulePathIgnorePatterns: ['<rootDir>/../../@angular-ru'],
        cacheDirectory: '<rootDir>/../../node_modules/.cache/jest/ngxs',
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/**/*.spec.ts']
    }
});
