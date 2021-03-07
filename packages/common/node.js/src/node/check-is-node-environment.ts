import { Any } from '@angular-ru/common/typings';

declare const require: Any;

export function checkIsNodeEnvironment(): boolean | never {
    if (!require) {
        throw new Error(`This code can be running only Node.js environments.`);
    }

    return true;
}
