import {isFalse} from '@angular-ru/cdk/utils';

import {checkIsNodeEnvironment} from '../node/check-is-node-environment';

declare const require: any;

checkIsNodeEnvironment();

const path: any = require('node:path');
const fs: any = require('node:fs');

export function resolveTsConfigPath(
    tsConfigPath: string,
    relative?: string,
): never | string {
    let resolvedPath: string = (path.isAbsolute(tsConfigPath) as boolean)
        ? tsConfigPath
        : path.resolve(relative ?? '.', tsConfigPath);

    resolvedPath = resolvedPath.endsWith('.json') ? resolvedPath : `${resolvedPath}.json`;

    if (isFalse(fs.existsSync(resolvedPath))) {
        throw new Error(`Not found tsconfig file by path: ${resolvedPath}`);
    }

    return resolvedPath;
}
