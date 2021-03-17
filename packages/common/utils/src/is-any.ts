import { Any } from '@angular-ru/common/typings';

export function isAny(values: Any[]): boolean {
    return values.some((value: Any): boolean => value !== null && value !== undefined);
}
