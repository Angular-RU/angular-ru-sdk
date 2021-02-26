import { Any } from '@angular-ru/common/typings';
import type { Config } from '@jest/types';

import { validateOptions } from './common';
import {
    DEFAULT_BAIL,
    DEFAULT_CACHE,
    DEFAULT_CACHE_DIR,
    DEFAULT_COVERAGE_REPORTS,
    DEFAULT_DISPLAY_NAME,
    DEFAULT_MAX_CONCURRENCY,
    DEFAULT_MAX_WORKERS,
    DEFAULT_ONLY_CHANGED,
    DEFAULT_TEST_PATH_IGNORE_PATTERS,
    DEFAULT_VERBOSE,
    DEFAULT_WATCH
} from './default.config';
import { JestConfigOptions, ModuleMapper } from './jest-config.interface';

// eslint-disable-next-line sonarjs/cognitive-complexity,complexity,max-lines-per-function
export function createTsJestConfig(options: JestConfigOptions & Config.InitialOptions = {}): Config.InitialOptions {
    validateOptions(options);

    if (!options?.tsConfigSpecPath && options.debug) {
        // eslint-disable-next-line no-console
        console.log(
            `[DEBUG]: tsConfigSpecPath not initialized, use tsConfig by default for ts-jest: ${options.tsConfigRootPath}`
        );
    }

    const tsconfig: Record<string, Any> = require(options.tsConfigRootPath!);
    const { pathsToModuleNameMapper: resolver }: Any = require('ts-jest/utils');
    const prefix: Record<string, Any> = {
        prefix: `<rootDir>/${tsconfig?.compilerOptions?.baseUrl ?? ''}/`.replace(/\.\//g, '/').replace(/\/\/+/g, '/')
    };

    if (options.debug) {
        // eslint-disable-next-line no-console,@typescript-eslint/no-magic-numbers
        console.log('[DEBUG]: prefix: ', JSON.stringify(prefix, null, 4), '\n');
    }

    const rootModuleNameMapper: { [key: string]: string | string[] } = resolver(
        tsconfig?.compilerOptions?.paths ?? {},
        prefix
    );

    const moduleNameMapper: ModuleMapper = options.moduleNameMapper ?? rootModuleNameMapper;

    if (options.debug) {
        // eslint-disable-next-line no-console,@typescript-eslint/no-magic-numbers
        console.log('[DEBUG]: ', JSON.stringify(moduleNameMapper, null, 4), '\n');
    }

    // remove fields tsConfigRootPath, debug, tsConfigSpecPath
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/typedef
    const { tsConfigRootPath, debug, tsConfigSpecPath, ...jestConfig } = options;

    return {
        ...jestConfig,
        rootDir: options.rootDir,
        onlyChanged: options.onlyChanged ?? DEFAULT_ONLY_CHANGED,
        cache: options.cache ?? DEFAULT_CACHE,
        watch: options.watch ?? DEFAULT_WATCH,

        /**
         * A set of global variables that need to be available in all test environments.
         */
        globals: {
            'ts-jest': {
                isolatedModules: options.isolatedModules ?? false,
                tsconfig: options?.tsConfigSpecPath ?? options.tsConfigRootPath,
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
        bail: options.bail ?? DEFAULT_BAIL,

        /**
         * Indicates whether each individual test should be reported during the run.
         * All errors will also still be shown on the bottom after execution.
         */
        verbose: options.verbose ?? DEFAULT_VERBOSE,

        /**
         * A map from regular expressions to module names that allow to stub out resources,
         * like images or styles with a single module. Modules that are mapped to an alias are
         * un mocked by default, regardless of whether auto mocking is enabled or not.
         * Use <rootDir> string token to refer to rootDir value if you want to use file paths.
         * Additionally, you can substitute captured regex groups using numbered back references.
         */
        moduleNameMapper: options.moduleNameMapper ?? moduleNameMapper,

        /**
         * The glob patterns Jest uses to detect test files.
         */
        testMatch: options.testMatch ?? [],

        preset: 'jest-preset-angular',

        displayName: options.displayName ?? DEFAULT_DISPLAY_NAME,
        maxWorkers: options?.maxWorkers ?? DEFAULT_MAX_WORKERS,

        /**
         * An array of glob patterns indicating a set of files for which coverage
         * information should be collected. If a file matches the specified glob pattern,
         * coverage information will be collected for it even if no tests exist for this file and
         * it's never required in the test suite.
         */
        collectCoverageFrom: options.collectCoverageFrom ?? [],

        /**
         * A list of paths to modules that run some code to configure or set up the testing
         * framework before each test. Since setupFiles executes before the test framework
         * is installed in the environment, this script file presents you the opportunity
         * of running some code immediately after the test framework has been installed
         * in the environment.
         */
        setupFilesAfterEnv: options?.setupFilesAfterEnv ?? [],

        /**
         * An array of regexp pattern strings that are matched against all module paths before those
         * paths are to be considered 'visible' to the module loader. If a given module's path
         * matches any of the patterns, it will not be require()-able in the test environment.
         */
        modulePathIgnorePatterns: options?.modulePathIgnorePatterns ?? [],

        /**
         * An array of regexp pattern strings that are matched against all
         * test paths before executing the test. If the test path matches any
         * of the patterns, it will be skipped. These pattern strings match against
         * the full path. Use the <rootDir> string token to include the path to your
         * project's root directory to prevent it from accidentally ignoring all of
         * your files in different environments that may have different root directories.
         */
        testPathIgnorePatterns: options?.testPathIgnorePatterns ?? DEFAULT_TEST_PATH_IGNORE_PATTERS,

        /**
         * A number limiting the number of tests that are allowed to run at the same time when
         * using test.concurrent. Any test above this limit will be queued and executed once
         * a slot is released.
         */
        maxConcurrency: options?.maxConcurrency ?? DEFAULT_MAX_CONCURRENCY,

        /**
         * The directory where Jest should store its cached dependency information.
         */
        cacheDirectory: options?.cacheDirectory ?? DEFAULT_CACHE_DIR,

        /**
         * A list of reporter names that Jest uses when writing coverage reports.
         * Any istanbul reporter can be used.
         * https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib
         */
        coverageReporters: options?.coverageReporters ?? DEFAULT_COVERAGE_REPORTS
    };
}
