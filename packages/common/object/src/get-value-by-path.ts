import { Any } from '@angular-ru/common/typings';

export function getValueByPath<T, K = Any>(
    obj: T,
    path: string | null | undefined,
    fallback: K | undefined = undefined
): K | undefined {
    if (!(path && path.length)) {
        return obj as Any;
    }

    const parts: string[] = path.split('.');
    let result: Any = obj;
    let index: number = 0;

    for (; result && index < parts.length; ++index) {
        result = result[parts[index]];
    }

    return result ?? fallback;
}
