import { Any, Fn } from '@angular-ru/common/typings';

export function isFunctionLike<U = Fn>(fn: Any): fn is U {
    return typeof fn === 'function';
}

export function isNumber(value: Any): value is number {
    return typeof value === 'number';
}

export function isNil<T>(value: T | null | undefined): value is null | undefined {
    return value === null || typeof value === 'undefined';
}

export function isNotNil<T>(value: T | null | undefined): value is T {
    return !isNil(value);
}

export function isString(value: Any): value is string {
    return typeof value === 'string' && !isNil(value);
}

export function checkValueIsEmpty(value: Any): boolean {
    const val: string = typeof value === 'string' ? value.trim() : value;
    return [undefined, null, NaN, '', 'null', Infinity].includes(val);
}
