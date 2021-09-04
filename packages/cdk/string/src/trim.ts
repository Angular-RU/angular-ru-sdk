import { Nullable } from '@angular-ru/cdk/typings';

export function trim(value?: Nullable<string>): Nullable<string> {
    // note: don't use isString for preserve circular dependencies
    return typeof value === 'string' ? value?.trim() : value;
}
