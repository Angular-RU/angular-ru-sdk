import { Any } from '@angular-ru/cdk/typings';
import { isFalse } from '@angular-ru/cdk/utils';

import { checkIsNodeEnvironment } from '../node/check-is-node-environment';

declare const require: Any;

checkIsNodeEnvironment();

const path: Any = require('path');
const fs: Any = require('fs');

export function resolveTsConfigPath(tsConfigPath: string, relative?: string): string | never {
    let resolvedPath: string = (path.isAbsolute(tsConfigPath) as boolean)
        ? tsConfigPath
        : path.resolve(relative ?? '.', tsConfigPath);

    resolvedPath = resolvedPath.endsWith('.json') ? resolvedPath : `${resolvedPath}.json`;

    if (isFalse(fs.existsSync(resolvedPath))) {
        throw new Error(`Not found tsconfig file by path: ${resolvedPath}`);
    }

    return resolvedPath;
}
