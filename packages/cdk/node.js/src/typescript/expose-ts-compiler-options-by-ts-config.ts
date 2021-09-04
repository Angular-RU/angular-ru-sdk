import { Any, Nullable } from '@angular-ru/cdk/typings';
import { isNil, isNotNil } from '@angular-ru/cdk/utils';
import { CompilerOptions } from 'typescript';

import { checkIsNodeEnvironment } from '../node/check-is-node-environment';
import { resolveTsConfigPath } from './resolve-ts-config-path';

declare const require: Any;

checkIsNodeEnvironment();

const path: Any = require('path');

export function exposeTsCompilerOptionsByTsConfig(tsConfigPath: string): CompilerOptions {
    const resolvedPath: string = resolveTsConfigPath(tsConfigPath);

    const tsconfig: Any = require(resolvedPath);
    const compilerOptions: Nullable<CompilerOptions> = tsconfig.compilerOptions;
    const shouldBeDiscoverPathsInParentTsConfig: boolean = isNil(compilerOptions?.paths) && isNotNil(tsconfig.extends);

    if (shouldBeDiscoverPathsInParentTsConfig) {
        const parentTsConfigPath: string = path.resolve(path.dirname(resolvedPath), tsconfig.extends);
        return exposeTsCompilerOptionsByTsConfig(parentTsConfigPath);
    }

    return compilerOptions ?? {};
}
