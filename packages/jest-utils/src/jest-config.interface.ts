export interface JestConfigOptions {
    displayName: string;
    testMatch: string[];
    debug?: boolean;
    rootDir?: string;
    tsConfigRootPath: string;
    cacheDirectory?: string;
    tsConfigSpecPath?: string;
    maxConcurrency?: number;
    setupFilesAfterEnv?: string[];
    maxWorkers?: number | string;
    collectCoverageFrom: string[];
    testPathIgnorePatterns?: string[];
    modulePathIgnorePatterns?: string[];
    coverageReporters?: string[];
    moduleNameMapper?: Record<string, string | string[]>;
}

export interface ModuleMapper {
    [key: string]: string | string[];
}
