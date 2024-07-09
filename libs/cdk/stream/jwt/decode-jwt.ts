import {takeSecondItem} from '@angular-ru/cdk/array';
import {isString} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {tryParseJson} from '@angular-ru/cdk/utils';

export function decodeJwt<T>(token: Nullable<string>): Nullable<T> {
    let result: Nullable<T> = null;

    if (isString(token)) {
        const base64Url: string = takeSecondItem(token?.split('.')) ?? '';
        const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // eslint-disable-next-line deprecation/deprecation
        const decodedStringValue: string = decodeURIComponent(
            escape(window.atob(base64)),
        );

        result = tryParseJson(decodedStringValue) ?? null;
    }

    return result;
}
