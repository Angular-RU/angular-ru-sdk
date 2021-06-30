import { Any, Nullable } from '@angular-ru/common/typings';

export function tryParseJson<T>(text: Nullable<string>): Nullable<T> {
    try {
        return JSON.parse(text as Any);
    } catch {
        return undefined;
    }
}
