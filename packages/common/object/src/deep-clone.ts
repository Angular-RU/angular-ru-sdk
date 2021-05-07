import { isNil } from '@angular-ru/common/utils';

export function deepClone<T>(value?: T): T {
    return isNil(value) ? value : JSON.parse(JSON.stringify(value));
}
