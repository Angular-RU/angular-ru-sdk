const {createTsJestConfig} = require('../../node_modules/@angular-ru/jest');

module.exports = createTsJestConfig({
    tsConfig: '<rootDir>/tsconfig.spec.json',
    jestConfig: {
        rootDir: __dirname,
        testMatch: ['<rootDir>/tests/**/*.spec.ts'],
        coverageDirectory: '<rootDir>/../../coverage/cdk',
        setupFilesAfterEnv: ['<rootDir>/tests/setup-jest.ts'],
        cacheDirectory: '<rootDir>/../../node_modules/.cache/jest/cdk',
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/**/*.spec.ts'],
    },
    timeZone: 'UTC',
});
