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

        if (isObjectValue) {
            const implicitKey: string = parentKey ? `${parentKey}.${key}` : key;
            pathsOfObject(value[key], implicitKey, keys);
        } else {
            keys.push(parentKey ? `${parentKey}.${key}` : key);
        }
    }

    return keys;
}
