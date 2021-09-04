import { Any } from '@angular-ru/cdk/typings';

export function $cast<T>(value: Any): T {
    return value as T;
}
