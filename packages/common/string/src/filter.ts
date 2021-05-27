import { hasNoItems } from '@angular-ru/common/array';
import { isFunctionLike } from '@angular-ru/common/function';

type FilterPredicateFn = (char: string) => boolean;

export function filter(value: string, predicate: string[] | FilterPredicateFn = []): string {
    if (Array.isArray(predicate) && hasNoItems(predicate)) {
        return value;
    }

    const list: string[] = Array.from(value);
    const filterFn: FilterPredicateFn = isFunctionLike(predicate)
        ? predicate
        : (char: string): boolean => predicate.includes(char) || char === ' ' || char === '\\s';

    return list.filter(filterFn).join('');
}
