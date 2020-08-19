import { isNotNil } from '@angular-ru/common/utils';

export function toNumber(value: number | string, fallback?: number): number {
    const result: number = parseFloat(value?.toString().trim().replace(/\s+/g, ''));
    return isNotNil(fallback) ? result || fallback : result;
}
