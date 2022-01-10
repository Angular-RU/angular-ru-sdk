const createTsJestConfig = require('./dist').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.spec.json',
    jestConfig: {
        collectCoverage: true,
        coverageDirectory: '../../coverage/jest',
        cacheDirectory: '../../node_modules/.cache/jest',
        collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts']
    }
});
