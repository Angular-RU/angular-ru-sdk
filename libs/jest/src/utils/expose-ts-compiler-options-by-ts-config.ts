/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompilerOptions } from 'typescript';

import { checkIsNodeEnvironment } from './check-is-node-environment';
import { resolveTsConfigPath } from './resolve-ts-config-path';

checkIsNodeEnvironment();

const path: any = require('path');

export function exposeTsCompilerOptionsByTsConfig(tsConfigPath: string, relative?: string): CompilerOptions {
    const resolvedPath: string = resolveTsConfigPath(tsConfigPath, relative);

    const tsconfig: any = require(resolvedPath);
    const compilerOptions: CompilerOptions | null | undefined = tsconfig.compilerOptions;
    const shouldBeDiscoverPathsInParentTsConfig: boolean = !compilerOptions?.paths && tsconfig.extends;

    if (shouldBeDiscoverPathsInParentTsConfig) {
        const parentTsConfigPath: string = path.resolve(path.dirname(resolvedPath), tsconfig.extends);

        return exposeTsCompilerOptionsByTsConfig(parentTsConfigPath);
    }

    return compilerOptions ?? {};
}
