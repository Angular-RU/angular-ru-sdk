import type { Config } from '@jest/types';

import { JestCombinerOptions } from '../interfaces/jest-combiner-options';
import { checkIsNodeEnvironment } from './check-is-node-environment';

checkIsNodeEnvironment();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const path: any = require('path');

export function extendsTsJestConfig({ jestPresetPath, jestConfig }: JestCombinerOptions): Config.InitialOptions {
    let config: Config.InitialOptions = {};

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const resolvedJestPresetPath: string = path.isAbsolute(jestPresetPath)
        ? jestPresetPath
        : path.resolve('.', jestPresetPath);

    try {
        config = require(resolvedJestPresetPath);
        config = Object.assign(config, jestConfig);
    } catch {
        config = jestConfig;
        console.error(
            '[ERROR]: Your parent module was not found, by default you will get config:',
            JSON.stringify(config),
            '\n',
            'Your path to jest config:',
            resolvedJestPresetPath
        );
    }

    return config;
}
