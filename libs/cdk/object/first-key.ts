import {Nullable} from '@angular-ru/cdk/typings';

export function firstKey<T>(object: T): Nullable<keyof T> {
    return (Object.keys(object ?? {})[0] as keyof T) ?? null;
}
