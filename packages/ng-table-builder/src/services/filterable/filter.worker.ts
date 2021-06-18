import { Any, PlainObject, PlainObjectOf } from '@angular-ru/common/typings';

import { FilterGlobalOpts } from './filter-global-opts';
import { FilterableMessage } from './filterable-message';
import { TableFilterType } from './table-filter-type';

type NumericFilterTypes =
    | TableFilterType.LESS_OR_EQUAL
    | TableFilterType.MORE_OR_EQUAL
    | TableFilterType.LESS_THAN
    | TableFilterType.MORE_THAN;

type PlainValue = string | number | boolean;

// TODO: should be refactor because duplicate code as sortWorker
// eslint-disable-next-line sonarjs/cognitive-complexity,max-lines-per-function
export function filterAllWorker<T>({ source, global, types, columns }: FilterableMessage<T>): T[] {
    const { value: globalOperand, type: globalFilterType }: FilterGlobalOpts = global;
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
            const fieldValue: PlainObject | PlainValue | undefined = getValueByPath(item, fieldKey);
            const fieldOperand: string | undefined = columns.values[fieldKey];
            const fieldFilterType: TableFilterType | undefined = columns.types[fieldKey];

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
    function isSatisfying(valuesSet: PlainValue[], operand: string, filterType: TableFilterType | string): boolean {
        try {
            switch (filterType) {
                case types.START_WITH:
                    return valuesSet.map(toLowercase).some(startsWith(operand.toLocaleLowerCase()));
                case types.END_WITH:
                    return valuesSet.map(toLowercase).some(endsWith(operand.toLocaleLowerCase()));
                case types.CONTAINS:
                    return valuesSet.map(toLowercase).some(includes(operand.toLocaleLowerCase()));
                case types.DOES_NOT_CONTAIN:
                    return valuesSet.map(toLowercase).every(notIncludes(operand.toLocaleLowerCase()));
                case types.EQUALS:
                    return valuesSet.map(toLowercase).includes(operand.toLocaleLowerCase());
                case types.DOES_NOT_EQUAL:
                    return !valuesSet.map(toLowercase).includes(operand.toLocaleLowerCase());
                case types.MORE_THAN:
                case types.MORE_OR_EQUAL:
                case types.LESS_THAN:
                case types.LESS_OR_EQUAL:
                    return valuesSet.some(compareNumber(operand, filterType));
                default:
                    return true;
            }
        } catch {
            return false;
        }
    }

    function toLowercase(value: PlainValue): string {
        return value.toString().trim().toLocaleLowerCase();
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

    function notIncludes(substring: string): (value: string) => boolean {
        return (value: string): boolean => !value.includes(substring);
    }

    function compareNumber(comparing: string, type: NumericFilterTypes): (value: PlainValue) => boolean {
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

    function asNumber(value: string): number {
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

    function getValueByPath(object: PlainObject, path: string): PlainObject | PlainValue | undefined {
        return path
            .split('.')
            .reduce(
                (tempValue: PlainObject | PlainValue | undefined, key: string): PlainObject | PlainValue | undefined =>
                    (tempValue as Any)?.[key],
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

    function isPlainValue(value?: PlainObject | PlainValue | null): value is PlainValue {
        return ['number', 'string', 'boolean'].includes(typeof value);
    }

    function isFilled(value?: string | null): value is string {
        return isNotNil(value) && value.toString().length > 0;
    }

    function isNotNil<V>(value: V | null | undefined): value is V {
        return value !== null && value !== undefined;
    }

    return result;
}
