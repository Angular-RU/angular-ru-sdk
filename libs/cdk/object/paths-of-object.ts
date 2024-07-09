import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

// eslint-disable-next-line complexity
export function pathsOfObject<T extends PlainObject>(
    value: T,
    parentKey: Nullable<string> = null,
    keys: string[] = [],
): string[] {
    for (const key in value) {
        if (!value.hasOwnProperty(key)) {
            continue;
        }

        const element: any = value[key];
        const isObjectValue: boolean =
            typeof element === 'object' && element !== null && !Array.isArray(element);
        // note: don't use isString for preserve circular dependencies
        const implicitKey: string =
            typeof parentKey === 'string' ? `${parentKey}.${key}` : key;

        if (isObjectValue) {
            pathsOfObject(value[key], implicitKey, keys);
        } else {
            keys.push(implicitKey);
        }
    }

    return keys;
}
