const createTsJestConfig = require('./lib/index').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.json',
    jestConfig: {
        cacheDirectory: '../../.cache',
        collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts']
    }
});
