import { isFunctionLike } from '@angular-ru/cdk/function';

export function toStringValue<T>(value: T, converter?: (value: T) => string): string {
    return isFunctionLike(converter) ? converter(value) : (value as any)?.toString() ?? '';
}
