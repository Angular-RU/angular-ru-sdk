import { secondItem } from '@angular-ru/common/array';
import { isString } from '@angular-ru/common/string';
import { tryParseJson } from '@angular-ru/common/utils';

export function decodeJwt<T>(token: string | null): T | null {
    let result: T | null = null;

    if (isString(token) as boolean) {
        const base64Url: string = secondItem(token?.split('.')) ?? '';
        const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedStringValue: string = decodeURIComponent(escape(window.atob(base64)));
        result = tryParseJson(decodedStringValue) ?? null;
    }

    return result;
}
