const createTsJestConfig = require('../../../../../@angular-ru/jest').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './integration/tests/tsconfig.spec.json',
    jestConfig: {
        rootDir: '.',
        collectCoverage: true,
        coverageDirectory: '../../coverage/ngxs',
        cacheDirectory: '../../node_modules/.cache/jest',
        testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/integration/tests/setup-jest.ts'],
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/integration/**', '!<rootDir>/dist/**']
    }
});
