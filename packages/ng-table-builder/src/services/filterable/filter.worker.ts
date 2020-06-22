import { TableRow } from '../../interfaces/table-builder.external';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';
import { FilterableMessage, FilterGlobalOpts, TableFilterType } from './filterable.interface';

// eslint-disable-next-line max-lines-per-function
export function filterAllWorker({ source, global, types, columns }: FilterableMessage): TableRow[] {
    // eslint-disable-next-line
    enum Terminate {
        CONTINUE = -1,
        BREAK = 0,
        NEXT = 1
    }

    const { value, type }: FilterGlobalOpts = global!;
    let result: TableRow[] = source;

    if (value) {
        result = source.filter((item: TableRow): boolean =>
            type === types.DOES_NOT_CONTAIN ? !includes(JSON.stringify(item), value) : globalFilter(item)
        );
    }

    if (!columns!.isEmpty) {
        result = result.filter((item: TableRow): boolean => multipleFilter(item));
    }

    function globalFilter(item: TableRow): boolean {
        let satisfiesItem: boolean = false;
        const flattenedItem: KeyMap = flatten(item);

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

    function multipleFilter(item: TableRow): boolean {
        let matches: boolean = true;

        for (const fieldKey of Object.keys(columns!.values)) {
            const fieldValue: string = String(getValueByPath(item, fieldKey) || '').trim();
            const findKeyValue: string = String(columns!.values[fieldKey]);
            const fieldType: TableFilterType = columns!.types[fieldKey];
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
    function getSatisfies(field: string, substring: string, fieldType: TableFilterType): Satisfies {
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

    function flatten<T = string>(object: KeyMap, excludeKeys: string[] = []): KeyMap<T> {
        const depthGraph: KeyMap<T> = {};

        for (const key in object) {
            if (object.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                mutate<T>(object, depthGraph, key);
            }
        }

        return depthGraph;
    }

    function getValueByPath(object: KeyMap, path: string): KeyMap | undefined {
        return path
            ? path
                  .split('.')
                  .reduce(
                      (str: string | KeyMap | undefined, key: string): KeyMap | undefined => str && (str as Any)[key],
                      object
                  )
            : object;
    }

    function mutate<T>(object: KeyMap, depthGraph: KeyMap<T>, key: string): void {
        const isObject: boolean = typeof object[key] === 'object' && object[key] !== null;
        if (isObject) {
            const flatObject: KeyMap = flatten(object[key]);
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
