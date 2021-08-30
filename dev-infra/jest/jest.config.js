const createTsJestConfig = require('./lib').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.spec.json',
    jestConfig: {
        cacheDirectory: '../../node_modules/.cache',
        collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts']
    }
});
