import type { Config } from '@jest/types';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as tsJestUtils from 'ts-jest';
import { CompilerOptions } from 'typescript';

import {
    DEFAULT_BAIL,
    DEFAULT_CACHE,
    DEFAULT_CACHE_DIR,
    DEFAULT_COLLECT_COVERAGE,
    DEFAULT_COVERAGE_REPORTS,
    DEFAULT_DISPLAY_NAME,
    DEFAULT_ISOLATED_MODULES,
    DEFAULT_MAX_CONCURRENCY,
    DEFAULT_MAX_WORKERS,
    DEFAULT_MODULE_PATH_IGNORE_PATTERS,
    DEFAULT_ONLY_CHANGED,
    DEFAULT_PRESET,
    DEFAULT_REPORTERS,
    DEFAULT_SETUP_FILES_AFTER_ENV,
    DEFAULT_TEST_PATH_IGNORE_PATTERS,
    DEFAULT_TS_JEST_IGNORE_CODES,
    DEFAULT_VERBOSE,
    DEFAULT_WATCH
} from '../constants/configurations';
import { JestConfigOptions } from '../interfaces/jest-config-options';
import { JestModuleMapper } from '../interfaces/jest-module-mapper';
import { exposeTsCompilerOptionsByTsConfig } from './expose-ts-compiler-options-by-ts-config';

// eslint-disable-next-line sonarjs/cognitive-complexity,complexity,max-lines-per-function
export function createTsJestConfig(options: JestConfigOptions): Config.InitialOptions {
    const rootDir: string = options.jestConfig?.rootDir ?? path.resolve('.');
    const resolvedRootDir: string = path.isAbsolute(rootDir) ? rootDir : path.resolve(rootDir);
    const packageJsonPath: string = path.resolve(rootDir, 'package.json');
    let displayName: string | Config.DisplayName | null | undefined;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (options.jestConfig?.displayName) {
        displayName = options.jestConfig?.displayName ?? DEFAULT_DISPLAY_NAME;
    } else if (fs.existsSync(packageJsonPath)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const packageJson: any = JSON.parse(fs.readFileSync(packageJsonPath).toString() ?? '{}');

        displayName = packageJson?.name;
    }

    displayName = displayName ?? DEFAULT_DISPLAY_NAME;

    const tsConfigPath: string = options.tsConfig.replace('<rootDir>', resolvedRootDir);

    const resolvedTsConfigPath: string = path.isAbsolute(tsConfigPath)
        ? tsConfigPath
        : path.resolve(resolvedRootDir, tsConfigPath);

    const nonExist: boolean = !fs.existsSync(resolvedTsConfigPath);

    if (nonExist) {
        throw new Error(
            `[ERROR]: Doesn't exist tsConfig by path: ${resolvedTsConfigPath}\n rootDir: ${resolvedRootDir}`
        );
    }

    const compilerOptions: CompilerOptions = exposeTsCompilerOptionsByTsConfig(resolvedTsConfigPath);
    const prefix: string = `<rootDir>/${compilerOptions?.baseUrl ?? ''}/`.replace(/\.\//g, '/').replace(/\/\/+/g, '/');
    const rootModuleNameMapper: { [key: string]: string | string[] } | null | undefined =
        tsJestUtils.pathsToModuleNameMapper(compilerOptions?.paths ?? {}, { prefix });

    const moduleNameMapper: JestModuleMapper | undefined | null =
        options.jestConfig?.moduleNameMapper ?? rootModuleNameMapper;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (options.debug) {
        console.info('[DEBUG]: rootDir:', resolvedRootDir);
        console.info('[DEBUG]: tsConfig:', resolvedTsConfigPath);
        console.info('[DEBUG]: prefix:', prefix);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        console.info('[DEBUG]: moduleNameMapper:', String(JSON.stringify(moduleNameMapper, null, 4)).toString(), '\n');
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (options.timeZone) {
        process.env.TZ = options.timeZone;
    }

    return {
        ...options.jestConfig,
        rootDir: resolvedRootDir,
        extensionsToTreatAsEsm: ['.ts'],
        displayName: displayName as string,
        cache: options.jestConfig?.cache ?? DEFAULT_CACHE,
        watch: options.jestConfig?.watch ?? DEFAULT_WATCH,
        onlyChanged: options.jestConfig?.onlyChanged ?? DEFAULT_ONLY_CHANGED,

        /**
         * A set of global variables that need to be available in all test environments.
         */
        transform: { '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular' },

        collectCoverage: options.jestConfig?.collectCoverage ?? DEFAULT_COLLECT_COVERAGE,

        globals: options.jestConfig?.globals ?? {
            'ts-jest': {
                useESM: true,
                tsconfig: resolvedTsConfigPath,
                diagnostics: {
                    pretty: true,
                    warnOnly: false,
                    ignoreCodes: DEFAULT_TS_JEST_IGNORE_CODES
                },
                isolatedModules: options.isolatedModules ?? DEFAULT_ISOLATED_MODULES,
                stringifyContentPathRegex: '\\.html$',
                astTransformers: { before: [] }
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
        moduleNameMapper: moduleNameMapper ?? {},

        /**
         * The glob patterns Jest uses to detect test files.
         */
        testMatch: options.jestConfig?.testMatch ?? [],

        preset: options.jestConfig?.preset ?? DEFAULT_PRESET,

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
        setupFilesAfterEnv: options?.jestConfig?.setupFilesAfterEnv ?? DEFAULT_SETUP_FILES_AFTER_ENV,

        /**
         * An array of regexp pattern strings that are matched against all module paths before those
         * paths are to be considered 'visible' to the module loader. If a given module's path
         * matches any of the patterns, it will not be require()-able in the test environment.
         */
        modulePathIgnorePatterns: options?.jestConfig?.modulePathIgnorePatterns ?? DEFAULT_MODULE_PATH_IGNORE_PATTERS,

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
         */
        coverageReporters: options?.jestConfig?.coverageReporters ?? DEFAULT_COVERAGE_REPORTS,

        reporters: options?.jestConfig?.reporters ?? DEFAULT_REPORTERS
    };
}
