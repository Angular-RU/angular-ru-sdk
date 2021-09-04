import { Any, EmptyValue } from '@angular-ru/cdk/typings';

export function checkValueIsEmpty<T>(value: T | EmptyValue): value is EmptyValue {
    // note: don't use isString for preserve circular dependencies
    const val: Any = typeof value === 'string' ? value.trim() : value;
    return [undefined, null, NaN, '', Infinity].includes(val as Any);
}
