import { secondItem } from '@angular-ru/common/array';
import { isString } from '@angular-ru/common/string';
import { Nullable } from '@angular-ru/common/typings';
import { tryParseJson } from '@angular-ru/common/utils';

export function decodeJwt<T>(token: Nullable<string>): Nullable<T> {
    let result: Nullable<T> = null;

    if (isString(token) as boolean) {
        const base64Url: string = secondItem(token?.split('.')) ?? '';
        const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedStringValue: string = decodeURIComponent(escape(window.atob(base64)));
        result = tryParseJson(decodedStringValue) ?? null;
    }

    return result;
}
