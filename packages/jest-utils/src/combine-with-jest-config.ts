import type { Config } from '@jest/types';

export function combineWithJestConfig(modulePath: string, options: Config.InitialOptions = {}): Config.InitialOptions {
    let config: Config.InitialOptions = {};

    try {
        config = require(modulePath);
        config = Object.assign(config, options);
    } catch {
        config = options;
        console.error(
            '[ERROR]: Your parent module was not found, by default you will get config: ',
            JSON.stringify(config)
        );
    }

    return config;
}
