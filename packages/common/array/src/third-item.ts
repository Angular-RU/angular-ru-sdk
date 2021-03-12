import { Any } from '@angular-ru/common/typings';

export function thirdItem<T>(array?: T[] | null | undefined, fallback: Any = null): T | null {
    const thirdItemIndex: number = 2;
    return Array.isArray(array) && array.length ? array[thirdItemIndex] ?? fallback : null!;
}
