import { Any, PlainObject } from '@angular-ru/common/typings';
import * as path from 'path';

export function exposeTsConfigExtendedCompilerOptions(tsConfigPath: string): PlainObject {
    const tsconfig: Any = require(tsConfigPath);
    const compilerOptions: PlainObject | undefined = tsconfig.compilerOptions;
    const shouldBeDiscoverPathsInParentTsConfig: boolean = !compilerOptions?.paths && !!tsconfig.extends;

    if (shouldBeDiscoverPathsInParentTsConfig) {
        const parentTsConfigPath: string = path.resolve(path.dirname(tsConfigPath), tsconfig.extends);
        return exposeTsConfigExtendedCompilerOptions(parentTsConfigPath);
    }

    return compilerOptions ?? {};
}
