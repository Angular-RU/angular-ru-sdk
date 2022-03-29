import { Hello } from '@mock/hello';

import { createTsJestConfig } from '../src';

describe('[TEST]: createTsJestConfig', () => {
    it('should be correct resolve @mock/* paths', () => {
        expect(Hello.nameClass).toBe('World');
    });

    it('should be correct create', () => {
        expect(
            createTsJestConfig({
                tsConfig: 'tsconfig.test.json',
                jestConfig: {
                    testMatch: [],
                    collectCoverageFrom: [],
                    displayName: 'Hello world',
                    rootDir: __dirname
                }
            })
        ).toEqual({
            transform: { '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular' },
            globals: {
                'ts-jest': {
                    useESM: true,
                    diagnostics: { ignoreCodes: ['6059'], pretty: true, warnOnly: false },
                    isolatedModules: false,
                    tsconfig: expect.any(String),
                    stringifyContentPathRegex: '\\.html$',
                    astTransformers: { before: [] }
                }
            },
            moduleNameMapper: {
                '^@angular\\-ru/cdk/(.*)$': '<rootDir>/../cdk/$1/src/public_api.ts',
                '^@mock/(.*)$': '<rootDir>/tests/helpers/$1'
            },
            bail: 1,
            verbose: true,
            watch: false,
            cache: true,
            testMatch: [],
            modulePathIgnorePatterns: ['.cache', 'dist', '<rootDir>/dist/'],
            onlyChanged: false,
            testPathIgnorePatterns: ['/node_modules/', '/dist/', '/e2e/'],
            preset: 'jest-preset-angular',
            displayName: 'Hello world',
            extensionsToTreatAsEsm: ['.ts'],
            rootDir: expect.any(String),
            maxWorkers: 1,
            setupFilesAfterEnv: [],
            maxConcurrency: 1,
            cacheDirectory: '<rootDir>/.cache',
            collectCoverage: false,
            coverageReporters: ['html', 'lcov', 'json', 'text', 'lcov', 'clover'],
            reporters: ['default', 'jest-junit'],
            collectCoverageFrom: []
        });
    });
});
