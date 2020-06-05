export interface JestConfigOptions {
    displayName: string;
    testMatch: string[];
    debug?: boolean;
    rootDir?: string;
    tsConfigRootPath: string;
    cacheDirectory?: string;
    collectCoverageFrom: string[];
    coverageReporters?: string[];
    tsConfigSpecPath?: string;
    maxConcurrency?: number;
    setupFilesAfterEnv?: string[];
    testPathIgnorePatterns?: string[];
    modulePathIgnorePatterns?: string[];
    maxWorkers?: number | string;
    moduleNameMapper?: Record<string, string | string[]>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export interface ModuleMapper {
    [key: string]: string | string[];
}
