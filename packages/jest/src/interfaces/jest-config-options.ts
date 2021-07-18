import type { Config } from '@jest/types';

export interface JestConfigOptions {
    debug?: boolean;

    tsConfig: string;

    /**
     * @description:
     * By default ts-jest uses TypeScript compiler in the context of a project (yours),
     * with full type-checking and features. But it can also be used to compile each file separately,
     * what TypeScript calls an ‘isolated module’.
     *
     * That’s what the isolatedModules option (which defaults to false) does.
     * You’ll lose type-checking ability and some features such as const enum,
     * but in the case you plan on using Jest with the cache disabled (jest --no-cache),
     * your tests will then run much faster.
     */
    isolatedModules?: boolean;

    /**
     * @description:
     * https://jestjs.io/docs/en/configuration
     */
    jestConfig?: Partial<Config.InitialOptions>;
}
