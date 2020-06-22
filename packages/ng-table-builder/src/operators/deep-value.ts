import { Any } from '../interfaces/table-builder.internal';

export function getDeepValue(obj: Any, path: string | null | undefined): Any {
    if (!(path && path.length)) {
        return obj;
    }

    const parts: string[] = path.split('.');
    let result: Any = obj;
    let index: number = 0;

    for (; result && index < parts.length; ++index) {
        result = result[parts[index]];
    }

    return result;
}
