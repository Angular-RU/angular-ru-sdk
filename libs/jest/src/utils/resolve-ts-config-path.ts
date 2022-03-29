/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkIsNodeEnvironment } from './check-is-node-environment';

declare const require: any;

checkIsNodeEnvironment();

const path: any = require('path');
const fs: any = require('fs');

export function resolveTsConfigPath(tsConfigPath: string, relative?: string): string {
    let resolvedPath: string = (path.isAbsolute(tsConfigPath) as boolean)
        ? tsConfigPath
        : path.resolve(relative ?? '.', tsConfigPath);

    resolvedPath = resolvedPath.endsWith('.json') ? resolvedPath : `${resolvedPath}.json`;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Not found tsconfig file by path: ${resolvedPath}`);
    }

    return resolvedPath;
}
