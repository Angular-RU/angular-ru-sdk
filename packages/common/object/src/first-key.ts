import { Nullable } from '@angular-ru/common/typings';

export function firstKey<T>(obj: T): Nullable<keyof T> {
    return (Object.keys(obj ?? {})[0] as keyof T) ?? null;
}
