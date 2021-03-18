import { secondItem } from '@angular-ru/common/array';
import { Any } from '@angular-ru/common/typings';

export function decodeJwt<T>(token: string | null): T {
    let result: T | null = null;

    if (typeof token === 'string') {
        const base64Url: string = secondItem(token.split('.')) || '';
        const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedStringValue: string = decodeURIComponent(escape(window.atob(base64))) || 'null';
        result = JSON.parse(decodedStringValue);
    }

    return (result as Any) as T;
}
