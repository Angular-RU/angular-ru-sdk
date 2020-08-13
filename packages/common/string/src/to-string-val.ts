import { isFunctionLike } from '@angular-ru/common/function';
import { Any } from '@angular-ru/common/typings';

export function toStringVal<T>(value: T, converter?: (value: T) => string): string {
    return isFunctionLike(converter) ? converter(value) : (value as Any)?.toString() ?? '';
}
