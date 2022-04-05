const { createTsJestConfig } = require('../../node_modules/@angular-ru/jest');

module.exports = createTsJestConfig({
    tsConfig: '<rootDir>/tsconfig.spec.json',
    jestConfig: {
        rootDir: __dirname,
        testMatch: ['<rootDir>/tests/**/*.spec.ts'],
        coverageDirectory: '<rootDir>/../../coverage/ngxs',
        setupFilesAfterEnv: ['<rootDir>/tests/setup-jest.ts'],
        modulePathIgnorePatterns: ['<rootDir>/../../@angular-ru'],
        cacheDirectory: '<rootDir>/../../node_modules/.cache/jest/ngxs',
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/**/*.spec.ts']
    }
});
