import { Config } from '@jest/types';

export interface JestCombinerOptions {
    jestPresetPath: string;
    jestConfig: Config.InitialOptions;
}
