import { Any } from '@angular-ru/common/typings';

export function $cast<T>(value: Any): T {
    return value as T;
}
