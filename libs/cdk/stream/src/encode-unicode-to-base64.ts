import { Any } from '@angular-ru/cdk/typings';

export function encodeUnicodeToBase64(str: string): Any {
    return window.btoa(
        encodeURIComponent(str).replace(
            /%([\dA-F]{2})/g,
            // eslint-disable-next-line unicorn/prefer-code-point
            (_match: Any, p1: Any): Any => String.fromCharCode(parseInt(p1, 16))
        )
    );
}
