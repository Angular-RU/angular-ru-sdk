import { hasNoItems } from '@angular-ru/common/array';
import { isFunctionLike } from '@angular-ru/common/function';

export type FilterPredicateFn = (char: string) => boolean;

export function filter(value: string, predicate: string[] | FilterPredicateFn | RegExp = []): string {
    if (Array.isArray(predicate)) {
        return filterWithCharacters(value, predicate as string[]);
    }
    if (isFunctionLike(predicate)) {
        return filterWithFunction(value, predicate as FilterPredicateFn);
    }
    if (predicate instanceof RegExp) {
        return filterWithRegExp(value, predicate as RegExp);
    }
    return value;
}

function filterWithCharacters(value: string, predicate: string[] = []): string {
    if (hasNoItems(predicate)) {
        return value;
    } else {
        return Array.from(value)
            .filter((char: string): boolean => predicate.includes(char))
            .join('');
    }
}

function filterWithFunction(value: string, predicate: FilterPredicateFn): string {
    return Array.from(value).filter(predicate).join('');
}

function filterWithRegExp(value: string, predicate: RegExp): string {
    const match: RegExpMatchArray | null = value.match(predicate) ?? [];
    return match.join('');
}
