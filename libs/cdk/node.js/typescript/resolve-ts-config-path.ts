import {isFalse} from '@angular-ru/cdk/utils';

import {checkIsNodeEnvironment} from '../node/check-is-node-environment';

declare const require: any;

checkIsNodeEnvironment();

const path: any = require('path');
const fs: any = require('fs');

export function resolveTsConfigPath(
    tsConfigPath: string,
    relative?: string,
): string | never {
    let resolvedPath: string = (path.isAbsolute(tsConfigPath) as boolean)
        ? tsConfigPath
        : path.resolve(relative ?? '.', tsConfigPath);

    resolvedPath = resolvedPath.endsWith('.json') ? resolvedPath : `${resolvedPath}.json`;

    if (isFalse(fs.existsSync(resolvedPath))) {
        throw new Error(`Not found tsconfig file by path: ${resolvedPath}`);
    }

    return resolvedPath;
}
