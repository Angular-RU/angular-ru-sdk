import { Any } from '@angular-ru/common/typings';

import { checkIsNodeEnvironment } from '../node/check-is-node-environment';

declare const require: Any;

checkIsNodeEnvironment();

const path: Any = require('path');
const fs: Any = require('fs');

export function resolveTsConfigPath(tsConfigPath: string): string | never {
    let resolvedPath: string = path.isAbsolute(tsConfigPath) ? tsConfigPath : path.resolve('.', tsConfigPath);
    resolvedPath = resolvedPath.endsWith('.json') ? resolvedPath : `${resolvedPath}.json`;

    const nonExist: boolean = !fs.existsSync(resolvedPath);

    if (nonExist) {
        throw new Error(`Not found tsconfig file by path: ${resolvedPath}`);
    }

    return resolvedPath;
}
