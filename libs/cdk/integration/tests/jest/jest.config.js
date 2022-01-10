const createTsJestConfig = require('../../../../../@angular-ru/jest').createTsJestConfig;

module.exports = createTsJestConfig({
    tsConfig: './integration/tests/jest/tsconfig.jest.json',
    jestConfig: {
        rootDir: '.',
        collectCoverage: true,
        coverageDirectory: '../../coverage/cdk',
        cacheDirectory: '../../node_modules/.cache/jest',
        testMatch: ['<rootDir>/integration/tests/jest/**/*.spec.ts'],
        setupFilesAfterEnv: ['<rootDir>/integration/tests/jest/setup-jest.ts'],
        collectCoverageFrom: [
            '<rootDir>/**/*.ts',
            '!<rootDir>/integration/**',
            '!<rootDir>/dist/**',
            '!<rootDir>/**/stream/**/*.ts'
        ]
    }
});
