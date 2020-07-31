import { Any } from '@angular-ru/common/typings';

export function toStringVal<T>(value: T, converter?: (value: T) => string): string {
    return converter ? converter(value) : (value as Any)?.toString() ?? '';
}
