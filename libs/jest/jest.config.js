const { createTsJestConfig } = require('../../node_modules/@angular-ru/jest');

module.exports = createTsJestConfig({
    tsConfig: '<rootDir>/tsconfig.spec.json',
    jestConfig: {
        rootDir: __dirname,
        testMatch: ['<rootDir>/tests/**/*.spec.ts'],
        coverageDirectory: '<rootDir>/../../coverage/jest',
        cacheDirectory: '<rootDir>/../../node_modules/.cache/jest/jest-lib',
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/**/*.spec.ts']
    }
});
