import { Any } from '@angular-ru/common/typings';

export function tryParseJson<T = Any>(text: string): T | undefined {
    try {
        return JSON.parse(text);
    } catch {
        return undefined;
    }
}
