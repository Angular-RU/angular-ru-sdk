import {isNil} from '@angular-ru/cdk/utils';

export function deepClone<T>(value?: T): T {
    return isNil(value) ? value : JSON.parse(JSON.stringify(value));
}
