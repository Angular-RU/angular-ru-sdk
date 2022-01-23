import { isFunctionLike } from '@angular-ru/cdk/function';
import { Any } from '@angular-ru/cdk/typings';

export function toStringValue<T>(value: T, converter?: (value: T) => string): string {
    return isFunctionLike(converter) ? converter(value) : (value as Any)?.toString() ?? '';
}
