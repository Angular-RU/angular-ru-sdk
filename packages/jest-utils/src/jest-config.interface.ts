export interface JestConfigOptions {
    rootDir?: string;
    displayName?: string;
    testMatch?: string[];
    cacheDirectory?: string;
    maxConcurrency?: number;
    setupFilesAfterEnv?: string[];
    maxWorkers?: number | string;
    collectCoverageFrom?: string[];
    testPathIgnorePatterns?: string[];
    modulePathIgnorePatterns?: string[];
    coverageReporters?: string[];
    moduleNameMapper?: Record<string, string | string[]>;
    /* custom: */
    tsConfigRootPath?: string;
    tsConfigSpecPath?: string;
    debug?: boolean;
}

export interface ModuleMapper {
    [key: string]: string | string[];
}
