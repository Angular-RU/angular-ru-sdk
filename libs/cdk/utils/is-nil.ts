import {Nullable} from '@angular-ru/cdk/typings';

export function isNil<T>(value: Nullable<T>): value is null | undefined {
    return value === null || typeof value === 'undefined';
}
