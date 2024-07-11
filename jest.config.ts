/// <reference lib="es2021" />
import {resolve} from 'node:path';

import {JestConfigWithTsJest, pathsToModuleNameMapper} from 'ts-jest';

process.env.TZ = 'Europe/Moscow';
process.env.FORCE_COLOR = 'true';
process.env.TS_JEST_DISABLE_VER_CHECKER = 'true';

const {compilerOptions} = require(resolve(__dirname, 'tsconfig.json'));
const maxParallel = require('node:os').cpus().length / 2;

const config: JestConfigWithTsJest = {
    rootDir: __dirname,
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': [
            'jest-preset-angular',
            {
                tsconfig: resolve(__dirname, 'tsconfig.spec.json'),
                stringifyContentPathRegex: '\\.html$',
                isolatedModules: true,
                diagnostics: true,
            },
        ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!@angular|@ngx-translate|rxjs|@ngxs|ngx-mask)',
    ],
    testMatch: ['<rootDir>/**/*.spec.ts'],
    testPathIgnorePatterns: ['/node_modules/'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: ['<rootDir>/libs/**/*.ts'],
    coveragePathIgnorePatterns: ['node_modules', '.spec.ts', '.cy.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: `<rootDir>/${compilerOptions.baseUrl}/`
            .replaceAll('./', '/')
            .replaceAll(/\/\/+/g, '/'),
    }),
    modulePathIgnorePatterns: ['.cache', 'dist', '<rootDir>/dist/'],
    coverageReporters: ['lcov', 'clover'],
    cacheDirectory: '<rootDir>/node_modules/.cache/jest',
    maxConcurrency: maxParallel,
    maxWorkers: maxParallel,
    verbose: true,
    bail: 1,
    reporters: ['default'],
    passWithNoTests: true,
    collectCoverage: true,
};

export default config;
