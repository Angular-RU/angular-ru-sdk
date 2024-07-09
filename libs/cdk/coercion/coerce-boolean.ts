import {InputBoolean} from '@angular-ru/cdk/typings';

export function coerceBoolean(value: InputBoolean): boolean {
    // note: don't use isString for preserve circular dependencies
    return typeof value === 'string'
        ? value?.trim() === '' || value?.trim() !== 'false'
        : Boolean(value);
}
