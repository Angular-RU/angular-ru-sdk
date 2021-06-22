import { Any, Nullable } from '@angular-ru/common/typings';

export function tryParseJson<T = Any>(text: string): Nullable<T> {
    try {
        return JSON.parse(text);
    } catch {
        return undefined;
    }
}
