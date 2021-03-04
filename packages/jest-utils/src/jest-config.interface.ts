import type { Config } from '@jest/types';

export interface JestConfigOptions {
    debug?: boolean;
    tsConfig: string;
    isolatedModules?: boolean;
    jestConfig?: Partial<Config.InitialOptions>;
}

export interface ModuleMapper {
    [key: string]: string | string[];
}
