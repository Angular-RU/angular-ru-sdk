import {Fn} from '@angular-ru/cdk/typings';

export function $args(fn: Fn): string[] {
    return (
        String(fn) // fast to string
            .replaceAll(/\/\/.*$/gm, '') // strip single-line comments
            .replaceAll(/\s+/g, '') // strip white space
            .replaceAll(/\/\*[^*/]*\*\//g, '') // strip multi-line comments
            .split('){', 1)?.[0]
            ?.replace(/^[^(]*\(/, '') // extract the parameters
            .replaceAll(/=[^,]+/g, '') // strip any ES6 defaults
            .split(',')
            .filter(Boolean) ?? []
    ); // split & filter [""]
}
