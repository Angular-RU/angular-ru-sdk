import {Fn} from '@angular-ru/cdk/typings';

export function $args(fn: Fn): string[] {
    return (
        String(fn) // fast to string
            .replace(/\/\/.*$/gm, '') // strip single-line comments
            .replace(/\s+/g, '') // strip white space
            .replace(/\/\*[^*/]*\*\//g, '') // strip multi-line comments
            .split('){', 1)?.[0]
            ?.replace(/^[^(]*\(/, '') // extract the parameters
            .replace(/=[^,]+/g, '') // strip any ES6 defaults
            .split(',')
            .filter(Boolean) ?? []
    ); // split & filter [""]
}
