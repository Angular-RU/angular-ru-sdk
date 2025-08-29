import {EmptyValue} from '@angular-ru/cdk/typings';

export function checkValueIsEmpty<T>(value: EmptyValue | T): value is EmptyValue {
    // note: don't use isString for preserve circular dependencies
    const nextValue: any = typeof value === 'string' ? value.trim() : value;

    return ['', Infinity, NaN, null, undefined].includes(nextValue);
}
