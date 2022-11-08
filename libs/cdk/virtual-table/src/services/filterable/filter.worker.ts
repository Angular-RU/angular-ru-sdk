/* eslint-disable unicorn/consistent-function-scoping */
import { Nullable, PlainObject, PlainObjectOf } from '@angular-ru/cdk/typings';

import { FilterGlobalOptions } from './filter-global-options';
import { FilterableMessage } from './filterable-message';
import { TableFilterType } from './table-filter-type';

type NumericFilterTypes =
    | TableFilterType.LESS_OR_EQUAL
    | TableFilterType.MORE_OR_EQUAL
    | TableFilterType.LESS_THAN
    | TableFilterType.MORE_THAN;

type PlainValue = string | number | boolean;

const INTERVAL_ARRAY_SIZE: number = 2;

// TODO: should be refactor because duplicate code as sortWorker
// eslint-disable-next-line sonarjs/cognitive-complexity,max-lines-per-function
export function filterAllWorker<T>({ source, global, types, columns }: FilterableMessage<T>): T[] {
    const { value: globalOperand, type: globalFilterType }: FilterGlobalOptions = global;
    let result: T[] = source;

    if (isFilled(globalOperand) && isNotNil(globalFilterType)) {
        result = result.filter((item: T): boolean => filterColumnsTogether(item, globalOperand, globalFilterType));
    }

    if (!columns.isEmpty) {
        result = result.filter((item: T): boolean => filterColumnsSeparately(item));
    }

    function filterColumnsTogether(item: T, operand: string, filterType: TableFilterType | string): boolean {
        const flattenedItem: PlainObject = flatten(item);

        return isSatisfying(Object.values(flattenedItem), operand, filterType);
    }

    function filterColumnsSeparately(item: T): boolean {
        for (const fieldKey of Object.keys(columns.values)) {
            const fieldValue: Nullable<PlainObject | PlainValue> = getValueByPath(item, fieldKey);
            const fieldOperand: Nullable<string> = columns.values[fieldKey];
            const fieldFilterType: Nullable<TableFilterType> = columns.types[fieldKey];

            if (isPlainValue(fieldValue) && isFilled(fieldOperand) && isNotNil(fieldFilterType)) {
                const satisfies: boolean = isSatisfying([fieldValue], fieldOperand, fieldFilterType);

                if (!satisfies) {
                    return false;
                }
            }
        }

        return true;
    }

    // eslint-disable-next-line complexity,max-lines-per-function
    function isSatisfying(
        valuesSet: Nullable<PlainValue>[],
        operand: PlainValue,
        filterType: TableFilterType | string
    ): boolean {
        try {
            switch (filterType) {
                case types.START_WITH:
                    return valuesSet
                        .map((element: Nullable<PlainValue>): string => toLowercase(element))
                        .some(startsWith(toLowercase(operand)));
                case types.END_WITH:
                    return valuesSet
                        .map((element: Nullable<PlainValue>): string => toLowercase(element))
                        .some(endsWith(toLowercase(operand)));
                case types.CONTAINS:
                    return valuesSet
                        .map((element: Nullable<PlainValue>): string => toLowercase(element))
                        .some(includes(toLowercase(operand)));
                case types.CONTAINS_ONE_OF_VALUES: {
                    const operandsToContain: string[] = String(operand)
                        .split(',')
                        .map((value: string): string => value.trim())
                        .filter((value: string): boolean => checkValueIsFilled(value))
                        .map((value: string): string => toLowercase(value));

                    return valuesSet
                        .map((element: Nullable<PlainValue>): string => toLowercase(element))
                        .some(includesOneOf(operandsToContain));
                }
                case types.DOES_NOT_CONTAIN:
                    return valuesSet
                        .map((element: Nullable<PlainValue>): string => toLowercase(element))
                        .every(notIncludes(toLowercase(operand)));
                case types.EQUALS:
                    return valuesSet
                        .map((element: Nullable<PlainValue>): string => toLowercase(element))
                        .includes(toLowercase(operand));
                case types.DOES_NOT_EQUAL:
                    return !valuesSet
                        .map((element: Nullable<PlainValue>): string => toLowercase(element))
                        .includes(toLowercase(operand));
                case types.MORE_THAN:
                case types.MORE_OR_EQUAL:
                case types.LESS_THAN:
                case types.LESS_OR_EQUAL:
                    return valuesSet
                        .filter((element: Nullable<PlainValue>): element is PlainValue => isFilled(element))
                        .some(compareNumber(operand, filterType));
                case types.INTERVAL: {
                    const operandsArray: [PlainValue, PlainValue] = (Array.isArray(operand) &&
                    operand.length === INTERVAL_ARRAY_SIZE
                        ? operand
                        : [null, null]) as any as [PlainValue, PlainValue];

                    return valuesSet
                        .filter((element: Nullable<PlainValue>): element is PlainValue => isFilled(element))
                        .some(isInInterval(operandsArray));
                }
                case types.IS_FILLED:
                    return valuesSet
                        .map((element: Nullable<PlainValue>): element is PlainValue => isFilled(element))
                        .includes(operand as boolean);
                default:
                    return true;
            }
        } catch {
            return false;
        }
    }

    function toLowercase(value: Nullable<PlainValue>): string {
        return value?.toString().trim().toLocaleLowerCase() ?? '';
    }

    function startsWith(prefix: string): (value: string) => boolean {
        return (value: string): boolean => value.startsWith(prefix);
    }

    function endsWith(prefix: string): (value: string) => boolean {
        return (value: string): boolean => value.endsWith(prefix);
    }

    function includes(substring: string): (value: string) => boolean {
        return (value: string): boolean => value.includes(substring);
    }

    function includesOneOf(subStrings: string[]): (value: string) => boolean {
        return (value: string): boolean => subStrings.some((substring: string): boolean => value.includes(substring));
    }

    function notIncludes(substring: string): (value: string) => boolean {
        return (value: string): boolean => !value.includes(substring);
    }

    function checkValueIsFilled(value: string): boolean {
        return value.length > 0;
    }

    function isInInterval(comparing: [PlainValue, PlainValue]): (value: PlainValue) => boolean {
        return (value: PlainValue): boolean => comparing[0] <= value && value <= comparing[1];
    }

    function compareNumber(comparing: PlainValue, type: NumericFilterTypes): (value: PlainValue) => boolean {
        const comparingNumber: number = asNumber(comparing);

        switch (type) {
            case types.MORE_THAN:
                return (value: PlainValue): boolean => Number(value) > comparingNumber;

            case types.MORE_OR_EQUAL:
                return (value: PlainValue): boolean => Number(value) >= comparingNumber;

            case types.LESS_THAN:
                return (value: PlainValue): boolean => Number(value) < comparingNumber;

            case types.LESS_OR_EQUAL:
                return (value: PlainValue): boolean => Number(value) <= comparingNumber;
        }
    }

    function asNumber(value: PlainValue): number {
        const comparingNumber: number = Number(value);

        if (isNaN(comparingNumber)) {
            throw new Error('Operand is not a number');
        } else {
            return comparingNumber;
        }
    }

    function flatten<K = string>(value: PlainObject, excludeKeys: string[] = []): PlainObjectOf<K> {
        const depthGraph: PlainObjectOf<K> = {};

        for (const key in value) {
            if (value.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                mutate<K>(value, depthGraph, key);
            }
        }

        return depthGraph;
    }

    function getValueByPath(object: PlainObject, path: string): Nullable<PlainObject | PlainValue> {
        return path
            .split('.')
            .reduce(
                (tempValue: Nullable<PlainObject | PlainValue>, key: string): Nullable<PlainObject | PlainValue> =>
                    (tempValue as any)?.[key],
                object
            );
    }

    function mutate<K>(object: PlainObject, depthGraph: PlainObjectOf<K>, key: string): void {
        const isObject: boolean = typeof object[key] === 'object' && object[key] !== null;

        if (isObject) {
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

    function isPlainValue(value?: Nullable<PlainObject> | PlainValue): value is Nullable<PlainValue> {
        return isNil(value) || ['number', 'string', 'boolean'].includes(typeof value);
    }

    function isFilled(value?: Nullable<PlainValue>): value is PlainValue {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return isNotNil(value) && (value as PlainValue)?.toString().length > 0;
    }

    function isNil(value: Nullable<unknown>): value is null | undefined {
        return !isNotNil(value);
    }

    function isNotNil<V>(value: Nullable<V>): value is V {
        return value !== null && value !== undefined;
    }

    return result;
}
