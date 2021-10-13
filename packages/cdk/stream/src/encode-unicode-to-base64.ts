import { Any } from '@angular-ru/cdk/typings';

export function encodeUnicodeToBase64(str: string): Any {
    return window.btoa(
        encodeURIComponent(str).replace(
            /%([0-9A-F]{2})/g,
            (_match: Any, p1: Any): Any => String.fromCharCode(parseInt(p1, 16))
        )
    );
}
