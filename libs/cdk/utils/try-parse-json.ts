import {Nullable} from '@angular-ru/cdk/typings';

export function tryParseJson<T>(text: Nullable<string>): Nullable<T> {
    try {
        return JSON.parse(text as string);
    } catch {
        return undefined;
    }
}
