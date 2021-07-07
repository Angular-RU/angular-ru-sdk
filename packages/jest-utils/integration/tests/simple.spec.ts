import { createTsJestConfig } from '../../src';
import { Hello } from '@mock/hello';

describe('[TEST]: Hello world', () => {
    it('should be', () => {
        expect(1 + 2).toEqual(3);
    });

    it('should be correct resolve paths', () => {
        expect(Hello.nameClass).toEqual('World');
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
            transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
            globals: {
                'ts-jest': {
                    diagnostics: { ignoreCodes: ['6059'], pretty: true, warnOnly: false },
                    isolatedModules: false,
                    tsconfig: expect.any(String),
                    stringifyContentPathRegex: '\\.html$',
                    astTransformers: { before: [] }
                }
            },
            moduleNameMapper: {
                '^@angular\\-ru/common/(.*)$': '<rootDir>/../common/$1/src/public_api.ts',
                '^@mock/(.*)$': '<rootDir>/integration/tests/helpers/$1'
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
            rootDir: expect.any(String),
            maxWorkers: 2,
            setupFilesAfterEnv: [],
            maxConcurrency: 2,
            cacheDirectory: '<rootDir>/.cache',
            coverageReporters: ['html', 'lcov', 'json', 'text', 'lcov', 'clover'],
            collectCoverageFrom: []
        });
    });
});
