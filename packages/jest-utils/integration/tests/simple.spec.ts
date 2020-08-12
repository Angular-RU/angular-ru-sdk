import { createTsJestConfig } from '../../src';
// @ts-ignore
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
                testMatch: [],
                collectCoverageFrom: [],
                displayName: 'Hello world',
                tsConfigRootPath: '../tsconfig.json'
            })
        ).toEqual({
            globals: {
                'ts-jest': {
                    isolatedModules: true,
                    tsConfig: '../tsconfig.json',
                    stringifyContentPathRegex: '\\.html$',
                    astTransformers: {
                        before: [
                            'jest-preset-angular/build/InlineFilesTransformer',
                            'jest-preset-angular/build/StripStylesTransformer'
                        ]
                    }
                }
            },
            moduleNameMapper: {
                '^@mock/(.*)$': '<rootDir>/integration/tests/helpers/$1',
                '^@angular\\-ru/common$': '<rootDir>/../common/dist/library',
                '^@angular\\-ru/common/(.*)$': '<rootDir>/../common/dist/library/$1'
            },
            bail: 1,
            verbose: true,
            watch: false,
            cache: true,
            projects: ['<rootDir>'],
            testMatch: [],
            modulePathIgnorePatterns: [],
            testPathIgnorePatterns: ['/node_modules/', '/dist/'],
            preset: 'jest-preset-angular',
            displayName: 'Hello world',
            rootDir: expect.any(String),
            maxWorkers: '50%',
            setupFilesAfterEnv: [],
            maxConcurrency: 2,
            cacheDirectory: '<rootDir>/.cache',
            coverageReporters: ['html', 'lcov', 'json', 'text', 'lcov', 'clover'],
            collectCoverageFrom: []
        });
    });
});
