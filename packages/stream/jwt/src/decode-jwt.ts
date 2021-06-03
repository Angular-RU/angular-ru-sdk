import { secondItem } from '@angular-ru/common/array';

export function decodeJwt<T>(token: string | null): T | null {
    let result: T | null = null;

    if (typeof token === 'string') {
        const base64Url: string = secondItem(token.split('.')) || '';
        const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedStringValue: string | null = decodeURIComponent(escape(window.atob(base64))) || null;
        result = decodedStringValue ? JSON.parse(decodedStringValue) : null;
    }

    return result;
}
