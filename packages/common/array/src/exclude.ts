import { Any } from '@angular-ru/common/typings';

export function exclude<T = Any>(valueOrValues: T | T[]): (current: T) => boolean {
    const excludeValues: T[] = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
    return function (value: T): boolean {
        return !excludeValues.includes(value);
    };
}
