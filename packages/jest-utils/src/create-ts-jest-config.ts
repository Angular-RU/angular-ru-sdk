/* eslint-disable no-console,@typescript-eslint/no-magic-numbers */
import { Any } from '@angular-ru/common/typings';
import type { Config } from '@jest/types';
import * as fs from 'fs';
import * as path from 'path';

import {
    DEFAULT_BAIL,
    DEFAULT_CACHE,
    DEFAULT_CACHE_DIR,
    DEFAULT_COVERAGE_REPORTS,
    DEFAULT_DISPLAY_NAME,
    DEFAULT_ISOLATED_MODULES,
    DEFAULT_MAX_CONCURRENCY,
    DEFAULT_MAX_WORKERS,
    DEFAULT_ONLY_CHANGED,
    DEFAULT_TEST_PATH_IGNORE_PATTERS,
    DEFAULT_VERBOSE,
    DEFAULT_WATCH
} from './default.config';
import { exposeTsConfigExtendedCompilerOptions } from './expose-ts-config-extended-compiler-options';
import { JestConfigOptions, ModuleMapper } from './jest-config.interface';

// eslint-disable-next-line sonarjs/cognitive-complexity,complexity,max-lines-per-function
export function createTsJestConfig(options: JestConfigOptions): Config.InitialOptions {
    const rootDir: string = options.jestConfig?.rootDir ?? path.resolve('.');

    const tsConfigPath: string = path.isAbsolute(options.tsConfig)
        ? options.tsConfig
        : path.resolve(rootDir, options.tsConfig);

    const exist: boolean = fs.existsSync(tsConfigPath);

    if (!exist) {
        throw new Error(`[ERROR]: Doesn't exist tsConfig by path: ${tsConfigPath}\n rootDir: ${rootDir}`);
    }

    const compilerOptions: Record<string, Any> = exposeTsConfigExtendedCompilerOptions(tsConfigPath);

    const { pathsToModuleNameMapper: resolver }: Any = require('ts-jest/utils');

    const prefix: Record<string, Any> = {
        prefix: `<rootDir>/${compilerOptions?.baseUrl ?? ''}/`.replace(/\.\//g, '/').replace(/\/\/+/g, '/')
    };

    const rootModuleNameMapper: { [key: string]: string | string[] } = resolver(compilerOptions?.paths ?? {}, prefix);
    const moduleNameMapper: ModuleMapper = options.jestConfig?.moduleNameMapper ?? rootModuleNameMapper;

    if (options.debug) {
        console.log('[DEBUG]: rootDir: ', rootDir);
        console.log('[DEBUG]: tsConfig: ', tsConfigPath);
        console.log('[DEBUG]: prefix: ', JSON.stringify(prefix, null, 4));
        console.log('[DEBUG]: moduleNameMapper: ', JSON.stringify(moduleNameMapper, null, 4), '\n');
    }

    return {
        ...options.jestConfig,
        rootDir,
        cache: options.jestConfig?.cache ?? DEFAULT_CACHE,
        watch: options.jestConfig?.watch ?? DEFAULT_WATCH,
        onlyChanged: options.jestConfig?.onlyChanged ?? DEFAULT_ONLY_CHANGED,

        /**
         * A set of global variables that need to be available in all test environments.
         */
        globals: {
            'ts-jest': {
                tsconfig: tsConfigPath,
                isolatedModules: options.isolatedModules ?? DEFAULT_ISOLATED_MODULES,
                stringifyContentPathRegex: '\\.html$',
                astTransformers: {
                    before: [
                        'jest-preset-angular/build/InlineFilesTransformer',
                        'jest-preset-angular/build/StripStylesTransformer'
                    ]
                }
            }
        },

        /**
         * By default, Jest runs all tests and produces all errors into the console upon completion.
         * The bail config option can be used here to have Jest stop running tests after n failures.
         * Setting bail to true is the same as setting bail to 1
         */
        bail: options.jestConfig?.bail ?? DEFAULT_BAIL,

        /**
         * Indicates whether each individual test should be reported during the run.
         * All errors will also still be shown on the bottom after execution.
         */
        verbose: options.jestConfig?.verbose ?? DEFAULT_VERBOSE,

        /**
         * A map from regular expressions to module names that allow to stub out resources,
         * like images or styles with a single module. Modules that are mapped to an alias are
         * un mocked by default, regardless of whether auto mocking is enabled or not.
         * Use <rootDir> string token to refer to rootDir value if you want to use file paths.
         * Additionally, you can substitute captured regex groups using numbered back references.
         */
        moduleNameMapper,

        /**
         * The glob patterns Jest uses to detect test files.
         */
        testMatch: options.jestConfig?.testMatch ?? [],

        preset: 'jest-preset-angular',

        displayName: options.jestConfig?.displayName ?? DEFAULT_DISPLAY_NAME,
        maxWorkers: options?.jestConfig?.maxWorkers ?? DEFAULT_MAX_WORKERS,

        /**
         * An array of glob patterns indicating a set of files for which coverage
         * information should be collected. If a file matches the specified glob pattern,
         * coverage information will be collected for it even if no tests exist for this file and
         * it's never required in the test suite.
         */
        collectCoverageFrom: options.jestConfig?.collectCoverageFrom ?? [],

        /**
         * A list of paths to modules that run some code to configure or set up the testing
         * framework before each test. Since setupFiles executes before the test framework
         * is installed in the environment, this script file presents you the opportunity
         * of running some code immediately after the test framework has been installed
         * in the environment.
         */
        setupFilesAfterEnv: options?.jestConfig?.setupFilesAfterEnv ?? [],

        /**
         * An array of regexp pattern strings that are matched against all module paths before those
         * paths are to be considered 'visible' to the module loader. If a given module's path
         * matches any of the patterns, it will not be require()-able in the test environment.
         */
        modulePathIgnorePatterns: options?.jestConfig?.modulePathIgnorePatterns ?? [],

        /**
         * An array of regexp pattern strings that are matched against all
         * test paths before executing the test. If the test path matches any
         * of the patterns, it will be skipped. These pattern strings match against
         * the full path. Use the <rootDir> string token to include the path to your
         * project's root directory to prevent it from accidentally ignoring all of
         * your files in different environments that may have different root directories.
         */
        testPathIgnorePatterns: options?.jestConfig?.testPathIgnorePatterns ?? DEFAULT_TEST_PATH_IGNORE_PATTERS,

        /**
         * A number limiting the number of tests that are allowed to run at the same time when
         * using test.concurrent. Any test above this limit will be queued and executed once
         * a slot is released.
         */
        maxConcurrency: options?.jestConfig?.maxConcurrency ?? DEFAULT_MAX_CONCURRENCY,

        /**
         * The directory where Jest should store its cached dependency information.
         */
        cacheDirectory: options?.jestConfig?.cacheDirectory ?? DEFAULT_CACHE_DIR,

        /**
         * A list of reporter names that Jest uses when writing coverage reports.
         * Any istanbul reporter can be used.
         * https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib
         */
        coverageReporters: options?.jestConfig?.coverageReporters ?? DEFAULT_COVERAGE_REPORTS
    };
}
