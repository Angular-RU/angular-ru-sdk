import { isNil } from '@angular-ru/common/utils';

export function deepClone<T>(value: T | null | undefined): Exclude<T | null, undefined> {
    return isNil(value) ? null : JSON.parse(JSON.stringify(value));
}
