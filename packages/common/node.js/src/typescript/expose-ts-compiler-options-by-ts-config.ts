import { Any } from '@angular-ru/common/typings';
import { CompilerOptions } from 'typescript';

import { checkIsNodeEnvironment } from '../node/check-is-node-environment';
import { resolveTsConfigPath } from './resolve-ts-config-path';

declare const require: Any;

checkIsNodeEnvironment();

const path: Any = require('path');

export function exposeTsCompilerOptionsByTsConfig(tsConfigPath: string): CompilerOptions {
    const resolvedPath: string = resolveTsConfigPath(tsConfigPath);

    const tsconfig: Any = require(resolvedPath);
    const compilerOptions: CompilerOptions | undefined = tsconfig.compilerOptions;
    const shouldBeDiscoverPathsInParentTsConfig: boolean = !compilerOptions?.paths && !!tsconfig.extends;

    if (shouldBeDiscoverPathsInParentTsConfig) {
        const parentTsConfigPath: string = path.resolve(path.dirname(resolvedPath), tsconfig.extends);
        return exposeTsCompilerOptionsByTsConfig(parentTsConfigPath);
    }

    return compilerOptions ?? {};
}
