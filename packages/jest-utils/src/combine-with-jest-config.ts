import type { Config } from '@jest/types';

export interface CombineWithJestConfig {
    basePath?: string;
    jestPresetConfigPath: string;
    options: Config.InitialOptions;
}

// eslint-disable-next-line max-lines-per-function
export function combineWithJestConfig(options: CombineWithJestConfig): Config.InitialOptions {
    let config: Config.InitialOptions = {};
    const modulePathAbsolute: string = require('path').resolve(
        options.basePath ?? process.cwd(),
        options.jestPresetConfigPath
    );

    try {
        config = require(modulePathAbsolute);
        config = Object.assign(config, options.options);
    } catch {
        config = options.options;
        console.error(
            '[ERROR]: Your parent module was not found, by default you will get config: ',
            JSON.stringify(config),
            '\n',
            'Your path to jest config: ',
            modulePathAbsolute
        );
    }

    return config;
}
