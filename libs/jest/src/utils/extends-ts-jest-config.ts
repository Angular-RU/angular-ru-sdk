import { checkIsNodeEnvironment } from '@angular-ru/cdk/node.js';
import { Any } from '@angular-ru/cdk/typings';
import { isTrue } from '@angular-ru/cdk/utils';
import type { Config } from '@jest/types';

import { JestCombinerOptions } from '../interfaces/jest-combiner-options';

checkIsNodeEnvironment();

const path: Any = require('path');

export function extendsTsJestConfig({ jestPresetPath, jestConfig }: JestCombinerOptions): Config.InitialOptions {
    let config: Config.InitialOptions = {};

    const resolvedJestPresetPath: string = isTrue(path.isAbsolute(jestPresetPath))
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
