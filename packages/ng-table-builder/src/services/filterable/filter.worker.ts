import { Any, PlainObject, PlainObjectOf } from '@angular-ru/common/typings';

import { FilterGlobalOpts } from './filter-global-opts';
import { FilterableMessage } from './filterable-message';
import { TableFilterType } from './table-filter-type';

// TODO: should be refactor because duplicate code as sortWorker
// eslint-disable-next-line sonarjs/cognitive-complexity,max-lines-per-function
export function filterAllWorker<T>({ source, global, types, columns }: FilterableMessage<T>): T[] {
    const enum Terminate {
        CONTINUE = -1,
        BREAK = 0,
        NEXT = 1
    }

    const { value, type }: FilterGlobalOpts = global!;
    let result: T[] = source;

    if (value) {
        result = source.filter((item: T): boolean =>
            type === types.DOES_NOT_CONTAIN ? !includes(JSON.stringify(item), value) : globalFilter(item)
        );
    }

    if (!columns!.isEmpty) {
        result = result.filter((item: T): boolean => multipleFilter(item));
    }

    function globalFilter(item: T): boolean {
        let satisfiesItem: boolean = false;
        const flattenedItem: PlainObject = flatten(item);

        for (const keyModel of Object.keys(flattenedItem)) {
            const fieldValue: string = String(flattenedItem[keyModel]);
            const [terminate, satisfies]: Satisfies = getSatisfies(fieldValue, value!, type!);

            satisfiesItem = satisfies;

            if (terminate === Terminate.CONTINUE) {
                continue;
            } else if (terminate === Terminate.BREAK) {
                break;
            }

            if (satisfiesItem) {
                break;
            }
        }

        return satisfiesItem;
    }

    function multipleFilter(item: T): boolean {
        let matches: boolean = true;

        for (const fieldKey of Object.keys(columns!.values)) {
            const fieldValue: string = String(getValueByPath(item, fieldKey) || '').trim();
            const findKeyValue: string = String(columns?.values[fieldKey]);
            const fieldType: TableFilterType | undefined = columns?.types[fieldKey];
            const [terminate, satisfies]: Satisfies = getSatisfies(fieldValue, findKeyValue, fieldType);
            matches = matches && satisfies;

            if (!matches || terminate === Terminate.BREAK) {
                break;
            }
        }

        return matches;
    }

    type Satisfies = [Terminate, boolean];

    // eslint-disable-next-line complexity,max-lines-per-function
    function getSatisfies(
        field: string,
        substring: string,
        fieldType: TableFilterType | string | undefined
    ): Satisfies {
        let satisfies: boolean = false;
        let terminate: Terminate = Terminate.NEXT;

        if (fieldType === types.START_WITH) {
            satisfies = field.toLocaleLowerCase().startsWith(substring.toLocaleLowerCase());
        } else if (fieldType === types.END_WITH) {
            const regexp: RegExp = new RegExp(`${escaped(substring)}$`);
            satisfies = !!field.match(regexp);
        } else if (fieldType === types.CONTAINS) {
            satisfies = includes(field, substring);
        } else if (fieldType === types.EQUALS) {
            satisfies = field === substring;
        } else if (fieldType === types.DOES_NOT_EQUAL) {
            if (field === substring) {
                satisfies = false;
                terminate = Terminate.BREAK;
            } else {
                satisfies = true;
                terminate = Terminate.CONTINUE;
            }
        }

        return [terminate, satisfies];
    }

    function includes(origin: string, substring: string): boolean {
        return origin.toLocaleLowerCase().includes(substring.toLocaleLowerCase());
    }

    function escaped(escapedValue: string): string {
        return escapedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function flatten<K = string>(object: PlainObject, excludeKeys: string[] = []): PlainObjectOf<K> {
        const depthGraph: PlainObjectOf<K> = {};

        for (const key in object) {
            if (object.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                mutate<K>(object, depthGraph, key);
            }
        }

        return depthGraph;
    }

    function getValueByPath(object: PlainObject, path: string): PlainObject | undefined {
        return path
            ? path
                  .split('.')
                  .reduce(
                      (str: string | PlainObject | undefined, key: string): PlainObject | undefined =>
                          str && (str as Any)[key],
                      object
                  )
            : object;
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

    return result;
}
