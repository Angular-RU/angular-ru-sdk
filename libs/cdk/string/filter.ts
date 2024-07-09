// noinspection SuspiciousTypeOfGuard

import {hasNoItems} from '@angular-ru/cdk/array';
import {isFunctionLike} from '@angular-ru/cdk/function';

export type FilterPredicateFn = (
    char: string,
    index?: number,
    self?: string[],
) => boolean;
export type FilterPredicate = string[] | FilterPredicateFn | RegExp;

export function filter(value: string, predicate: FilterPredicate | '' = []): string {
    if (Array.isArray(predicate)) {
        return filterWithCharacters(value, predicate);
    }

    if (isFunctionLike(predicate)) {
        return filterWithFunction(value, predicate);
    }

    if (predicate instanceof RegExp) {
        return filterWithRegExp(value, predicate);
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
    return Array.from(value)
        .filter((element: string, index: number, array: string[]): boolean =>
            predicate(element, index, array),
        )
        .join('');
}

function filterWithRegExp(value: string, predicate: RegExp): string {
    return (value.match(predicate) ?? []).join('');
}
