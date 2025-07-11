import {PlainObject, PlainObjectOf} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty, isTrue} from '@angular-ru/cdk/utils';

import {
    ComparableKeys,
    ExtraObjectOptions,
    ObjectExtraOptions,
    ObjectReduceOptions,
} from './internal/extra-object-options';
import {isObject} from './is-object';

export function unwrap<T>(target: any, options: ObjectExtraOptions): T {
    return Object.keys(target)
        .sort((a, b) => a.localeCompare(b))
        .reduce(
            (accumulator: T, key: string): T =>
                deepObjectReduce<T>({
                    key,
                    accumulator,
                    targetValue: target?.[key],
                    options,
                }),
            {} as T,
        );
}

export function flatten<T = string>(
    object: PlainObject,
    excludeKeys: string[] = [],
): PlainObjectOf<T> {
    const depthGraph: PlainObjectOf<T> = {};

    for (const key in object) {
        if (object.hasOwnProperty(key) && !excludeKeys.includes(key)) {
            mutate<T>(object, depthGraph, key);
        }
    }

    return depthGraph;
}

export function mutate<T>(
    object: PlainObject,
    depthGraph: PlainObjectOf<T>,
    key: string,
): void {
    const isObjectLike: boolean =
        typeof object[key] === 'object' && object[key] !== null!;

    if (isObjectLike) {
        const flatObject: PlainObject = flatten(object[key]);

        for (const path in flatObject) {
            if (flatObject.hasOwnProperty(path)) {
                depthGraph[`${key}.${path}`] = flatObject[path];
            }
        }
    } else {
        depthGraph[key] = object[key];
    }
}

export function deepObjectReduce<T>({
    accumulator,
    key,
    targetValue,
    options,
}: ObjectReduceOptions<T>): T {
    let value: T | string = targetValue;

    if (isTrue(options.weekType)) {
        const isComplexType: boolean =
            typeof targetValue === 'object' && targetValue !== null!;

        value = isComplexType
            ? targetValue
            : String(checkValueIsEmpty(targetValue) ? null : targetValue);
    }

    (accumulator as PlainObject)[key] = getComparableValue(options, value);

    return accumulator;
}

export function comparable<T>(
    target: T | T[] | string,
    options: ObjectExtraOptions = {},
): ComparableKeys<T> {
    let result: ComparableKeys<T> | string = target;

    if (!isObject(result)) {
        return result as string;
    }

    if (Array.isArray(target)) {
        result = target.map((value: T): T => getComparableValue(options, value) as T);
    } else {
        result = unwrap<T>(target as T, options);
    }

    return result as T;
}

export function objectToString<T>(
    object: T,
    options: Partial<ExtraObjectOptions> = {},
): string {
    return JSON.stringify(comparable(object, options));
}

export function equals<T, K>(a: T, b: K, options: ObjectExtraOptions = {}): boolean {
    return objectToString<T>(a, options) === objectToString<K>(b, options);
}

export function shallowTrimProperties<T>(object: PlainObjectOf<any>): T {
    return Object.entries(object).reduce((result: T, [key, value]: [string, any]): T => {
        // note: don't use isString for preserve circular dependencies
        (result as any)[key] = typeof value === 'string' ? value.trim() : value;

        return result;
    }, {} as T);
}

export function strictEquals<T, K>(a: T, b: K): boolean {
    const options: ObjectExtraOptions = {weekType: true, deep: true};

    return objectToString<T>(a, options) === objectToString<K>(b, options);
}

export function getComparableValue<T>(
    options: ObjectExtraOptions,
    value: T,
): ComparableKeys<T> {
    return isTrue(options.deep) ? comparable(value, options) : value;
}
