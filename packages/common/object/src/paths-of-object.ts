import { Any, PlainObject } from '@angular-ru/common/typings';

// eslint-disable-next-line complexity
export function pathsOfObject<T extends PlainObject>(
    value: T,
    parentKey: string | null = null,
    keys: string[] = []
): string[] {
    for (const key in value) {
        if (!value.hasOwnProperty(key)) {
            continue;
        }

        const element: Any = value[key];
        const isObjectValue: boolean = typeof element === 'object' && element !== null && !Array.isArray(element);
        const implicitKey: string = typeof parentKey === 'string' ? `${parentKey}.${key}` : key;

        if (isObjectValue) {
            pathsOfObject(value[key], implicitKey, keys);
        } else {
            keys.push(implicitKey);
        }
    }

    return keys;
}
