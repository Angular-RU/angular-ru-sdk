import { Any } from '@angular-ru/common/typings';

export function getValueByPath<T = unknown, K = T>(
    obj: T,
    path: string | null | undefined,
    fallback: K | null | undefined = undefined
): K | null | undefined {
    if (!(path && path.length)) {
        return obj as Any as K;
    }

    let result: K = obj as Any as K;

    const parts: string[] = path.split('.');
    let index: number = 0;

    for (; result && index < parts.length; ++index) {
        result = (result as Any)?.[parts?.[index]];
    }

    return result ?? fallback;
}
